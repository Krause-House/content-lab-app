import "server-only";
import createClient from "~/util/supabase-server";
import AuthForm from "~/components/AuthForm";
import { redirect } from "next/navigation";

export default async function SignUp({
  searchParams,
}: {
  searchParams?: { creator?: string; referredBy?: string; redirectTo?: string };
}) {
  const supabase = createClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (user) {
    console.log("redirecting...");
    redirect(searchParams?.redirectTo || "/");
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8 py-32">
      <AuthForm
        onlyMode="Sign Up"
        creatorIdToSubscribeTo={searchParams?.creator}
        referredByEmail={searchParams?.referredBy}
        redirectTo={searchParams?.redirectTo}
      />
    </div>
  );
}
