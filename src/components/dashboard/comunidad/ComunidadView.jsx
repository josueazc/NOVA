import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Send, Heart, MessageSquare, User, Image as ImageIcon, ThumbsDown, 
  ShieldAlert, Globe, ArrowLeft, ChevronDown, ChevronUp, Repeat, Save, X, Trash2
} from 'lucide-react';
import { partidosData } from '../../../data/partidosData';
import { supabase } from '../../../lib/supabaseClient';

const PALABRAS_PROHIBIDAS = ["tonto", "estupido", "mierda", "basura", "odio", "pendejo"];

const ComunidadView = ({ userName, user, defaultView = 'feed' }) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFullName, setEditFullName] = useState(user?.user_metadata?.full_name || userName || "");
  const [editProvince, setEditProvince] = useState(user?.user_metadata?.province || "");
  const [editDni, setEditDni] = useState(user?.user_metadata?.dni || "");
  const [editBio, setEditBio] = useState(user?.user_metadata?.bio || "");
  const [editCargo, setEditCargo] = useState(user?.user_metadata?.cargo || "");
  const [editCargoInfo, setEditCargoInfo] = useState(user?.user_metadata?.cargo_info || "");
  const [editParty, setEditParty] = useState(user?.user_metadata?.party || "");
  
  const provincias = ["San José", "Alajuela", "Cartago", "Heredia", "Guanacaste", "Puntarenas", "Limón"];
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const fileInputRef = useRef(null);
  // Estado local para simular la base de datos temporalmente
  const [profileTab, setProfileTab] = useState('posts');
  const [posts, setPosts] = useState([]);
  const [userReactions, setUserReactions] = useState(() => {
    const saved = localStorage.getItem('comunidad_reactions');
    return saved ? JSON.parse(saved) : {};
  });
  const [newPost, setNewPost] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [activeComments, setActiveComments] = useState({});
  const [commentsData, setCommentsData] = useState(() => {
    const saved = localStorage.getItem('comunidad_comments');
    if (saved) {
      return JSON.parse(saved, (key, value) => {
        if (key === 'createdAt') return new Date(value);
        return value;
      });
    }
    return {
      '1': [
        { id: 'c1', text: 'Totalmente de acuerdo, es vital el tema fiscal.', authorName: 'Luis F.', authorId: 'user_mock_3', createdAt: new Date(Date.now() - 1800000) }
      ]
    };
  });
  
  const miUserId = user?.id || 'mi_usuario_actual'; // Simulación de ID
  const [view, setView] = useState({ type: defaultView, userId: defaultView === 'profile' ? miUserId : null });

  useEffect(() => {
    setView({ type: defaultView, userId: defaultView === 'profile' ? miUserId : null });
  }, [defaultView, miUserId]);

  const getUserParty = (userId) => {
    if (userId === miUserId) return user?.user_metadata?.party;
    // mock data
    if (userId === 'user_mock_1') return 'pln';
    if (userId === 'user_mock_2') return 'pusc';
    return null;
  };

  const renderPartyPin = (userId) => {
    const partyId = getUserParty(userId);
    if (!partyId) return null;
    const pData = partidosData[partyId];
    if (!pData) return null;
    return (
      <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-white shadow-sm ml-2 flex-shrink-0" title={pData.nombre}>
        {pData.bandera}
      </div>
    );
  };

  const fetchPosts = async () => {
    if (!supabase) return;
    const { data: pData, error: pError } = await supabase
      .from('posts')
      .select('*, profiles:author_id(full_name, party, is_politician, cargo, cargo_info)')
      .order('created_at', { ascending: false });
      
    if (pError) {
      console.error(pError);
      return;
    }

    if (pData) {
      const formattedPosts = pData.map(p => ({
        id: p.id,
        text: p.text,
        authorId: p.author_id,
        authorName: p.profiles?.full_name || 'Usuario',
        party: p.profiles?.party,
        isPolitician: p.profiles?.is_politician,
        cargo: p.profiles?.cargo,
        media: p.media,
        likes: p.likes,
        dislikes: p.dislikes,
        reposts: p.reposts,
        commentCount: p.comment_count,
        createdAt: new Date(p.created_at)
      }));
      setPosts(formattedPosts);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    localStorage.setItem('comunidad_comments', JSON.stringify(commentsData));
  }, [commentsData]);

  useEffect(() => {
    localStorage.setItem('comunidad_reactions', JSON.stringify(userReactions));
  }, [userReactions]);
  
  const cleanText = (text) => {
    let cleaned = text;
    PALABRAS_PROHIBIDAS.forEach(p => {
      cleaned = cleaned.replace(new RegExp(p, "gi"), "****");
    });
    return cleaned;
  };

  const handleSaveProfile = async () => {
    if (!supabase) {
      setIsEditingProfile(false);
      return;
    }
    const { error: authError } = await supabase.auth.updateUser({
      data: {
        full_name: editFullName,
        province: editProvince,
        dni: editDni,
        bio: editBio,
        party: editParty,
        cargo: editCargo,
        cargo_info: editCargoInfo
      }
    });

    if (authError) {
      alert("Error al actualizar autenticación: " + authError.message);
      return;
    }

    if (user?.id) {
      const { error: profileError } = await supabase.from('profiles').update({
        full_name: editFullName,
        provincia: editProvince,
        cedula: editDni,
        bio: editBio,
        party: editParty,
        cargo: editCargo,
        cargo_info: editCargoInfo
      }).eq('id', user.id);
      
      if (profileError) {
        alert("Error al actualizar la tabla de perfiles en Supabase. Verifica las políticas RLS: " + profileError.message);
        return;
      }
    }

    setIsEditingProfile(false);
    alert("Perfil actualizado. Los cambios ya se guardaron en la base de datos.");
  };

  const handleMediaUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !supabase) return;

    if (!user || !user.id) {
       alert("Debes iniciar sesión para subir imágenes.");
       return;
    }

    setUploadingMedia(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const filePath = `posts/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('comunidad_media')
      .upload(filePath, file);

    if (uploadError) {
      alert('Error al subir imagen (Asegúrate de crear el bucket "comunidad_media" en Supabase como Público): ' + uploadError.message);
      setUploadingMedia(false);
      return;
    }

    const { data } = supabase.storage
      .from('comunidad_media')
      .getPublicUrl(filePath);

    if (data && data.publicUrl) {
      setMediaUrl(data.publicUrl);
    }
    setUploadingMedia(false);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    if (!user || !user.id) {
      alert("Debes tener una cuenta registrada para publicar.");
      return;
    }

    if (supabase) {
      const { error } = await supabase.from('posts').insert({
        author_id: user.id,
        text: cleanText(newPost),
        media: mediaUrl || null
      });
      if (!error) {
        setNewPost("");
        setMediaUrl("");
        fetchPosts();
      } else {
        alert("Error al publicar: " + error.message);
      }
    } else {
      alert("La base de datos no está conectada.");
    }
  };

  const handleReaction = (postId) => {
    const isLiked = userReactions[postId] === 'like';
    let likesMod = isLiked ? -1 : 1;

    if (isLiked) {
      const nuevasReacts = {...userReactions};
      delete nuevasReacts[postId];
      setUserReactions(nuevasReacts);
    } else {
      setUserReactions({...userReactions, [postId]: 'like'});
    }

    setPosts(posts.map(p => {
      if (p.id === postId) {
        const newLikes = Math.max(0, (p.likes || 0) + likesMod);
        
        if (supabase) {
          supabase.from('posts').update({ likes: newLikes }).eq('id', postId).then();
        }

        return { ...p, likes: newLikes };
      }
      return p;
    }));
  };

  const handleRepost = (postId) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        const hasReposted = p.repostedBy?.includes(miUserId);
        let newReposts = p.reposts || 0;
        let newRepostedBy = p.repostedBy || [];

        if (hasReposted) {
          newReposts = Math.max(0, newReposts - 1);
          newRepostedBy = newRepostedBy.filter(id => id !== miUserId);
        } else {
          newReposts += 1;
          newRepostedBy = [...newRepostedBy, miUserId];
        }

        if (supabase) {
          supabase.from('posts').update({ reposts: newReposts }).eq('id', postId).then();
        }

        return { ...p, reposts: newReposts, repostedBy: newRepostedBy };
      }
      return p;
    }));
  };

  const fetchComments = async (postId) => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from('comments')
      .select('*, profiles:author_id(full_name, party)')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });
      
    if (!error && data) {
      setCommentsData(prev => ({
        ...prev,
        [postId]: data.map(c => ({
          id: c.id,
          text: c.text,
          authorId: c.author_id,
          authorName: c.profiles?.full_name || 'Usuario',
          party: c.profiles?.party,
          createdAt: new Date(c.created_at)
        }))
      }));
    }
  };

  const toggleComments = (postId) => {
    setActiveComments(prev => ({ ...prev, [postId]: !prev[postId] }));
    if (!activeComments[postId]) {
      fetchComments(postId);
    }
  };

  const handleAddComment = async (postId, text) => {
    if (!text.trim()) return;

    if (!user || !user.id) {
      alert("Debes tener una cuenta registrada para comentar.");
      return;
    }
    
    if (supabase) {
      const { error } = await supabase.from('comments').insert({
        post_id: postId,
        author_id: user.id,
        text: cleanText(text)
      });
      
      if (!error) {
        fetchComments(postId);
        fetchPosts();
      } else {
        alert("Error al comentar: " + error.message);
      }
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    if (window.confirm("¿Seguro que deseas eliminar este comentario?")) {
      if (supabase) {
        const { error } = await supabase.from('comments').delete().eq('id', commentId).eq('author_id', miUserId);
        if (!error) {
          fetchComments(postId);
          fetchPosts(); // para actualizar el commentCount
        } else {
          alert("Error al eliminar comentario: " + error.message);
        }
      }
    }
  };

  const filteredPosts = useMemo(() => {
    let list = [...posts];
    if (view.type === 'profile') {
      if (profileTab === 'posts') {
        list = list.filter(p => p.authorId === view.userId || p.repostedBy?.includes(view.userId));
      } else if (profileTab === 'replies') {
        list = list.filter(p => commentsData[p.id]?.some(c => c.authorId === view.userId));
      }
    } else {
      // Priorizar los de la misma bandera
      const myParty = user?.user_metadata?.party;
      if (myParty) {
        list.sort((a, b) => {
           const aIsMyParty = (a.party || getUserParty(a.authorId)) === myParty;
           const bIsMyParty = (b.party || getUserParty(b.authorId)) === myParty;
           if (aIsMyParty && !bIsMyParty) return -1;
           if (!aIsMyParty && bIsMyParty) return 1;
           return b.createdAt - a.createdAt;
        });
      } else {
        list.sort((a, b) => b.createdAt - a.createdAt);
      }
    }
    return list;
  }, [posts, view, profileTab, commentsData, user]);

  return (
    <div className="w-full bg-[#f8fafc] dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans pb-24 animate-in fade-in duration-500 pt-8 transition-colors">
      
      {/* Sub-Navegación Interna de Comunidad */}
      <div className="max-w-3xl mx-auto px-6 mb-8 flex items-center justify-between">
         <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView({ type: 'feed', userId: null })}>
            <div className="bg-[#001D4A] dark:bg-blue-900 p-2 rounded-xl text-white group-hover:bg-blue-800 transition-colors">
              <Globe size={24} />
            </div>
            <h2 className="text-3xl font-black text-[#001D4A] dark:text-white uppercase tracking-tighter italic transition-colors">Debate<span className="text-red-600">CR</span></h2>
         </div>
         <button 
            onClick={() => setView({ type: 'profile', userId: miUserId })} 
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all shadow-sm font-black text-xs uppercase tracking-widest ${view.type === 'profile' ? 'bg-[#001D4A] dark:bg-blue-600 text-white border-[#001D4A] dark:border-blue-600' : 'bg-white dark:bg-slate-800 text-[#001D4A] dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
         >
            <User size={16} /> Mi Perfil
         </button>
      </div>

      <div className="max-w-3xl mx-auto px-6">
        
        {/* VISTA DE PERFIL */}
        {view.type === 'profile' && (
          <div className="mb-12 animate-in fade-in slide-in-from-top-4">
            <button onClick={() => setView({ type: 'feed', userId: null })} className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-[#001D4A] dark:hover:text-white mb-6 text-sm font-bold transition-colors uppercase tracking-widest italic">
              <ArrowLeft size={16} /> Volver al muro global
            </button>
            <div className="bg-gradient-to-r from-[#001D4A] to-blue-700 h-32 rounded-t-[3rem] shadow-lg relative overflow-hidden">
               <div className="absolute inset-0 bg-white/10 pattern-dots"></div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-b-[3rem] border-x border-b border-slate-100 dark:border-slate-700 relative shadow-xl transition-colors">
              <div className="absolute -top-14 left-10 w-28 h-28 bg-white dark:bg-slate-800 rounded-[2rem] p-2 border border-slate-100 dark:border-slate-700 shadow-2xl rotate-3 transition-colors">
                <div className="w-full h-full bg-slate-100 dark:bg-slate-700 rounded-[1.5rem] flex items-center justify-center text-4xl font-black text-[#001D4A] dark:text-white uppercase border-2 border-dashed border-slate-300 dark:border-slate-500 transition-colors">
                   {(view.userId === miUserId ? userName : posts.find(p => p.authorId === view.userId)?.authorName || "U")?.charAt(0)}
                </div>
              </div>
              <div className="pt-16">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter text-[#001D4A] dark:text-white transition-colors">
                      {view.userId === miUserId ? userName : posts.find(p => p.authorId === view.userId)?.authorName || "Usuario"}
                    </h2>
                    {renderPartyPin(view.userId)}
                  </div>
                  {view.userId === miUserId && !isEditingProfile && (
                    <button onClick={() => setIsEditingProfile(true)} className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-[#001D4A] dark:text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#001D4A] dark:hover:bg-blue-600 hover:text-white transition-colors">
                      Editar
                    </button>
                  )}
                </div>
                
                {isEditingProfile && view.userId === miUserId ? (
                  <div className="mt-6 bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-black text-[#001D4A] dark:text-white uppercase text-sm">Editar Perfil</h3>
                      <button onClick={() => setIsEditingProfile(false)} className="text-slate-400 dark:text-slate-500 hover:text-red-600"><X size={18} /></button>
                    </div>
                    <div className="space-y-4">
                      
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1.5 ml-1">Nombre Completo</label>
                        <input 
                          type="text" 
                          value={editFullName}
                          onChange={(e) => setEditFullName(e.target.value)}
                          className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-[#002B7F] dark:focus:border-blue-500 outline-none text-sm font-medium text-slate-900 dark:text-white transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 ml-1">Provincia</label>
                          <select 
                            value={editProvince}
                            onChange={(e) => setEditProvince(e.target.value)}
                            className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-[#002B7F] dark:focus:border-blue-500 outline-none text-sm font-medium text-slate-900 dark:text-white transition-colors"
                          >
                            <option value="">Selecciona...</option>
                            {provincias.map(p => <option key={p} value={p}>{p}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 ml-1">Cédula</label>
                          <input 
                            type="text" 
                            value={editDni}
                            onChange={(e) => setEditDni(e.target.value)}
                            className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-[#002B7F] dark:focus:border-blue-500 outline-none text-sm font-medium text-slate-900 dark:text-white transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 ml-1">Biografía</label>
                        <textarea 
                          value={editBio}
                          onChange={(e) => setEditBio(e.target.value)}
                          rows="2"
                          className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-[#002B7F] dark:focus:border-blue-500 outline-none text-sm font-medium text-slate-900 dark:text-white resize-none transition-colors"
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 ml-1">Preferencia Política</label>
                        <select 
                          value={editParty}
                          onChange={(e) => setEditParty(e.target.value)}
                          className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-[#002B7F] dark:focus:border-blue-500 outline-none text-sm font-medium text-slate-900 dark:text-white transition-colors"
                        >
                          <option value="">Ninguna o Independiente</option>
                          {Object.values(partidosData).map(p => (
                            <option key={p.id} value={p.id}>{p.nombre}</option>
                          ))}
                        </select>
                      </div>
                      {user?.user_metadata?.is_politician && (
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 ml-1">Cargo</label>
                            <input 
                              type="text" 
                              value={editCargo}
                              onChange={(e) => setEditCargo(e.target.value)}
                              className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-[#002B7F] dark:focus:border-blue-500 outline-none text-sm font-medium text-slate-900 dark:text-white transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 ml-1">Detalles</label>
                            <input 
                              type="text" 
                              value={editCargoInfo}
                              onChange={(e) => setEditCargoInfo(e.target.value)}
                              className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-[#002B7F] dark:focus:border-blue-500 outline-none text-sm font-medium text-slate-900 dark:text-white transition-colors"
                            />
                          </div>
                        </div>
                      )}
                      <button onClick={handleSaveProfile} className="w-full bg-[#001D4A] text-white py-3 rounded-xl font-bold uppercase text-xs hover:bg-blue-800 transition-colors flex items-center justify-center gap-2">
                        <Save size={16} /> Guardar Cambios
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-red-600 font-bold text-xs uppercase tracking-[0.2em] mb-2 mt-2">
                      {(view.userId === miUserId && user?.user_metadata?.is_politician) 
                        ? user?.user_metadata?.cargo || 'Político' 
                        : 'Ciudadano Registrado'}
                    </p>
                    {(view.userId === miUserId && user?.user_metadata?.is_politician && user?.user_metadata?.cargo_info) && (
                      <p className="text-slate-500 font-medium text-sm mb-4">
                        {user.user_metadata.cargo_info}
                      </p>
                    )}
                  </>
                )}
                
                <div className="flex gap-6 mt-6 pt-6 border-t border-slate-50 dark:border-slate-700">
                   <div className="text-center cursor-pointer group" onClick={() => setProfileTab('posts')}>
                     <p className={`text-2xl font-black transition-colors ${profileTab === 'posts' ? 'text-[#001D4A] dark:text-white' : 'text-slate-300 dark:text-slate-600 group-hover:text-slate-400 dark:group-hover:text-slate-500'}`}>{posts.filter(p => p.authorId === view.userId || p.repostedBy?.includes(view.userId)).length}</p>
                     <p className={`text-[10px] uppercase font-bold transition-colors ${profileTab === 'posts' ? 'text-slate-500 dark:text-slate-400' : 'text-slate-300 dark:text-slate-600'}`}>Publicaciones</p>
                   </div>
                   <div className="text-center cursor-pointer group" onClick={() => setProfileTab('replies')}>
                     <p className={`text-2xl font-black transition-colors ${profileTab === 'replies' ? 'text-[#001D4A] dark:text-white' : 'text-slate-300 dark:text-slate-600 group-hover:text-slate-400 dark:group-hover:text-slate-500'}`}>{posts.filter(p => commentsData[p.id]?.some(c => c.authorId === view.userId)).length}</p>
                     <p className={`text-[10px] uppercase font-bold transition-colors ${profileTab === 'replies' ? 'text-slate-500 dark:text-slate-400' : 'text-slate-300 dark:text-slate-600'}`}>Respuestas</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VISTA FEED - CREAR POST */}
        {view.type === 'feed' && (
          <div className="bg-white dark:bg-slate-800 rounded-[3rem] p-8 lg:p-10 border border-slate-100 dark:border-slate-700 shadow-xl mb-12 relative overflow-hidden group transition-colors">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-50 dark:bg-blue-900/20 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
            <form onSubmit={handlePost} className="space-y-6 relative z-10">
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-slate-100 dark:bg-slate-700 rounded-[1.5rem] flex-shrink-0 flex items-center justify-center text-[#001D4A] dark:text-white font-black uppercase text-xl shadow-inner border border-slate-200 dark:border-slate-600 transition-colors">
                  {userName ? userName.charAt(0) : "U"}
                </div>
                <textarea 
                  value={newPost} 
                  onChange={(e) => setNewPost(e.target.value)} 
                  placeholder="¿Cuál es tu opinión sobre el acontecer nacional?" 
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[2rem] p-5 text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:bg-slate-800 resize-none placeholder:text-slate-400 dark:placeholder:text-slate-500 min-h-[120px] transition-all text-slate-900 dark:text-white" 
                />
              </div>
              {mediaUrl && (
                <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm ml-18">
                  <img src={mediaUrl} alt="Preview" className="w-full h-48 lg:h-64 object-cover" />
                  <button type="button" onClick={() => setMediaUrl("")} className="absolute top-4 right-4 bg-white/90 p-2 rounded-full text-red-600 hover:bg-red-600 hover:text-white shadow-lg transition-colors"><ShieldAlert size={18} /></button>
                </div>
              )}
              <div className="flex items-center justify-between pt-2">
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef} 
                  onChange={handleMediaUpload} 
                  className="hidden" 
                />
                <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploadingMedia} className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-[#001D4A] dark:hover:text-white font-black text-xs uppercase tracking-widest transition-colors bg-slate-50 dark:bg-slate-700 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-600 disabled:opacity-50">
                  <ImageIcon size={18} /> {uploadingMedia ? 'Subiendo...' : 'Adjuntar Imagen'}
                </button>
                <button disabled={!newPost.trim()} className="bg-[#001D4A] hover:bg-blue-800 disabled:opacity-30 disabled:hover:bg-[#001D4A] text-white px-8 py-4 rounded-full font-black uppercase italic text-xs tracking-widest shadow-xl transition-all flex items-center gap-3">
                  Publicar <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* LISTA DE POSTS */}
        <div className="space-y-8">
          {filteredPosts.map((post) => (
            <article key={post.id} className="bg-white dark:bg-slate-800 rounded-[3rem] border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-lg transition-all">
              <div className="p-8 lg:p-10 space-y-6">
                
                {/* Cabecera de Repost (si aplica) */}
                {view.type === 'profile' && profileTab === 'posts' && post.authorId !== view.userId && post.repostedBy?.includes(view.userId) && (
                  <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 -mb-2">
                    <Repeat size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest italic">{view.userId === miUserId ? 'Republicaste' : `Usuario Republicó`}</span>
                  </div>
                )}

                {/* Cabecera del Post */}
                <div className="flex items-center justify-between">
                  <button onClick={() => setView({ type: 'profile', userId: post.authorId })} className="flex items-center gap-4 group text-left">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-[1.2rem] flex items-center justify-center font-black text-lg uppercase text-[#001D4A] dark:text-white group-hover:bg-[#001D4A] dark:group-hover:bg-blue-600 transition-colors border border-slate-200 dark:border-slate-600 shadow-sm">
                       {post.authorName?.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-black text-base lg:text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors uppercase italic text-[#001D4A] dark:text-white">{post.authorName}</h4>
                        {renderPartyPin(post.authorId)}
                      </div>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold tracking-widest uppercase">
                        {(post.authorId === miUserId && user?.user_metadata?.is_politician) ? user?.user_metadata?.cargo || 'Político' : 'Ciudadano'}
                      </p>
                    </div>
                  </button>
                  <span className="text-[10px] text-slate-400 dark:text-slate-400 font-black uppercase tracking-widest bg-slate-50 dark:bg-slate-700 px-3 py-1 rounded-full border border-slate-100 dark:border-slate-600">
                     {post.createdAt.toLocaleDateString()}
                  </span>
                </div>
                
                {/* Contenido */}
                <p className="text-slate-600 dark:text-slate-300 text-base lg:text-lg leading-relaxed font-medium pl-2">{post.text}</p>
                {post.media && (
                   <div className="rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm">
                      <img src={post.media} alt="Post content" className="w-full h-auto max-h-[500px] object-cover" />
                   </div>
                )}
                
                {/* Botonera de interacciones */}
                <div className="flex items-center gap-3 pt-6 border-t border-slate-50 dark:border-slate-700 flex-wrap">
                  <button onClick={() => handleReaction(post.id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all font-black text-xs border ${userReactions[post.id] === 'like' ? 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-900 text-red-600 dark:text-red-400' : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-600'}`}>
                    <Heart size={18} className={userReactions[post.id] === 'like' ? "fill-red-600 text-red-600 dark:fill-red-400 dark:text-red-400" : ""} /> <span>{post.likes || 0}</span>
                  </button>
                  <button onClick={() => handleRepost(post.id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all font-black text-xs border ${post.repostedBy?.includes(miUserId) ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-900 text-green-600 dark:text-green-400' : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-600'}`}>
                    <Repeat size={18} /> <span>{post.reposts || 0}</span>
                  </button>
                  <div className="flex-grow"></div>
                  <button onClick={() => toggleComments(post.id)} className={`flex items-center gap-2 px-6 py-2.5 rounded-full transition-all font-black text-xs border ${(activeComments[post.id] || (view.type === 'profile' && profileTab === 'replies')) ? 'bg-slate-100 dark:bg-slate-600 border-slate-300 dark:border-slate-500 text-[#001D4A] dark:text-white' : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-600'}`}>
                    <MessageSquare size={18} /> <span>{post.commentCount || 0} Respuestas</span>
                    {(activeComments[post.id] || (view.type === 'profile' && profileTab === 'replies')) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>

                {/* COMENTARIOS */}
                {(activeComments[post.id] || (view.type === 'profile' && profileTab === 'replies')) && (
                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700 animate-in slide-in-from-top-4 duration-300 bg-slate-50 dark:bg-slate-900 -mx-8 -mb-8 px-8 pb-8 rounded-b-[3rem]">
                    <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
                      {commentsData[post.id]?.map((comment) => (
                        <div key={comment.id} className="bg-white dark:bg-slate-800 p-5 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <span onClick={() => setView({ type: 'profile', userId: comment.authorId })} className="font-black text-[11px] text-[#001D4A] dark:text-blue-400 uppercase italic cursor-pointer hover:text-blue-600 dark:hover:text-blue-300 transition-colors flex items-center">
                               {comment.authorName}
                               {renderPartyPin(comment.authorId)}
                            </span>
                            <div className="flex items-center gap-3">
                              {comment.authorId === miUserId && (
                                <button onClick={() => handleDeleteComment(post.id, comment.id)} className="text-red-400 hover:text-red-600 transition-colors" title="Eliminar Comentario">
                                  <Trash2 size={12} />
                                </button>
                              )}
                              <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">{comment.createdAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            </div>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">{comment.text}</p>
                        </div>
                      ))}
                      {(!commentsData[post.id] || commentsData[post.id].length === 0) && (
                        <p className="text-center text-xs text-slate-400 font-black uppercase py-6 tracking-widest italic">Sé el primero en dar tu opinión</p>
                      )}
                    </div>
                    
                    {/* Input de Comentario */}
                    <div className="relative flex items-center gap-3">
                      <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded-full flex-shrink-0 flex items-center justify-center text-[#001D4A] dark:text-white font-black uppercase text-sm border border-slate-200 dark:border-slate-600 transition-colors">
                        {userName ? userName.charAt(0) : "U"}
                      </div>
                      <input 
                        onKeyDown={(e) => { if(e.key === 'Enter') { handleAddComment(post.id, e.target.value); e.target.value = ''; } }}
                        placeholder="Escribe tu respuesta y presiona Enter..." 
                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-full px-6 py-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
          
          {filteredPosts.length === 0 && (
             <div className="bg-white dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-[3rem] p-20 text-center flex flex-col items-center transition-colors">
                <MessageSquare size={48} className="text-slate-200 dark:text-slate-600 mb-4" />
                <h3 className="text-xl font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic">No hay publicaciones</h3>
             </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ComunidadView;
