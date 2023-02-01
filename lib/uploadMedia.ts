import supabase from "~/util/supabase-browser";

const uploadFile = async (file: File, name: string) => {
  const { data, error } = await supabase.storage
    .from("media")
    .upload(name, file);
  if (error) {
    throw error;
  }
  return (
    "https://pmgxknlyzvixzwjqqkzg.supabase.co/storage/v1/object/public/media/" +
    data.path
  );
};

export default uploadFile;
