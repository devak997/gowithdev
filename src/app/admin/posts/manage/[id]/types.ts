export type PostFormData = {
  title: string;
  content: string;
  summary: string;
  tags: string[];
  category: string;
  slug: string;
  read_time_millis: number;
  cover_image?: string;
};
