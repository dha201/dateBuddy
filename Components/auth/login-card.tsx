import { LoginButton } from "./login-button";

export const LoginCard = () => {
  return (
    <div className="max-w-md w-full space-y-8 p-10 rounded-md shadow-lg bg-gradient-to-br from-purple-952 to-black-">
      <div>
        <h2 className="text-center text-3xl font-extrabold text-white">Sign in to your account</h2>
      </div>
      <div className="flex items-center justify-center space-x-4">
        <LoginButton provider="google" />
        <LoginButton provider="github" />
      </div>
    </div>
  );
};
