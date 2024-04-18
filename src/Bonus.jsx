import { useDispatch, useSelector } from "react-redux";
import { increment } from "./slices/bonusSlice";

export default function Bonus() {
    const points = useSelector(state => state.bonus.points);
    const dispatch = useDispatch();

    return (
        <div className="bonus-wrapper">
            <h4 className="head-point">Bonus Component</h4>
            <p className="highlight-amount">Bonus points: {points}</p>
            <button className="btn" onClick={() => dispatch(increment())}>Increment</button>
        </div>
    )
}