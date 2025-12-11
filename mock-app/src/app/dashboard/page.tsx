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

                <div style={{
                    marginTop: '2rem',
                    display: 'flex',
                    justifyContent: 'center',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
                }}>
                    <iframe
                        width="800"
                        height="450"
                        src="https://www.youtube.com/embed/GBIIQ0kP15E?autoplay=1&mute=1"
                        title="Playwright Tutorial"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>

                <p style={{ color: '#6b7280', marginTop: '1.5rem', textAlign: 'center' }}>
                    Learn Playwright E2E Testing with this video tutorial!
                </p>
            </main>
        </div>
    );
}
