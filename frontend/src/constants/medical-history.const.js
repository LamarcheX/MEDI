export const tratamiento = {
    nombre: '',
    dosis: '',
    frecuencia: '',
    duracion: '',
    notas: '',
};

export const consulta = {
    fecha: '',
    doctor: '',
    motivo: '',
    diagnostico: '',
    tratamiento: [tratamiento],
    nota: '',
};

export const historialClinico = {
    paciente: '',
    consultas: [consulta],
    
};
