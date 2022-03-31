import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { auth } from "../../utils/firebase-config";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Lottie from "lottie-react";
import loadAnimation from "../../lottie/load3.json";

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
      signInWithEmailAndPassword(auth, values.email, values.password)
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
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
                  "Login"
                )}
              </button>
            </Form>
          );
        }}
      </Formik>
      <div className="flex flex-row justify-between items-center mt-8 mb-8">
        <div className="w-1/2 h-1 bg-black opacity-25" />
        <h1 className="font-press-start p-4">OR</h1>
        <div className="w-1/2 h-1 bg-black opacity-25" />
      </div>
      <button
        className="bg-googleRed p-4 font-press-start text-white hover:text-opacity-75 w-full"
        onClick={signInWithGoogle}
      >
        Sign In With Google
      </button>
      <div className="flex flex-row justify-center font-press-start text-xs mt-8">
        <h1>
          Don't have an account?
          <span
            onClick={handleClick}
            className="text-blue ml-2 underline underline-offset-1 cursor-pointer"
            href="signup"
          >
            Sign Up
          </span>
        </h1>
      </div>
    </div>
  );
}

export default Login;
