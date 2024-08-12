import * as Yup from "yup";
import { ErrorMessage, Field, Form, useFormik } from "formik";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/providers/AppContext";
import { useRouter } from "next/router";

const SignUp = () => {
  const router = useRouter();
  // const [loginError, setLoginError] = useState('');
  // const { auth, setAuth } = useContext(AppContext);

  const dummyUser = {
    email: "testuser@example.com",
    role_id: "2",
    password: "TestPassword1!",
    confirmPassword: "TestPassword1!",
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      role_id: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Required")
        .min(12, "Email must be at least 12 characters")
        .max(50, "Email must be at most 50 characters")
        .matches(/@/, 'Email must contain "@"')
        .matches(/\./, 'Email must contain "."'),
      role_id: Yup.string()
        .oneOf(["1", "2", "3"], "Invalid Role")
        .required("Required"),
      password: Yup.string()
        .required("Required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[\W_]/,"Password must contain at least one special character"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), ""], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      console.log("Form Values:", values);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Dummy User:", dummyUser);

        if (
          values.email === dummyUser.email &&
          values.password === dummyUser.password &&
          values.role_id === dummyUser.role_id &&
          values.password === values.confirmPassword
        ) {
          alert("Login successful!");
          router.push("/profile"); // Redirect to a different page, e.g., dashboard
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
              Sign Up
            </h1>
          </div>
          <div className="m-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Form>
              <div>
                <label htmlFor="email">Email</label>
                <Field name="email" type="email" />
                <ErrorMessage name="email" component="div" />
              </div>

              <div>
                <label htmlFor="role_id">Role</label>
                <Field as="select" name="role_id">
                  <option value="">Select your role</option>
                  <option value="1">Admin</option>
                  <option value="2">User</option>
                  <option value="3">Counselor</option>
                </Field>
                <ErrorMessage name="role_id" component="div" />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <Field name="password" type="password" />
                <ErrorMessage name="password" component="div" />
              </div>

              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field name="confirmPassword" type="password" />
                <ErrorMessage name="confirmPassword" component="div" />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-[#22543D] shadow-sm hover:bg-[#A0C9B6]"
                >
                  Sign up
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
