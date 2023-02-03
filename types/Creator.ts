export enum POWER_UPS {
  APPLE_REVIEWS = "apple_reviews",
}
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
  power_ups: POWER_UPS[];
};

export default Creator;
