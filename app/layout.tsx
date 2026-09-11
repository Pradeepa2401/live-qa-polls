import "./globals.css";

export const metadata = {
  title: "Live Q&A Tracker",
  description: "A live question and answer tracking system"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}