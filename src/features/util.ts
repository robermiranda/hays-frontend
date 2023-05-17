import { tiendaT, locationResponseT } from "../util/types"

export function formateLocation (location: locationResponseT) {
    
    const { position, informacion } = location;

    const locationFormated : tiendaT = {
        id: location._id,
        lat: position.lat,
        lng: position.lng,
        titulo: informacion.titulo,
        tipo: informacion.tipo,
        gerente: informacion.gerente,
        direccion: informacion.direccion,
        telefono: informacion.telefono,
    }
    
    return locationFormated;
}