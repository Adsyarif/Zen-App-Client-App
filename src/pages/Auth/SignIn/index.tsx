import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { AppContext } from "@/providers/AppContext";
import { useRouter } from "next/router";
import { API_BASE } from "@/lib/projectApi";
import { useContext, useEffect, useState } from "react";

const SignIn = () => {
  const router = useRouter();
  const { setCurrentUser } = useContext(AppContext);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Required")
        .min(12, "Email must be at least 12 characters")
        .max(50, "Email must be at most 50 characters")
        .matches(/@/, 'Email must contain "@"')
        .matches(/\./, 'Email must contain "."'),
      password: Yup.string()
        .required("Required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
          /[\W_]/,
          "Password must contain at least one special character"
        ),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      console.log("Form Values:", values);
      try {
        const response = await axios.post(`${API_BASE}/account/login`, {
          email: values.email,
          password: values.password,
        });
        const userData = response.data.data.account;
        const profileIncomplete = response.data.data.profile_incomplete;
        console.log("Profile incomplete status:", profileIncomplete);

        localStorage.setItem("currentUser", JSON.stringify({
          email: userData.email,
          account_id: userData.account_id,
        }));

        setCurrentUser({
          email: userData.email,
          account_id: userData.account_id,
        });

        console.log("User data after login:", userData);
        
        if (profileIncomplete === true || profileIncomplete === "true") {
          router.push("/createProfile");
        } else {
          router.push("/Forum");
        }
      } catch (error) {
        console.error("Login failed:", error);
        setErrors({ password: "Invalid email or password" });
        setError("Email atau password salah!");
      }
      setSubmitting(false);
    },
  });

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      router.push("/Forum");
    }
  }, []);

  return (
    <div className="lg:m-12 md:m-12 min-h-screen flex items-center justify-center">
      <div className="flex flex-col  lg:flex-row md:flex-row items-center">
        <div className=" flex-col w-1/2 md:m-10 hidden md:block">
          <h1 className="text-7xl font-bold text-[#22543D] mb-8">
            Welcome To Zen Zone
          </h1>
          <p className="font-medium text-[#22543D] mb-8">
            Lorem ipsum odor amet, consectetuer adipiscing elit. Scelerisque
            quam mi turpis suspendisse mus. Purus sit sodales nostra dui
            faucibus massa ultricies et at. Fermentum est hendrerit proin etiam
            urna consequat donec dui. Praesent dui consectetur faucibus
            penatibus penatibus vel pulvinar. Fames tellus natoque commodo
            blandit massa montes. Cursus neque consequat erat fringilla,
            hendrerit suspendisse eros.
          </p>
          <div>
          </div>
        </div>
        <div className="lg:m-10 md:m-10 p-4 md:w-1/3 w-full bg-[#22543D]  rounded-md  ">
          <div className="flex flex-col items-center justify-center mb-10 " >
            <div>
              <h1 className="mt-10 text-center text-2xl font-bold text-white">
                Sign In
              </h1>
            </div>
            <div className="m-10 sm:mx-auto w-full sm:max-w-sm">
              <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    e-mail
                  </label>
                  <div className="mt-2">
                    <input
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-[#22543D] placeholder:text-gray-400"
                      id="email"
                      type="email"
                      {...formik.getFieldProps("email")}
                    />
                  </div>
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-amber-300 text-sm mt-1">
                      {formik.errors.email}
                    </div>
                  ) : null}
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    password
                  </label>
                  <div className="mt-2">
                    <input
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-[#22543D] placeholder:text-gray-400"
                      id="password"
                      type="password"
                      {...formik.getFieldProps("password")}
                    />
                  </div>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-amber-300 text-sm mt-1">
                      {formik.errors.password}
                    </div>
                  ) : null}
                  <div className="text-white text-end">
                    <p>Forgot Password</p>
                  </div>
                </div>
                <div className="mt-5 mb-5">
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-[#22543D] shadow-sm hover:bg-[#A0C9B6]"
                  >
                    Sign in
                  </button>
                  {error && (
                    <p className="text-red-500 mt-2 text-center">{error}</p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
