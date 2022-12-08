import "server-only";
import Header from "~/components/Header";
import SupabaseListener from "~/components/supabase-listener";
import ToastContainer from "~/components/ToastContainer";
import createClient from "~/util/supabase-server";
import "./globals.css";

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
      <body className="relative overflow-x-hidden font-light bg-tan-500">
        <ToastContainer />
        <Header user={user} />
        <div className="mt-16">{children}</div>
        <footer></footer>
      </body>
    </html>
  );
}
