import supabase from "~/util/supabaseClient";

const addHost = async () => {
  const { data, error } = await supabase.from("hosts").select();

  return { data, error };
};

export default addHost;
