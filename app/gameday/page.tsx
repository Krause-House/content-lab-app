import HostVoting from "~/components/HostVoting";
import PageHeader from "~/components/PageHeader";
import createClient from "~/util/supabase-server";

export default async function Gameday() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: hosts } = await supabase.from("hosts").select();

  return (
    <>
      <iframe
        src="https://playback.tv/krausehouse"
        className="w-screen h-[800px]"
      />
      <main className="relative px-4 mx-auto max-w-7xl">
        <PageHeader
          title="Krause House Gameday"
          description="Welcome to a better way to watch your favorite NBA teams. We've
          partnered with Playback to provide you with live streamed NBA action,
          great commentary from hosts picked by you, and a rowdy community of
          hoops fanatics."
        />
      </main>
    </>
  );
}
