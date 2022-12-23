import { redirect } from "next/navigation";
import "server-only";
import createClient from "~/util/supabase-server";

// do not cache this layout due to the access token
export const revalidate = 0;

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (user) {
    redirect("/");
  }

  return <>{children}</>;
}
