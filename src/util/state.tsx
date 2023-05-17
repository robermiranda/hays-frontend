import { atom, selector } from 'recoil';
import { tiendaT, locationResponseT } from './types';
import { getTiendaList } from './net';


export const tiendaListAtom = atom<tiendaT[]> ({
    key: 'tiendaList_atom',
    default: []
});

const tiendaListFetched = selector<locationResponseT[]> ({
    key: 'tiendaListFetched_selector',
    get: async () => {
        const response: locationResponseT[] = await getTiendaList();
        return response;
    }
});

export const tiendaListState = selector<tiendaT[]> ({
    key: 'tiendaListState_selector',
    get: ({get}) => {
        const tiendaList = get(tiendaListFetched);
        return tiendaList.map((tienda: locationResponseT) => {
            return {
                id: tienda._id,
                lat: tienda.position.lat,
                lng: tienda.position.lng,
                titulo: tienda.informacion.titulo,
                tipo: tienda.informacion.tipo,
                gerente: tienda.informacion.gerente,
                telefono: tienda.informacion.telefono,
                direccion: tienda.informacion.direccion,
            }
        });
    },
    set: ({set}, newValue) => set(tiendaListAtom, newValue)
});
