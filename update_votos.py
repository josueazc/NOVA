import re

with open('/Users/josue/Downloads/ProyectoDesa/src/data/partidosData.jsx', 'r') as f:
    content = f.read()

# Buscamos todos los historiales de votos y agregamos el de 2026 al final
# El regex busca el bloque de historialVotos y el último elemento, luego agrega el de 2026.
# Pero para hacerlo seguro, mejor hacemos reemplazos específicos.

content = content.replace(
    '{ ano: "2022", porcentaje: 27.3, color: "#22c55e" }',
    '{ ano: "2022", porcentaje: 27.3, color: "#22c55e" },\n      { ano: "2026", porcentaje: 0, color: "#e2e8f0" }'
)

content = content.replace(
    '{ ano: "2022", porcentaje: 12.4, color: "#2563eb" }',
    '{ ano: "2022", porcentaje: 12.4, color: "#2563eb" },\n      { ano: "2026", porcentaje: 0, color: "#e2e8f0" }'
)

content = content.replace(
    '{ ano: "2022", porcentaje: 12.3, color: "#f97316" }',
    '{ ano: "2022", porcentaje: 12.3, color: "#f97316" },\n      { ano: "2026", porcentaje: 0, color: "#e2e8f0" }'
)

content = content.replace(
    '{ ano: "2022", porcentaje: 8.7, color: "#ca8a04" }',
    '{ ano: "2022", porcentaje: 8.7, color: "#ca8a04" },\n      { ano: "2026", porcentaje: 0, color: "#e2e8f0" }'
)

content = content.replace(
    '{ ano: "2022", porcentaje: 14.8, color: "#1e3a8a" }',
    '{ ano: "2022", porcentaje: 14.8, color: "#1e3a8a" },\n      { ano: "2026", porcentaje: 0, color: "#e2e8f0" }'
)

# PPS no tenía votos
content = content.replace(
    'historialVotos: []',
    'historialVotos: [\n      { ano: "2026", porcentaje: 0, color: "#e2e8f0" }\n    ]'
)

# AC no tenía votos (es posible que ya se haya reemplazado el de arriba, usemos regex para los vacíos)
content = re.sub(r'historialVotos: \[\],', 'historialVotos: [\n      { ano: "2026", porcentaje: 0, color: "#e2e8f0" }\n    ],', content)

content = content.replace(
    '{ ano: "2022", porcentaje: 1.7, color: "#2563eb" }',
    '{ ano: "2022", porcentaje: 1.7, color: "#2563eb" },\n      { ano: "2026", porcentaje: 0, color: "#e2e8f0" }'
)

content = content.replace(
    '{ ano: "2022", porcentaje: 1.0, color: "#ef4444" }',
    '{ ano: "2022", porcentaje: 1.0, color: "#ef4444" },\n      { ano: "2026", porcentaje: 0, color: "#e2e8f0" }'
)

content = content.replace(
    '{ ano: "2022", porcentaje: 0.6, color: "#a16207" }',
    '{ ano: "2022", porcentaje: 0.6, color: "#a16207" },\n      { ano: "2026", porcentaje: 0, color: "#e2e8f0" }'
)

content = content.replace(
    '{ ano: "2022", porcentaje: 0.4, color: "#1d4ed8" }',
    '{ ano: "2022", porcentaje: 0.4, color: "#1d4ed8" },\n      { ano: "2026", porcentaje: 0, color: "#e2e8f0" }'
)

with open('/Users/josue/Downloads/ProyectoDesa/src/data/partidosData.jsx', 'w') as f:
    f.write(content)

print("Historial de votos actualizado a 2026.")
