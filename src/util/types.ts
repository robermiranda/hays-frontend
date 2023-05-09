export type tiendaT = {
    id: string;
    lat: string;
    lng: string;
    titulo: string;
    gerente: string;
    tipo: string;
    telefono: string;
    direccion: string;
}

export type tiendaResponseT = {
    _id: string;
    position: {
        lat: string;
        lng: string;
    };
    informacion: {
        titulo: string;
        gerente: string;
        tipo: string;
        telefono: string;
        direccion: string;
    };
}

export const tienda0: tiendaT = {
    id: "",
    lat: "",
    lng: "",
    titulo: "",
    gerente: "",
    tipo: "",
    telefono: "",
    direccion: ""
}