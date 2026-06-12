import React from 'react';

const FeatureCard = ({ icon, title, desc, accentColor }) => (
 <div className="bg-white p-8 rounded-2xl flex items-start gap-5 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.04)] border border-slate-50 hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group">
  <div 
   className="w-14 h-14 rounded-2xl flex flex-shrink-0 items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3"
   style={{ backgroundColor: accentColor }}
  >
   {icon}
  </div>
  <div>
   <h3 className="font-black text-slate-900 text-[15px] mb-1.5 tracking-tight uppercase tracking-wider">{title}</h3>
   <p className="text-[11px] text-slate-400 leading-relaxed font-bold uppercase tracking-tighter">
    {desc}
   </p>
  </div>
 </div>
);

export default FeatureCard;
