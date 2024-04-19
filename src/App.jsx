import { useSelector } from "react-redux";
import Account from "./Account";
import Bonus from "./Bonus";
import Reward from "./Reward";

export default function App() {
  const amount = useSelector(state => state.account.amount);
  const points = useSelector(state => state.bonus.points);

  return (
    <>
      <h1>Redux Toolkit</h1>
      <h3 className="highlight-amount">Current amount: ₹{amount}</h3>

      <h3 className="highlight-amount">Total Bonus: {points}</h3>

      <div className="compo-wrapper">
        <Account />
        <Bonus />
        <Reward />
      </div>
    </>
  )
}