type Creator = {
  id: number;
  creator_email?: string;
  name: string;
  bio?: string;
  sign_up_image_url?: string;
  banner_image_url?: string;
  metadata_image_url?: string;
  homepage_image_url?: string;
  page_url?: string;
  is_visible: boolean;
  watch_url?: string;
  listen_url?: string;
  read_url?: string;
};

export default Creator;
