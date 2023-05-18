import { createSlice } from '@reduxjs/toolkit';

const location0 = {
    id: '0',
    lat: '',
    lng: '',
    titulo: '',
    tipo: '',
    gerente: '',
    direccion: '',
    telefono: '',
};

const locationSlice = createSlice({
    name: 'location',
    initialState: location0,
    reducers: {
        setLocation (state, action) {
            const { id, lat, lng, titulo, tipo, gerente, direccion, telefono} = action.payload;
            state.id = id;
            state.lat = lat;
            state.lng = lng;
            state.titulo = titulo;
            state.tipo = tipo;
            state.gerente = gerente;
            state.direccion = direccion;
            state.telefono = telefono;
        }
    }
});

export default locationSlice.reducer;
export const { setLocation } = locationSlice.actions;
export const selectLocation = state => state.location;