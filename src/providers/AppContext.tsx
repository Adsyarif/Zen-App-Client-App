import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  FC,
} from "react";

export interface ReportCategory {
  report_category_id: number;
  value: string;
}

export interface GenderOption {
  gender_id: number;
  name: string;
}

export interface MoodStatus {
  status_id: number;
  value: string;
  mood_category_id: {
    mood_category_id: number;
    name: string;
  };
}

interface Review {
  content: string;
  name: string;
  date: string;
  rating: number;
}

export interface CounselorData {
  counselor_id: number;
  name: string;
  detail: string;
  specialist: string;
  maxPatient: number;
  patientNames: string[];
  reviews: Review[];
  available_time: string;
}

export interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  reportCategories: ReportCategory[];
  setReportCategories: (categories: ReportCategory[]) => void;

  genderCategories: GenderOption[];
  setgenderCategories: (categories: GenderOption[]) => void;

  moodCategories: MoodStatus[];
  setMoodCategories: (categories: MoodStatus[]) => void;

  currentCounselor: CounselorData | null;
  setCurrentCounselor: (counselor: CounselorData | null) => void;
}
export interface User {
  email: string;
  account_id?: number;
  password?: string;
}

export const AppContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => {},
  reportCategories: [],
  setReportCategories: () => {},
  genderCategories: [],
  setgenderCategories: () => {},

  moodCategories: [],
  setMoodCategories: () => {},

  currentCounselor: null,
  setCurrentCounselor: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [reportCategories, setReportCategories] = useState<ReportCategory[]>(
    []
  );
  const [genderCategories, setgenderCategories] = useState<GenderOption[]>([]);
  const [moodCategories, setMoodCategories] = useState<MoodStatus[]>([]);
  const [currentCounselor, setCurrentCounselor] =
    useState<CounselorData | null>(null);

  useEffect(() => {
    const userFromStorage = localStorage.getItem("currentUser");
    if (userFromStorage) {
      const user = JSON.parse(userFromStorage);
      setCurrentUser(user);
    }
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    reportCategories,
    setReportCategories,
    genderCategories,
    setgenderCategories,
    moodCategories,
    setMoodCategories,
    currentCounselor,
    setCurrentCounselor,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
