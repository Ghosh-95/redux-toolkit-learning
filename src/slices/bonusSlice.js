import { createSlice } from "@reduxjs/toolkit"

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
});

export const { increment } = bonusSlice.actions;
export default bonusSlice.reducer;