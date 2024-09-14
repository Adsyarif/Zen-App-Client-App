export interface UserDetailPublicProps {
  data: UserDetailProps;
  status: Status;
}

export interface UserDetailProps {
  account: Account;
  user_details: UserDetail[];
}

export interface Account {
  email: string;
}

export interface UserDetail {
  first_name: string;
  gender_name: string;
  last_name: string;
  phone_number: string;
  profile_image: null;
  user_name: string;
}

export interface Status {
  code: number;
  message: string;
}
