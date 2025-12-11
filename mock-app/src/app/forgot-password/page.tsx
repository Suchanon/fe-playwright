import Link from 'next/link';

export default function ForgotPasswordPage() {
    return (
        <div className="page">
            <div className="panel">
                <div className="form-wrapper">
                    <div className="form">
                        <div className="title">
                            <h4>กู้คืนรหัสผ่าน</h4>
                        </div>
                        <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '1.5rem' }}>
                            Forgot Password Page (Mock)
                        </p>
                        <Link href="/sign-in" className="btn btn-outline">
                            Back to Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
