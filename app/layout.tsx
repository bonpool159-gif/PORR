import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/components/providers/auth-provider';
import { WebSocketProvider } from '@/components/providers/websocket-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OlaClick - Restaurant Management System',
  description: 'Complete multi-tenant restaurant management and ordering system',
  manifest: '/manifest.json',
  themeColor: '#3B82F6',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <WebSocketProvider>
            {children}
            <Toaster />
          </WebSocketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}