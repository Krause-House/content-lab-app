type Candidate = {
  id: number;
  contest_id: number;
  name: string;
  supporting_text: string;
  imageUrl: string;
  for: string[]; // emails
  against: string[]; // emails
};

export default Candidate;
