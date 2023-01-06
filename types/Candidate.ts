type Candidate = {
  id: number;
  contest_id: number;
  name: string;
  supporting_text: string;
  image_url: string;
  for: string[]; // emails
  against: string[]; // emails
  is_winner?: boolean;
};

export default Candidate;
