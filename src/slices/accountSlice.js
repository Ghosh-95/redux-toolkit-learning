import { createSlice } from "@reduxjs/toolkit";

const initialState = { amount: 1 };

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        increment(state) {
            state.amount += 1;
        },
        decrement(state) {
            state.amount -= 1;
        },
        incrementByAmt(state, action) {
            state.amount += action.payload;
        }
    },
});

// Action creators will be generated for each case reducer function
export const { increment, decrement, incrementByAmt } = accountSlice.actions;

export default accountSlice.reducer;