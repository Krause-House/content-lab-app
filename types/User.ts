type User = {
  id: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
    name?: string;
  };
};

type MaybeUser = User | null;

export default User;
export type { MaybeUser };
