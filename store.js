import { configureStore } from "@reduxjs/toolkit";

// importing the default reducers by giving them corresponding names
import accountReducer from "./src/slices/accountSlice";
import bonusReducer from "./src/slices/bonusSlice";
import rewardReducer from "./src/reducers/rewardReducer";
import { adminAPI } from "./api/adminSlice";

const myStore = configureStore({
    reducer: {
        account: accountReducer,
        bonus: bonusReducer,
        reward: rewardReducer,
        [adminAPI.reducerPath]: adminAPI.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(adminAPI.middleware)
});

export default myStore;