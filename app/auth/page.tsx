"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";

export default function AuthPage() {
  const supabase = createClient();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  setLoading(true);
  setMessage("");

  if (isLogin) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    // Check whether this user already has a HOPE profile.
    const profileResponse = await fetch("/api/profile");

    if (!profileResponse.ok) {
      // Authenticated, but no profile yet.
      router.push("/profile");
      router.refresh();
      return;
    }

    const profile = await profileResponse.json();

    if (profile) {
      // Existing profile.
      router.push("/");
    } else {
      // New user without a profile.
      router.push("/profile");
    }

    router.refresh();
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    setMessage(error.message);
    setLoading(false);
    return;
  }

  // If email confirmation is disabled.
  if (data.session) {
    router.push("/profile");
    router.refresh();
    return;
  }

  // Email confirmation is enabled.
  setMessage(
    "Account created! Check your email, confirm your account, then log in."
  );

  setLoading(false);
}

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "#08080b",
        color: "white",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "32px",
          border: "1px solid #27272a",
          borderRadius: "16px",
          background: "#111114",
        }}
      >
        <h1 style={{ fontSize: "32px", marginBottom: "8px" }}>
          {isLogin ? "Log in to HOPE" : "Join HOPE"}
        </h1>

        <p style={{ color: "#a1a1aa", marginBottom: "28px" }}>
          {isLogin
            ? "Welcome back."
            : "Create your HOPE gaming account."}
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "18px" }}>
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                borderRadius: "8px",
                border: "1px solid #3f3f46",
                background: "#18181b",
                color: "white",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={6}
              autoComplete={isLogin ? "current-password" : "new-password"}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                borderRadius: "8px",
                border: "1px solid #3f3f46",
                background: "#18181b",
                color: "white",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: "8px",
              border: "none",
              background: "#a100ff",
              color: "white",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading
              ? "Please wait..."
              : isLogin
                ? "Log In"
                : "Create Account"}
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "18px",
              color: "#c4b5fd",
              lineHeight: 1.5,
            }}
          >
            {message}
          </p>
        )}

        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setMessage("");
          }}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "10px",
            background: "transparent",
            color: "#a78bfa",
            border: "none",
            cursor: "pointer",
          }}
        >
          {isLogin
            ? "Don't have an account? Join HOPE"
            : "Already have an account? Log in"}
        </button>
      </div>
    </main>
  );
}