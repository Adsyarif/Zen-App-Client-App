import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/providers/AppContext";
import { useRouter } from "next/router";

const SignIn = () => {
  const router = useRouter();
  // const [loginError, setLoginError] = useState('');
  // const { auth, setAuth } = useContext(AppContext);

  const dummyUser = {
    email: "testuser@example.com",
    password: "TestPassword1!",
  };

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
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Check credentials against the dummy user
        if (
          values.email === dummyUser.email &&
          values.password === dummyUser.password
        ) {
          alert("Login successful!");
          router.push("/dashboard"); // Redirect to a different page, e.g., dashboard
        } else {
          throw new Error("Invalid email or password.");
        }
      } catch (error) {
        setErrors({ password: "Invalid username or password" });
      }
      setSubmitting(false);
    },
  });

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
            <form onSubmit={formik.handleSubmit}>
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
                  <p>Forgot Password</p>
                </div>
              </div>
              <div className="mt-5 mb-5">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-[#22543D] shadow-sm hover:bg-[#A0C9B6]"
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
