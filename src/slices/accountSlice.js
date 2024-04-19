import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserById = createAsyncThunk(
    'account/getUser',
    async (userId, thunkAPI) => {
        const { data } = await axios.get(`http://localhost:8080/accounts/${userId}`);

        return data.amount;
    }
);

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

    extraReducers(builder) {
        builder.addCase(getUserById.fulfilled, (state, action) => { // work on fulfilled action
            state.amount = action.payload;
            state.pending = false;
            state.error = false;
        }).addCase(getUserById.pending, (state) => {
            state.pending = true;
            state.error = false;
        }).addCase(getUserById.rejected, (state, action) => {
            state.pending = false;
            state.error = action.error;
        })
    }
});

// Action creators will be generated for each case reducer function
export const { increment, decrement, incrementByAmt } = accountSlice.actions;

export default accountSlice.reducer;