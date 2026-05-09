import re

with open('/Users/josue/Downloads/ProyectoDesa/src/data/partidosData.jsx', 'r') as f:
    content = f.read()

# PLN
content = content.replace(
    '      { año: "2010", hito: "Primera Presidenta", desc: "Laura Chinchilla Miranda." }\n    ],',
    '      { año: "2010", hito: "Primera Presidenta", desc: "Laura Chinchilla Miranda." },\n      { año: "2024", hito: "Municipales", desc: "Mantiene la mayoría de alcaldías (29)." },\n      { año: "2026", hito: "Elecciones 2026", desc: "Renovación de cara a los comicios nacionales." }\n    ],'
)

# PUSC
content = content.replace(
    '      { año: "2002", hito: "Gobierno", desc: "Elección de Abel Pacheco de la Espriella." }\n    ],',
    '      { año: "2002", hito: "Gobierno", desc: "Elección de Abel Pacheco de la Espriella." },\n      { año: "2024", hito: "Municipales", desc: "Crecimiento electoral alcanzando 20 alcaldías." },\n      { año: "2026", hito: "Elecciones 2026", desc: "Busca retornar a la presidencia tras 20 años." }\n    ],'
)

# PLP
content = content.replace(
    '      { año: "2022", hito: "Elecciones", desc: "Ingreso a la Asamblea con 6 escaños." }\n    ],',
    '      { año: "2022", hito: "Elecciones", desc: "Ingreso a la Asamblea con 6 escaños." },\n      { año: "2024", hito: "Municipales", desc: "Consigue sus primeras 3 alcaldías a nivel nacional." },\n      { año: "2026", hito: "Elecciones 2026", desc: "Consolidación como principal fuerza liberal." }\n    ],'
)

# FA
content = content.replace(
    '      { año: "2022", hito: "Consolidación", desc: "Logra 6 diputaciones clave en la Asamblea." }\n    ],',
    '      { año: "2022", hito: "Consolidación", desc: "Logra 6 diputaciones clave en la Asamblea." },\n      { año: "2024", hito: "Municipales", desc: "Aumento de representación en regidurías." },\n      { año: "2026", hito: "Elecciones 2026", desc: "Aspiran a liderar un bloque progresista nacional." }\n    ],'
)

# NR
content = content.replace(
    '      { año: "2022", hito: "Elecciones", desc: "Obtiene 7 escaños legislativos." }\n    ],',
    '      { año: "2022", hito: "Elecciones", desc: "Obtiene 7 escaños legislativos." },\n      { año: "2024", hito: "Municipales", desc: "Consolidación de bases en el nivel local." },\n      { año: "2026", hito: "Elecciones 2026", desc: "Nueva aspiración presidencial de Fabricio Alvarado." }\n    ],'
)

# PPS
content = content.replace(
    '      { año: "2022", hito: "Inscripción", desc: "Proceso de recolección de firmas e inscripción nacional." }\n    ],',
    '      { año: "2022", hito: "Inscripción", desc: "Proceso de recolección de firmas e inscripción nacional." },\n      { año: "2024", hito: "Municipales", desc: "Primera participación obteniendo presencia en concejos." },\n      { año: "2026", hito: "Elecciones 2026", desc: "Se perfila como principal fuerza del movimiento rodriguista." }\n    ],'
)

# AC
content = content.replace(
    '      { año: "2023", hito: "Creación", desc: "Agrupación de colectivos ciudadanos." }\n    ],',
    '      { año: "2023", hito: "Creación", desc: "Agrupación de colectivos ciudadanos." },\n      { año: "2026", hito: "Elecciones 2026", desc: "Primera incursión en la papeleta presidencial." }\n    ],'
)

# PNG
content = content.replace(
    '      { año: "2020", hito: "Crecimiento", desc: "Logran varias alcaldías y regidurías a nivel nacional." }\n    ],',
    '      { año: "2020", hito: "Crecimiento", desc: "Logran varias alcaldías y regidurías a nivel nacional." },\n      { año: "2024", hito: "Municipales", desc: "Revalidación de liderazgo en cantones clave." },\n      { año: "2026", hito: "Elecciones 2026", desc: "Enfoque en desarrollo cantonal hacia lo nacional." }\n    ],'
)

# PRSC
content = content.replace(
    '      { año: "2018", hito: "Elecciones", desc: "Logra 2 diputaciones (Dragos Dolanescu y Otto Roberto Vargas)." }\n    ],',
    '      { año: "2018", hito: "Elecciones", desc: "Logra 2 diputaciones (Dragos Dolanescu y Otto Roberto Vargas)." },\n      { año: "2024", hito: "Municipales", desc: "Alianza y obtención de escaños cantonales." },\n      { año: "2026", hito: "Elecciones 2026", desc: "Agrupación en busca de recuperar su bancada legislativa." }\n    ],'
)

# PAC2
content = content.replace(
    '      { año: "2018", hito: "2do Gobierno", desc: "Elección de Carlos Alvarado Quesada." }\n    ],',
    '      { año: "2018", hito: "2do Gobierno", desc: "Elección de Carlos Alvarado Quesada." },\n      { año: "2022", hito: "Debacle", desc: "Salida de la Asamblea Legislativa." },\n      { año: "2026", hito: "Elecciones 2026", desc: "Proceso de renovación para volver al parlamento." }\n    ],'
)

with open('/Users/josue/Downloads/ProyectoDesa/src/data/partidosData.jsx', 'w') as f:
    f.write(content)

print("Datos actualizados.")
