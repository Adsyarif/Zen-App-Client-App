export interface UserDetailPostPublicResponseProps {
  data: UserDetailPostPublicProps[];
  status: Status;
}

export interface UserDetailPostPublicProps {
  account_id: number;
  content: string;
  created_at: string;
  deleted_at: null;
  post_id: number;
  user_id: number;
  user_name: string;
}

export interface Status {
  code: number;
  message: string;
}
