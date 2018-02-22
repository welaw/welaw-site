export class User {
  uid: string;
  username: string;
  full_name: string;
  full_name_private: boolean;
  email: string;
  email_private: boolean;
  image_url: string;
  id: string;
  name: string;
  token: string;
  picture_url: string;
  is_admin: boolean;
  upstream: string;
  roles: string[];
  biography: string;
  law_count: number;
  vote_count: number;
  has_password: boolean;
  last_login: string;
  provider: string;
}

export class UserProfile {
  votes: Vote[];
  contributions: Contribution[];
}

export class Vote {
  value: boolean;
  date: string;
}

export class Contribution {
  first: boolean;
  date: string;
}
