import Account from "./Account";
import Bonus from "./Bonus";

export default function App() {

  return (
    <>
      <h1>Redux Toolkit</h1>
      <h3 className="highlight-amount">Current amount: ₹</h3>

      <h3 className="highlight-amount">Total Bonus: </h3>

      <div className="compo-wrapper">
        <Account />
        <Bonus />
      </div>
    </>
  )
}