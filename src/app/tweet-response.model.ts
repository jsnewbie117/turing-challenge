export interface TweetResponseModel {
  id: number;
  id_str: string;
  created_at: string;
  text: string;
  user: TweetUserModel;
}

export interface TweetUserModel {
  id: number;
  name: string;
  screen_name: string;
  url: string;
  profile_image_url: string;
}
