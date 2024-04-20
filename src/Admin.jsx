import { useState } from "react";
import { useGetAccountsQuery, useGetBonusesQuery, useAddAccountsMutation, useDeleteAccountsMutation } from "../api/adminSlice";

export default function Admin() {
    const [amount, setAmount] = useState(0);
    const [userId, setUserId] = useState('');
    const [delUserId, setDelUserId] = useState('');

    const { data: accData, error: accError, isLoading: accIsLoading } = useGetAccountsQuery();

    const { data: bonusData, error: bonusError, isLoading: bonusIsLoading } = useGetBonusesQuery();

    const [addAccounts, addResponse] = useAddAccountsMutation();
    const [deleteAccounts, delResponse] = useDeleteAccountsMutation();
    return (
        <div className="admin">
            <h4>Admin component</h4>

            <div className="p-wrap">
                <div>
                    <h5>Accounts</h5>
                    {accData && accData.map(acc => <p className="p-display" key={acc.id}>User-{acc.id}: ₹{acc.amount}</p>)}
                </div>
                <div>
                    <h5>Bonus Points</h5>
                    {bonusData && bonusData.map(bonus => <p className="p-display" key={bonus.id}>User-{bonus.id}: {bonus.points}</p>)}
                </div>
            </div>

            <div className="add-userAcc">
                <input type="number" placeholder="insert amount" id="amount" onChange={(e) => setAmount(+e.target.value)} />
                <input type="text" placeholder="insert id" id="userId" onChange={(e) => setUserId(e.target.value)} />
                <button onClick={() => userId && amount && addAccounts(amount, userId)}>Add Account</button>
            </div>
            <div className="del-userAcc">
                {delResponse.status === 'rejected' && <p className="error">{delResponse.error.data}</p>}
                <input type="text" placeholder="insert id to delete" id="delUserId" onKeyDown={(e) => e.key === "Enter" && delUserId && deleteAccounts(delUserId)} onChange={(e) => setDelUserId(e.target.value)} />
                <button onClick={() => delResponse.status === 'fulfilled' && delUserId && deleteAccounts(delUserId)}>Delete</button>
            </div>
        </div>
    )
}