import supabase from "~/util/supabaseClient";
import getCurrentUserClientSide from "./getCurrentUserClientSide";

const addHost = async () => {
  const user = await getCurrentUserClientSide();
  if (!user) {
    throw new Error("User is not logged in");
  }

  const { data, error } = await supabase.from("hosts").insert({
    user: user.id,
    displayName: user.user_metadata.full_name,
    discordName: user.user_metadata.name,
    avatarUrl: user.user_metadata.avatar_url,
  });

  return user;
};

export default addHost;
