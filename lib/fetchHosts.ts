import "server-only";
import createClient from "~/util/supabase-server";

const fetchHosts = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("hosts").select();

  return { data, error };
};

export default fetchHosts;
