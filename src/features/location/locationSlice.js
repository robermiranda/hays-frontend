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
    initialState: {
        value: location0,
    },
    reducers: {
        setLocation (state, action) {
            const { id, lat, lng, titulo, tipo, gerente, direccion, telefono} = action.payload;
            state.value.id = id;
            state.value.lat = lat;
            state.value.lng = lng;
            state.value.titulo = titulo;
            state.value.tipo = tipo;
            state.value.gerente = gerente;
            state.value.direccion = direccion;
            state.value.telefono = telefono;
        }
    }
});

export default locationSlice.reducer;
export const { setLocation } = locationSlice.actions;
export const selectLocation = state => state.location.value;