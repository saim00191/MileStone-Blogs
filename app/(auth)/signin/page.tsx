"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setUserInfo } from "@/redux/slice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { auth } from "@/firebase/firebase"; 

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const userInfo = useSelector(
    (state: RootState) => state.commentsSlice?.userInfo
  );

  if (userInfo) {
    return (
      <div className="flex h-screen items-center justify-center px-2 sm:px-5 md:px-12">
        <div className="w-full max-w-screen-sm mx-auto p-8 shadow-xl bg-white rounded-lg">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">You are already logged in</h2>
            <p className="text-lg mt-6">
              You are already signed in. Go to the home page to start interacting with the app.
            </p>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => router.push("/")}
              className="w-full py-3 text-lg bg-[#141624] text-white rounded-lg"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      setLoading(false);
      console.log("User signed in with email/password:", user);
      dispatch(setUserInfo({
        id: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      }));

      router.push("/"); 
    } catch (error: unknown) {
      setLoading(false);
      setError("Failed to sign in with email/password. Please check your credentials.");
      console.error("Error signing in with email/password:", error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center px-2 sm:px-5 md:px-12">
      <div className="w-full max-w-screen-sm mx-auto p-8 shadow-xl  bg-white rounded-lg">
        <div className="space-y-2">
          <h2 className="text-[33px] text-[#141624] font-extrabold">Sign in</h2>
          <p className="text-lg">
            Enter your email and password to sign in to your account.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-3">
            <label htmlFor="email" className="text-lg block">Email</label>
            <input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#141624]"
            />
          </div>
          <div className="space-y-3">
            <label htmlFor="password" className="text-lg block">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#141624]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-[22px] bg-[#141624]  text-white rounded-lg "
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        {error && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )}
      </div>
    </div>
  );
}
