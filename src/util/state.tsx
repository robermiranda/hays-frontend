import { atom, selector } from 'recoil';
import { tiendaT, tiendaResponseT } from './types';
import { getTiendaList } from './net';


export const tiendaListAtom = atom<tiendaT[]> ({
    key: 'tiendaList_atom',
    default: []
});

const tiendaListFetched = selector<tiendaResponseT[]> ({
    key: 'tiendaListFetched_selector',
    get: async () => {
        const response: tiendaResponseT[] = await getTiendaList();
        return response;
    }
});

export const tiendaListState = selector<tiendaT[]> ({
    key: 'tiendaListState_selector',
    get: ({get}) => {
        const tiendaList = get(tiendaListFetched);
        return tiendaList.map((tienda: tiendaResponseT) => {
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
