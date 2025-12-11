'use client';

import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const router = useRouter();

    const handleLogout = () => {
        router.push('/sign-in');
    };

    return (
        <div className="dashboard">
            <header>
                <h1>Dashboard</h1>
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </header>
            <main>
                <h2>Welcome to MozFlow Dashboard!</h2>
                <p>You have successfully logged in.</p>
                <br />
                <p style={{ color: '#6b7280' }}>
                    This is a mock dashboard page for Playwright E2E testing.
                </p>
            </main>
        </div>
    );
}
