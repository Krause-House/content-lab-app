export enum CONTEST_TYPE {
  POLL = "poll",
  REFERRALS = "referrals",
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
  display: CONTEST_DISPLAY;
};

export default Contest;
