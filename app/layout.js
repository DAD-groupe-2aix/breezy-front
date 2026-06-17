import "./globals.css";

export const metadata = {
  title: "Breezy",
  description: "Le réseau social pour les gays",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
