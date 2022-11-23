import supabase from "~/util/supabaseClient";

const fetchHosts = async () => {
  const { data, error } = await supabase.from("hosts").select();

  return { data, error };
};

export default fetchHosts;
