import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByAmt, getUserById } from "./slices/accountSlice";

export default function Account() {
    const amount = useSelector(state => state.account.amount);
    const dispatch = useDispatch();

    const [value, setValue] = useState(0);
    const [userId, setUserId] = useState(1);
    const incrementByInput = (value) => dispatch(incrementByAmt(value));

    return (
        <div className="account-wrapper">
            <h4 className="head-point">Account Component</h4>
            <p className="highlight-amount">Amount: ₹{amount}</p>
            <button className="btn" onClick={() => dispatch(increment())}>Increment</button>
            <button className="btn" onClick={() => dispatch(decrement())}>Decrement</button>

            <div className="increment-value">
                <input
                    onChange={(e) => setValue(+e.target.value)} onKeyDown={(e) => e.key === "Enter" && incrementByInput(value)}
                    type="text"
                    name="input-amount"
                    id="inp-amount" />
                <button onClick={() => incrementByInput(value)}>IncrementBy - {value}</button>
            </div>
            <div className="async-ops">
                <input type="number" onChange={(e) => setUserId(e.target.value)} />
                <button onClick={() => dispatch(getUserById(userId))}>Get User ({userId})</button>
            </div>
        </div>
    )
}