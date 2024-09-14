export interface DiaryResponseProps {
  data: DiaryProps[];
  status: Status;
}

export interface DiaryProps {
  account_id: number;
  content: string;
  created_at: string;
  deleted_at: null;
  diary_id: number;
  email: string;
  mood_status_id: MoodStatusID;
  share: boolean;
  updated_at: string;
  value: string;
}

export interface MoodStatusID {
  mood_category_id: MoodCategoryID;
  status_id: number;
  value: string;
}

export interface MoodCategoryID {
  mood_category_id: number;
  name: string;
}

export interface Status {
  code: number;
  message: string;
}
