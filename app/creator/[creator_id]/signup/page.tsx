import "server-only";
import createClient from "~/util/supabase-server";
import AuthForm from "~/components/Forms/AuthForm";
import { redirect } from "next/navigation";
import BannerImage from "~/components/BannerImage";
import fetchCreator from "~/lib/fetchCreator";

export default async function SignUp({
  params,
  searchParams,
}: {
  params: { creator_id: string };
  searchParams?: { referredBy?: string; redirectTo?: string };
}) {
  const supabase = createClient();
  const [
    {
      data: { user },
    },
    creator,
  ] = await Promise.all([
    supabase.auth.getUser(),
    fetchCreator(params.creator_id),
  ]);

  if (user) {
    redirect(searchParams?.redirectTo || "/");
  }

  return (
    <>
      {creator.banner_image_url && (
        <div className="hidden sm:block">
          <BannerImage imageUrl={creator.banner_image_url} />
        </div>
      )}
      <main className="flex flex-col items-center justify-center gap-8 p-8">
        <AuthForm
          onlyMode="Sign Up"
          creatorIdToSubscribeTo={params?.creator_id}
          referredByEmail={searchParams?.referredBy}
        />
      </main>
    </>
  );
}
