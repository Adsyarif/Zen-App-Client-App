import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useRouter } from "next/router";
import { API_BASE } from "@/lib/projectApi";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/providers/AppContext";
import { GoCommentDiscussion } from "react-icons/go";
import { IoPeopleCircleSharp } from "react-icons/io5";
import { FaBookOpen } from "react-icons/fa";
import { BsNewspaper } from "react-icons/bs";

const SignUp = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      role_id: 1,
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("invalid email address")
        .required("required*")
        .min(12, "email must be at least 12 characters")
        .max(50, "email must be at most 50 characters")
        .matches(/@/, 'email must contain "@"')
        .matches(/\./, 'email must contain "."'),
      role_id: Yup.string()
        .oneOf(["1", "2", "3"], "Invalid Role")
        .required("required*"),
      password: Yup.string()
        .required("required*")
        .min(8, "password must be at least 8 characters")
        .matches(/[A-Z]/, "password must contain at least one uppercase letter")
        .matches(/[a-z]/, "password must contain at least one lowercase letter")
        .matches(/[0-9]/, "password must contain at least one number")
        .matches(
          /[\W_]/,
          "password must contain at least one special character"
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), ""], "passwords must match")
        .required("required*"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      console.log("Form Values:", values);
      try {
        const response = await axios.post(`${API_BASE}/account/sigunp`, {
          email: values.email,
          role_id: values.role_id,
          password: values.password,
          confirmPassword: values.confirmPassword,
        });
        console.log(response.data);
        router.push("/Auth/SignIn");
      } catch (error) {
        console.error("signup failed:", error);
        setErrors({ password: "Invalid email or password" });
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="m-10 h-full">
      <div className="flex flex-row">
        <div className="flex flex-col w-1/2 m-10">
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
            <p className="bg-[#22543D] text-white"><GoCommentDiscussion/></p>
            <p className="bg-[#22543D] text-white"><IoPeopleCircleSharp /></p>
            <p className="bg-[#22543D] text-white"><FaBookOpen /></p>
            <p className="bg-[#22543D] text-white"><BsNewspaper /></p>
          </div>
        </div>
        <div className="m-10 bg-[#22543D] flex-col w-1/2 rounded-md">
          <div className="m-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="text-center text-2xl font-bold text-white">
              Sign Up
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="block font-medium leading-6 text-white"
                >
                  e-mail
                </label>
                <div className="mt-1">
                  <input
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-[#22543D] placeholder:text-gray-400"
                    id="email"
                    type="email"
                    {...formik.getFieldProps("email")}
                  />
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-amber-300 text-sm">
                    {formik.errors.email}
                  </div>
                ) : null}

                <label
                  htmlFor="role_id"
                  className="mt-5 block text-sm font-medium leading-6 text-white"
                >
                  role:
                </label>
                <div className="mt-1">
                  <select
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-[#22543D] placeholder:text-gray-400"
                    id="role_id"
                    {...formik.getFieldProps("role_id")}
                  >
                    <option value="1">Admin</option>
                    <option value="2">User</option>
                    <option value="3">Counselor</option>
                  </select>
                  {formik.touched.role_id && formik.errors.role_id ? (
                    <div className="text-amber-300 text-sm">
                      {formik.errors.role_id}
                    </div>
                  ) : null}
                </div>

                <label
                  htmlFor="password"
                  className="mt-5 block text-sm font-medium leading-6 text-white"
                >
                  password
                </label>
                <div className="mt-1">
                  <input
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-[#22543D] placeholder:text-gray-400"
                    id="password"
                    type="password"
                    {...formik.getFieldProps("password")}
                  />
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-amber-300 text-sm">
                    {formik.errors.password}
                  </div>
                ) : null}

                <label
                  htmlFor="confirmPassword"
                  className="mt-5 block text-sm font-medium leading-6 text-white"
                >
                  Confirm password
                </label>
                <div className="mt-1">
                  <input
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-[#22543D] placeholder:text-gray-400"
                    id="confirmPassword"
                    type="password"
                    {...formik.getFieldProps("confirmPassword")}
                  />
                </div>
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="text-amber-300 text-sm">
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
              </div>

              <div className="mt-10">
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-[#22543D] shadow-sm hover:bg-[#A0C9B6]"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
