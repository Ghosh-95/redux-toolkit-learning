import { configureStore } from "@reduxjs/toolkit";

// importing the default reducers by giving them corresponding names
import accountReducer from "./src/slices/accountSlice";
import bonusReducer from "./src/slices/bonusSlice";
import rewardReducer from "./src/reducers/rewardReducer";

const myStore = configureStore({
    reducer: {
        account: accountReducer,
        bonus: bonusReducer,
        reward: rewardReducer,
    }
});

export default myStore;