export type PreSignedResponse = {
  path: string;
  url: string;
};

export type Post = {
  content: string;
  cover_image: string;
  id: string;
  read_time_millis: number;
  slug: string;
  summary: string;
  tags: string[];
  title: string;
  updated_at: number;
};

export type User = {
  avatar: string;
  email: string;
  id: string;
  name: string;
};
