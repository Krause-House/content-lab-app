import supabase from "~/util/supabase-browser";

export default async function submitAppleId(
  userEmail: string,
  appleId: string
): Promise<string> {
  const { data, error } = await supabase
    .from("users")
    .upsert({ email: userEmail, apple_id: appleId })
    .select();
  if (error || !data) {
    throw error ?? "Something went wrong";
  }
  return data[0];
}
