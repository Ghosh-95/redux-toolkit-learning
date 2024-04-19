import { useSelector } from "react-redux";
import Account from "./Account";
import Bonus from "./Bonus";
import Reward from "./Reward";

export default function App() {
  const account = useSelector(state => state.account);
  const points = useSelector(state => state.bonus.points);

  return (
    <>
      <h1>Redux Toolkit</h1>
      {account.pending ? <p className="highlight-amount">Loading....</p> : account.error ? <p className="error">{account.error.message}</p> : <h3 className="highlight-amount">Current amount: ₹{account.amount}</h3>}

      <h3 className="highlight-amount">Total Bonus: {points}</h3>

      <div className="compo-wrapper">
        <Account />
        <Bonus />
        <Reward />
      </div>
    </>
  )
}