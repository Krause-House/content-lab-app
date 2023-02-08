type Media = {
  id: number;
  creator: number;
  name: string;
  contests: number[];
  date?: Date;
  length?: string;
  links: {
    url: string;
    label: string;
  }[];
};

export default Media;
