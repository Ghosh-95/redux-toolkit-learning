import { useGetAccountsQuery } from "../api/adminSlice"

export default function Admin() {
    const { data, error, isLoading } = useGetAccountsQuery();

    return (
        <div className="admin">
            <h4>Admin component</h4>

            <div>
                {data && data.map(acc => <p key={acc.id}>Person {acc.id} : {acc.amount}</p>)}
            </div>
        </div>
    )
}