import "server-only";
import { cookies } from "next/headers";
import supabase from "~/util/supabaseClient";

const getCurrentUser = async () => {
  const nextCookies = cookies();
  const refreshToken = nextCookies.get("gameday-refresh-token")?.value;
  const accessToken = nextCookies.get("gameday-access-token")?.value;
  if (refreshToken && accessToken) {
    await supabase.auth.setSession({
      refresh_token: refreshToken,
      access_token: accessToken,
    });
  } else {
    return null;
  }

  // returns user information
  const userResponse = await supabase.auth.getUser();
  return userResponse.data.user;
};

export default getCurrentUser;
