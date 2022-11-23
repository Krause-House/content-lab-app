type User = {
  id: string;
  user_metadata?: {
    full_name: string;
    avatar_url: string;
    name: string;
  };
};

export default User;
