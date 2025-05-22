export interface ImageType {
  id: string;
  alt_description: string | null;
  likes: number;
  urls: {
    small: string;
    regular?: string;
  };
  user: {
    name: string;
    location?: string;
    social: {
      portfolio_url: string;
    };
  };
  description?: string;
  created_at: string;
  tags?: Array<{
    title: string;
  }>;
}
