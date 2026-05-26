import "./globals.css";

export const metadata = {
  title: "Pasaporte de Pasante",
  description: "Dashboard gamificado de misiones",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="font-mono">
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
