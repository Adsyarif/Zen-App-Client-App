// import { useFormik } from "formik";


const SignIn = () => {

  // const formik = useFormik({
  //   initialValues: {
  //     email: "",
  //     password: ""
  //   }
  // })

  return (
    <div className="m-10 h-full">
      <div className="flex flex-row">
        <div className="flex flex-col w-1/2 m-10">
          <h1 className="text-4xl w-1/2 font-bold text-[#22543D] mb-8">
            Welcome To Zen Zone
          </h1>
          <p className="font-medium text-[#22543D] mb-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            odit iusto quae aut nemo delectus possimus debitis, reiciendis
            dignissimos obcaecati minus excepturi? Suscipit facilis natus nihil,
            amet fugiat itaque distinctio!
          </p>
          <div></div>
        </div>
        <div className="m-10 bg-[#22543D] flex-col w-1/2 rounded-md">
          <div>
            <h1 className="mt-10 text-center text-2xl font-bold text-white">
              Sign In
            </h1>
          </div>
          <div className="m-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="">
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  e-mail
                </label>
                <div className="mt-2 mb-2">
                  <input
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="email"
                    type="email"
                  />
                </div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  password
                </label>
                <div className="mt-2 mb-2">
                  <input
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="password"
                    type="password"
                  />
                </div>
                <div className="text-white text-end">
                  <p>
                    Forgot Password
                  </p>
                </div>
              </div>
              <div className="mt-5 mb-5">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-[#22543D] shadow-sm hover:bg-[#A0C9B6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
