import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { auth } from "../../utils/firebase-config"
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import Lottie from "lottie-react";
import loadAnimation from "../../lottie/load3.json"

function Login({ handleClick }) {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });



  const onSubmit = (values, props) => {
    setTimeout(() => {
      createUserWithEmailAndPassword(auth, values.email, values.password)
      props.resetForm();
      props.setSubmitting(false);
    }, 3000);
  };
  

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form className="flex flex-col">
              <label
                htmlFor="email"
                className="font-press-start text-xs text-blue mb-2"
              >
                Email
              </label>
              <Field
                className="mb-4 p-4 font-press-start text-xs"
                type="text"
                name="email"
                id="email"
              />
              <label
                htmlFor="password"
                className="font-press-start text-xs text-blue mb-2"
              >
                Password
              </label>
              <Field
                className="mb-8 p-4 font-press-start text-xs"
                type="password"
                name="password"
                id="password"
              />

              <button
                className="bg-green p-4 font-press-start text-white hover:text-opacity-75"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? (
                  <Lottie
                    className="h-6"
                    animationData={loadAnimation}
                    autoplay={true}
                    loop={true}
                  />
                ) : (
                  "Sign Up"
                )}
              </button>
            </Form>
          );
        }}
      </Formik>
      <button className="text-blue text-xs w-full font-press-start underline underline-offset-1 cursor-pointer mt-12" onClick={handleClick}>Back To Login</button>
    </div>
  );
}

export default Login;
