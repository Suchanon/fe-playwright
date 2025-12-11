'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
    const router = useRouter();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleLogout = () => {
        router.push('/sign-in');
    };

    return (
        <div className="dashboard" style={{ cursor: 'none' }}>
            {/* Custom shaking cursor */}
            <div
                className="shake-cursor"
                style={{
                    position: 'fixed',
                    left: mousePos.x - 20,
                    top: mousePos.y - 20,
                    width: '40px',
                    height: '40px',
                    pointerEvents: 'none',
                    zIndex: 9999,
                }}
            >
                <img
                    src="/beer-cursor.png"
                    alt="cursor"
                    style={{ width: '100%', height: '100%' }}
                />
            </div>

            {/* Keyframe animation for random shake like a bottle */}
            <style jsx>{`
                @keyframes shake {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    10% { transform: translate(-10px, -5px) rotate(-2deg); }
                    20% { transform: translate(8px, 10px) rotate(3deg); }
                    30% { transform: translate(-12px, 3px) rotate(-1deg); }
                    40% { transform: translate(5px, -8px) rotate(2deg); }
                    50% { transform: translate(-8px, 6px) rotate(-3deg); }
                    60% { transform: translate(10px, -3px) rotate(1deg); }
                    70% { transform: translate(-6px, 8px) rotate(-2deg); }
                    80% { transform: translate(12px, -6px) rotate(3deg); }
                    90% { transform: translate(-4px, 4px) rotate(-1deg); }
                    100% { transform: translate(0, 0) rotate(0deg); }
                }
                .video-frame {
                    animation: shake 0.2s ease-in-out infinite;
                }
                .shake-cursor {
                    animation: shake 0.15s ease-in-out infinite;
                }
            `}</style>

            <header>
                <h1>Dashboard</h1>
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </header>
            <main>
                <h2>Welcome to MozFlow Dashboard!</h2>
                <p>You have successfully logged in.</p>

                {/* Modern Video Frame with Shake Animation */}
                <div style={{
                    marginTop: '2rem',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <div
                        className="video-frame"
                        style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            padding: '1rem',
                            borderRadius: '20px',
                            boxShadow: '0 20px 60px rgba(102, 126, 234, 0.4)',
                        }}
                    >
                        <video
                            autoPlay
                            controls
                            style={{
                                borderRadius: '12px',
                                maxWidth: '100%',
                                width: '800px',
                                display: 'block',
                            }}
                            src="/rickroll.mp4"
                        />
                    </div>
                </div>

                <p style={{ color: '#6b7280', marginTop: '1.5rem', textAlign: 'center' }}>
                    🎵 Never gonna give you up!
                </p>
            </main>
        </div>
    );
}
