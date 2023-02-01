type Candidate = {
  id: number;
  contest_id: number;
  name: string;
  supporting_text?: string;
  media_url?: string;
  for: string[]; // emails
  against: string[]; // emails
  is_winner?: boolean;
};

// omit id and contest_id for new candidates
export type NewCandidate = Omit<Candidate, "id" | "contest_id">;

export default Candidate;
