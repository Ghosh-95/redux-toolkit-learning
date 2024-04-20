import { useGetAccountsQuery, useGetBonusesQuery, useAddAccountsMutation } from "../api/adminSlice";

export default function Admin() {
    const { data: accData, error: accError, isLoading: accIsLoading } = useGetAccountsQuery();

    const { data: bonusData, error: bonusError, isLoading: bonusIsLoading } = useGetBonusesQuery();

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
        </div>
    )
}