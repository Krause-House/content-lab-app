type UserDetails = {
  voting_power: number;
  apple_id?: string;
};

const defaultUserDetails: UserDetails = {
  voting_power: 1,
};

export default UserDetails;
export { defaultUserDetails };
