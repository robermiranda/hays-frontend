import { tiendaT, tiendaResponseT } from "./types";

const URL_BASE: string = 'http://localhost:3001';

export function getTiendaList (): Promise<tiendaResponseT[]> {
    return fetch(`${URL_BASE}/tiendas`)
    .then((response) => response.json())
    .then(response => response)
    .catch(error => {
        if(error instanceof Error) {
            console.error('ERROR while getting bank list', error.message);
        }

        return [];
    });
}

export function postTienda (tienda: tiendaT): Promise<string> {

    if (Number.isNaN(Number.parseFloat(tienda.lat)) || Number.isNaN(Number.parseFloat(tienda.lng))) {
        return Promise.resolve("");
    }

    return fetch(`${URL_BASE}/tienda`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tienda),
    })
    .then(response => response.json())
    .then(response => {
        if (response.status === "ok") return response.data.id;
        return "";
    })
    .catch(error => {
        if(error instanceof Error) {
            console.error('ERROR while post tienda', error.message);
        }

        return "";
    });
}

export function updateTienda (tienda: tiendaT): Promise<boolean> {
    
    if (tienda.id.length === 0) return Promise.resolve(false);

    return fetch(`${URL_BASE}/tienda`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tienda),
    })
    .then(response => response.json())
    .then(response => {
        if (response.status === "ok") return true;
        return false;
    })
    .catch(error => {
        if(error instanceof Error) {
            console.error('ERROR while post tienda', error.message);
        }

        return false;
    });
}

export function deleteTienda (tiendaId: string): Promise<boolean> {
    
    if (tiendaId.length === 0) return Promise.resolve(false);

    return fetch(`${URL_BASE}/tienda/${tiendaId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(response => {
        if (response.status === "ok") return true;
        return false;
    })
    .catch(error => {
        if(error instanceof Error) {
            console.error('ERROR while post tienda', error.message);
        }

        return false;
    });
}