import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { PostsProvider } from '@/context/PostsContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata = {
  title: 'Breezy',
  description: 'La new wave du réseau social',
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
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <PostsProvider>
                {children}
              </PostsProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
