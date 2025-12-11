'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Mock valid credentials
const VALID_CREDENTIALS = {
    email: 'test@example.com',
    password: 'testpassword123',
};

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isFormValid = email.trim() !== '' && password.trim() !== '';

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (errorText) setErrorText('');
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (errorText) setErrorText('');
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrorText('');

        // Validate email format
        if (!isValidEmail(email)) {
            setErrorText('รูปแบบอีเมลไม่ถูกต้อง');
            return;
        }

        setIsLoading(true);

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Check credentials
        if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
            router.push('/dashboard');
        } else {
            setErrorText('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
        }

        setIsLoading(false);
    };

    return (
        <div className="page">
            <div className="panel">
                <div className="form-wrapper">
                    <div className="form">
                        <div className="logo">🚀 MozFlow</div>
                        <div className="title">
                            <h4>เข้าสู่ระบบ</h4>
                        </div>

                        {/* Social Login Buttons */}
                        <button type="button" className="btn btn-outline">
                            <span>🔵</span>
                            <span>Continue with Google</span>
                        </button>

                        <button type="button" className="btn btn-outline">
                            <span>📘</span>
                            <span>Continue with Facebook</span>
                        </button>

                        <p className="divider">or</p>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <span className="input-icon">📧</span>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="อีเมล"
                                    value={email}
                                    onChange={handleEmailChange}
                                    className={errorText ? 'error' : ''}
                                    autoComplete="email"
                                />
                            </div>

                            <div className="input-group">
                                <span className="input-icon">🔒</span>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="รหัสผ่าน"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className={errorText ? 'error' : ''}
                                    autoComplete="current-password"
                                />
                                {errorText && <div className="error-text">{errorText}</div>}
                            </div>

                            <div className="button-wrapper">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={!isFormValid || isLoading}
                                >
                                    {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
                                </button>
                            </div>
                        </form>

                        <div className="links">
                            <p>
                                ยังไม่มีบัญชี?{' '}
                                <Link href="/create-account">สมัครสมาชิก</Link>
                            </p>
                            <p>
                                ลืมรหัสผ่าน?{' '}
                                <Link href="/forgot-password">กู้คืนรหัสผ่าน</Link>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="footer">
                    <p>© 2024 MozFlow. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}
