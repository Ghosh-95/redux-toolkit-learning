import { createReducer, createAction } from '@reduxjs/toolkit';

// actions
const increment = createAction('reward/increment');

const initialState = {
    points: 15,
};

const rewardReducer = createReducer(initialState, (builder) => {
    builder.addCase(increment, (state, action) => {
        state.points += 1;
    })
});

export default rewardReducer;