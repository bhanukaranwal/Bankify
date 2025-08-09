import { getProviders, signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn({ providers }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpMode, setOtpMode] = useState(false);

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });
  };

  const handleEmailOTPLogin = async (e) => {
    e.preventDefault();
    await signIn("email", { email, callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6">
          {otpMode ? "Sign in with Email OTP" : "Sign in with Credentials"}
        </h1>

        {!otpMode ? (
          <form onSubmit={handleCredentialsLogin}>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="bg-blue-600 text-white w-full py-3 rounded"
            >
              Sign In
            </button>
          </form>
        ) : (
          <form onSubmit={handleEmailOTPLogin}>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              type="submit"
              className="bg-green-600 text-white w-full py-3 rounded"
            >
              Get Login Link
            </button>
          </form>
        )}

        <p
          onClick={() => setOtpMode(!otpMode)}
          className="mt-4 text-center text-blue-500 cursor-pointer"
        >
          {otpMode
            ? "Use Email & Password instead"
            : "Use OTP Email Login Instead"}
        </p>
      </div>
    </div>
  );
}

SignIn.getInitialProps = async () => {
  const providers = await getProviders();
  return { providers };
};
