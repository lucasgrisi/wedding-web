import { createSlice } from '@reduxjs/toolkit';

const initialCart = JSON.parse(localStorage.getItem('CartCache')) || [];

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: initialCart.length
    },
    reducers: {
        itemAdded: state => {
            state.value += 1;
        },
        itemRemoved: state => {
            state.value -= 1;
        },
        setQtdItems: (state, action) => {
            state.value = action.payload
        },
        clearItems: state => {
            state.value = 0
        }
    }
})

export const { itemAdded, itemRemoved, setQtdItems, clearItems } = cartSlice.actions
export default cartSlice.reducer