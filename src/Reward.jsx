import { useDispatch, useSelector } from "react-redux";
import { increment } from "./reducers/rewardReducer";

export default function Reward() {
    const points = useSelector(state => state.reward.points);
    const dispatch = useDispatch();

    return (
        <div className="bonus-wrapper">
            <h4 className="head-point">Reward Component</h4>
            <p className="highlight-amount">Reward points: {points}</p>
            <button className="btn" onClick={() => dispatch(increment())}>Increment</button>
        </div>
    )
}