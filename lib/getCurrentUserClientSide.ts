import { getCookie } from "cookies-next";
import supabase from "~/util/supabaseClient";

const getCurrentUserClientSide = async () => {
  const refreshToken = getCookie("gameday-refresh-token") as string;
  const accessToken = getCookie("gameday-access-token") as string;
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

export default getCurrentUserClientSide;
