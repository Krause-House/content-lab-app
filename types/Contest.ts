type Contest = {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  end_date: Date;
  created_by: string;
  is_visible: boolean;
  is_active: boolean;
};

export default Contest;
