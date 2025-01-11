"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";

import { auth } from "@/firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setUserInfo } from "@/redux/slice";
import { RootState } from "@/redux/store";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
        <div className="w-full max-w-screen-sm mx-auto shadow-xl p-8 bg-white rounded-md">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">You are already logged in</h2>
            <p className="text-lg">
              You are already signed in. Go to the home page to start
              interacting with the app.
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={() => router.push("/")}
              className="w-full py-3 text-lg bg-[#141624] text-white rounded-md"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const signInWithGoogle = async (): Promise<void> => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setLoading(false);
      console.log("User signed in with Google:", user);

      const userName = user.displayName || name;

      dispatch(
        setUserInfo({
          id: user.uid,
          email: user.email,
          displayName: userName,
          photoURL: user.photoURL || "",
        })
      );

      router.push("/");
    } catch (error: any) {
      setLoading(false);
      setError("Error signing in with Google");
    }
  };

  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasError = false;

    if (!hasError) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          if (auth.currentUser) {
            updateProfile(auth.currentUser, {
              displayName: name,
            })
              .then(() => {
                console.log("Profile updated successfully");
              })
              .catch((error) => {
                console.error("Error updating profile: ", error);
                setLoading(false);
              });
          }

          console.log(user);

          setEmail("");
          setPassword("");
          setConfirmPassword("");

          setTimeout(() => {
            router.push("/signin");
          }, 3000);
        })
        .catch((error) => {
          const errorCode = error.code;
          setLoading(false);
          if (errorCode.includes("auth/email-already-in-use")) {
            setError("Email already in use. Try another one");
          }
        });
    }
  };

  return (
    <div className="flex  py-10 items-center justify-center mt-16 sm:mt-2 px-2 sm:px-5 md:px-12">
      <div className="w-full max-w-screen-sm mx-auto shadow-xl p-8 bg-white rounded-md">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Sign Up</h2>
          <p className="text-lg">
            Create an account by entering your name, email, and password or
            continue with Google.
          </p>
        </div>
        <form onSubmit={handleRegistration} className="space-y-6 mt-6">
          <div className="space-y-3">
            <label htmlFor="name" className="text-lg">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full py-3 px-4 text-lg border border-gray-300 rounded-md"
            />
          </div>
          <div className="space-y-3">
            <label htmlFor="email" className="text-lg">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full py-3 px-4 text-lg border border-gray-300 rounded-md"
            />
          </div>
          <div className="space-y-3">
            <label htmlFor="password" className="text-lg">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              placeholder="*********"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full py-3 px-4 text-lg border border-gray-300 rounded-md"
            />
          </div>
          <div className="space-y-3">
            <label htmlFor="confirmPassword" className="text-lg">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              placeholder="*********"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full py-3 px-4 text-lg border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-lg bg-[#141624] text-white rounded-md"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <button
            onClick={signInWithGoogle}
            className="w-full py-3 text-lg flex items-center justify-center gap-3 border border-gray-300 rounded-md"
            disabled={loading}
          >
            <FcGoogle size={28} />
            Google
          </button>
        </div>
      </div>
    </div>
  );
}
