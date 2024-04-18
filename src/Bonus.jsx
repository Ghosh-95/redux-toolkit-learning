import { useState } from "react";

export default function Bonus() {
    const [bonus, setBonus] = useState({ points: 0 });

    return (
        <div className="bonus-wrapper">
            <h4 className="head-point">Bonus Component</h4>
            <p className="highlight-amount">Bonus points: {bonus.points}</p>
            <button className="btn" onClick={() => setBonus({ points: bonus.points + 1 })}>Increment</button>
        </div>
    )
}