import "./globals.css";

export const metadata = {
  title: "Lenovo | AI Solutions",
  description: "Partner with Lenovo for more efficient hybrid AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}