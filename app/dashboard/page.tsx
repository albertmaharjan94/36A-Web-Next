import { getUserData } from "@/lib/cookies";
export default async function DashboardPage() {
    const userData = await getUserData();
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {userData?.email || 'Not Logged In'}!</p>
        </div>
    );
}