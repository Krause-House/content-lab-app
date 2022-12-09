import PageHeader from "~/components/PageHeader";

export default async function Gameday() {
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
