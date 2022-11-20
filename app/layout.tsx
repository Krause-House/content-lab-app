import Header from "~/components/Header";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="relative font-light bg-tan-500">
        <Header />
        <div className="mt-16">{children}</div>
        <footer></footer>
      </body>
    </html>
  );
}
