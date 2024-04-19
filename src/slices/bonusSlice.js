import { createAction, createSlice } from "@reduxjs/toolkit"

const incrementByAmount = createAction('account/incrementByAmt');

const bonusSlice = createSlice({
    name: 'bonus',
    initialState: {
        points: 0,
    },
    reducers: {
        increment(state) {
            state.points += 1;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(incrementByAmount, (state, action) => {
            if (action.payload >= 100) {
                state.points += Math.floor(action.payload / 100);
            } else {
                state.points -= 1;
            };
        })
    }
});

export const { increment } = bonusSlice.actions;
export default bonusSlice.reducer;