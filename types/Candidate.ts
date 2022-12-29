type Candidate = {
  id: number;
  contest_id: number;
  name: string;
  supporting_text: string;
  imageUrl: string;
  for: string[]; // emails
  against: string[]; // emails
  is_winner?: boolean;
};

export default Candidate;
