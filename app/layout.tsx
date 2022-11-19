import Header from "~/components/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="relative font-light bg-tan-500">
        <Header />
        <div className="mt-16">{children}</div>
        <footer></footer>
      </body>
    </html>
  );
}
