/**
 * Renders the sign-in page component.
 *
 * This component renders the `AuthForm` component with the `type` prop set to `"sign-in"`. The page displays a heading and the authentication form.
 *
 * @returns {JSX.Element} The sign-in page component.
 */
import AuthForm from "@/components/AuthForm";

const SignIn = () => {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Hello!</h1>
      <AuthForm type="sign-in" />
    </div>
  );
};

export default SignIn; 
