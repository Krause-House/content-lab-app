export enum CONTEST_TYPE {
  POLL = "poll",
  REFERRALS = "referral",
  REVIEWS = "review",
}
export enum CONTEST_DISPLAY {
  LIST = "list",
  GRID = "grid",
}
type Contest = {
  id: number;
  name: string;
  description: string;
  created_at?: Date;
  end_date?: Date;
  created_by: number;
  is_visible: boolean;
  is_active: boolean;
  type: CONTEST_TYPE;
  display?: CONTEST_DISPLAY;
  allow_submissions?: boolean;
  link?: string;
};

export default Contest;
