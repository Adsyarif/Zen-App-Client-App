export interface CounselorScheduleResponseProps {
  data: CounselorScheduleProps[];
  status: StatusClass;
}

export interface CounselorScheduleProps {
  available_from: Date;
  available_to: Date;
  booked_by_account_id: number | null;
  counselor_detail: CounselorDetail;
  counselor_id: number;
  created_at: string;
  deleted_at: null;
  schedule_id: number;
  status: StatusEnum | null;
  updated_at: string;
}

export interface CounselorDetail {
  account_id: number;
  alumnus: Alumnus[];
  certification: string;
  counselor_id: number;
  first_name: FirstName;
  gender_id: number;
  gender_name: GenderName;
  last_name: LastName;
  phone_number: string;
  practice_license_status: PracticeLicenseStatus;
  practice_location: PracticeLocation;
  price: string;
  title: Title;
  user_name: UserName;
  year_of_experience: number;
}

export enum Alumnus {
  UniA2020 = "Uni A 2020",
  UniB2024 = "Uni B 2024",
  UniversitasBinaDarma2015 = "Universitas Bina Darma , 2015",
  UniversitasIndonesia2016 = "Universitas Indonesia 2016",
  UniversitasIndonesia2020 = "Universitas Indonesia 2020",
  UniversitasIndonesia2024 = "Universitas Indonesia 2024",
  UniversitasPersadaIndonesiaYAI2019 = "Universitas Persada Indonesia Y.A.I, 2019",
}

export enum FirstName {
  Adam = "Adam",
  Angelina = "Angelina",
  CounsID3_MeirthMH = "couns_id_3_MeirthMH",
}

export enum GenderName {
  Female = "female",
  Male = "male",
}

export enum LastName {
  Cooper = "cooper",
  CounsID3_MeirthMH = "couns_id_3_MeirthMH",
  Iskandar = "Iskandar",
}

export enum PracticeLicenseStatus {
  SIPP2501HjjjkyLkm122345 = "SIPP: 2501hjjjky-lkm122345",
}

export enum PracticeLocation {
  JakartaIndonesia = "Jakarta, Indonesia",
  JlSidomunculRumahSakitSidomunculDesaTolakKabSepakat = "Jl. Sidomuncul, Rumah Sakit Sidomuncul Desa Tolak  Kab.Sepakat",
}

export enum Title {
  Psikolog = "psikolog",
  Psikologis = "Psikologis ",
  TitlePsikologis = "Psikologis",
}

export enum UserName {
  AdamIs = "adam_is",
  AngelCooper = "Angel_cooper",
  CounsID3_MeirthMH = "couns_id_3_MeirthMH",
}

export enum StatusEnum {
  Done = "DONE",
  Upcoming = "UPCOMING",
}

export interface StatusClass {
  code: number;
  message: string;
}
