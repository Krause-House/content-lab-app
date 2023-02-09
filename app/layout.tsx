import "server-only";
import Header from "~/components/Header";
import SupabaseListener from "~/components/supabase-listener";
import ToastContainer from "~/components/ToastContainer";
import createClient from "~/util/supabase-server";
import Script from "next/script";
import "./globals.css";
import Footer from "~/components/Footer";

// do not cache this layout due to the access token
export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const user = (await supabase.auth.getUser()).data.user;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <head />
      <SupabaseListener accessToken={session?.access_token} />
      <body className="relative flex flex-col min-h-screen overflow-x-hidden font-light bg-tan-500">
        <ToastContainer />
        <Header user={user} />
        <div className="flex-1 mt-16">{children}</div>
        <Footer />
      </body>
      {process.env.NODE_ENV === "production" && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());
			gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}', {
			page_path: window.location.pathname,
		});
		`,
            }}
          />
        </>
      )}
    </html>
  );
}
