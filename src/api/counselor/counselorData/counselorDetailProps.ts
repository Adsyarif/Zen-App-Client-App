export interface CounselorDetailResponse {
  data: CounselorDetailProps;
  status: Status;
}

export interface CounselorDetailProps {
  account: Account;
  counselor_details: CounselorDetail[];
}

export interface Account {
  email: string;
}

export interface CounselorDetail {
  account_id: number;
  alumnus: string[];
  certification: string;
  counselor_id: number;
  first_name: string;
  gender_id: number;
  gender_name: string;
  last_name: string;
  phone_number: string;
  practice_license_status: string;
  practice_location: string;
  price: string;
  title: string;
  user_name: string;
  year_of_experience: number;
}

export interface Status {
  code: number;
  message: string;
}
