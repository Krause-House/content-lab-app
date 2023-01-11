export const contest_types = ["poll", "referrals"] as const;
type Contest = {
  id: number;
  name: string;
  description: string;
  created_at?: Date;
  end_date?: Date;
  created_by: number;
  is_visible: boolean;
  is_active: boolean;
  type: typeof contest_types[number];
};

export default Contest;
