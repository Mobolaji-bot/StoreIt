/**
 * Renders the sign-up page, which includes an `AuthForm` component for handling user sign-up.
 */
import AuthForm from "@/components/AuthForm";

const SignUp = () => {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Welcome!</h1>
      <AuthForm type="sign-up" />
    </div>
  );
};

export default SignUp;
