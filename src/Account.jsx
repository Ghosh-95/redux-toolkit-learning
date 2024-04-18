import { useState } from "react";

export default function Account() {
    const [account, setAccount] = useState({ amount: 0 });
    const [value, setValue] = useState(0);

    const incrementByInput = (value) => setAccount({ amount: account.amount + value });

    return (
        <div className="account-wrapper">
            <h4 className="head-point">Account Component</h4>
            <p className="highlight-amount">Amount: ₹{account.amount}</p>
            <button className="btn" onClick={() => setAccount({ amount: account.amount + 1 })}>Increment</button>
            <button className="btn" onClick={() => setAccount({ amount: account.amount - 1 })}>Decrement</button>

            <div className="increment-value">
                <input
                    onChange={(e) => setValue(+e.target.value)} onKeyDown={(e) => e.key === "Enter" && incrementByInput(value)}
                    type="text"
                    name="input-amount"
                    id="inp-amount" />
                <button onClick={() => incrementByInput(value)}>IncrementBy - {value}</button>
            </div>
        </div>
    )
}