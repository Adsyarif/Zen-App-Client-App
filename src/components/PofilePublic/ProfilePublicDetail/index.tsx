import { useGetUserDetailPublic } from "@/api/users/userDetailPublic/useGetUserDetailPublic";
import Custom404Component from "@/components/Custom404Component";
import Image from "next/image";

export interface DataPairProps {
  label: string;
  data: string | undefined;
}

export const DataPair = (props: DataPairProps) => {
  const { label, data } = props;

  return (
    <div className="bg-lightGreen text-white rounded-md p-1 px-5 my-2 flex w-full justify-between gap-3">
      <div className="flex items-start justify-start w-2/5">
        <p>{label}</p>
      </div>
      <div className="flex justify-start items-start w-3/5">
        <p>{data}</p>
      </div>
    </div>
  );
};

export function ProfilePublicDetail() {
  const { user, isLoading, isError } = useGetUserDetailPublic();

  if (!user) {
    return (
      <>
        <Custom404Component message="User Not Found" />
      </>
    );
  }

  if (isError) {
    return <Custom404Component message="Error fetching data" />;
  }

  if (isLoading) {
    return <Custom404Component message="Loading ..." />;
  }

  const userImgSrc =
    user.gender_name == "female"
      ? "/user-image-public-female.png"
      : "/user-image-public-male.png";

  return (
    <>
      <div className="bg-darkGreen h-full lg:w-full rounded-md pb-5 lg:p-10 flex flex-col">
        <h3 className="md:text-2xl rounded-t-md text-center p-2 px-6 text-white font-medium">
          {user.user_name} profile
        </h3>
        <div className="rounded-full size-20 mb-5 bg-lightGreen block self-center items-center border-4 border-lightGreen">
          <Image
            src={userImgSrc}
            alt="profile image"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>

        <div className="grid place-self-center">
          <DataPair label={"First Name"} data={user.first_name} />
          <DataPair label={"Last Name"} data={user.last_name} />
          <DataPair label={"Username"} data={user.user_name} />
          <DataPair label={"User Email"} data={user.email} />
          <DataPair label={"Phone Number"} data={user.phone_number} />
          <DataPair label={"Gender"} data={user.gender_name} />
        </div>

        {/* add friend button  */}

        {/* <div className="flex flex-row justify-end gap-3 text-slate-50 mt-3">
          <button className="bg-teal-600 rounded-xl p-1 px-5">Add </button>
        </div> */}
      </div>
    </>
  );
}
