import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { PostsProvider } from '@/context/PostsContext';

export const metadata = {
  title: 'Breezy',
  description: 'Le réseau social pour les gays',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-full">
        <AuthProvider>
          <PostsProvider>
            {children}
          </PostsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
