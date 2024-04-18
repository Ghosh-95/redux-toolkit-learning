import { configureStore } from "@reduxjs/toolkit";

// importing the default reducers by giving them corresponding names
import accountReducer from "./src/slices/accountSlice";
import bonusReducer from "./src/slices/bonusSlice";

const myStore = configureStore({
    reducer: {
        account: accountReducer,
        bonus: bonusReducer,
    }
});

export default myStore;