import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'MozFlow - Mock App',
    description: 'Mock frontend for Playwright E2E testing',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
