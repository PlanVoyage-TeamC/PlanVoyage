"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import AuthCard from "./AuthCard";

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();

  const resetForm = () => {
    setForm({ name: "", email: "", password: "", confirmPassword: "" });
    setErrors({});
    setSubmitError("");
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };
  const validate = () => {
    const newErrors = {};
    const { name, email, password, confirmPassword } = form;
  
    const requiredFields = isSignUp
      ? [name, email, password, confirmPassword]
      : [email, password];
  
    const allFilled = requiredFields.every((field) => field.trim() !== "");
  
    if (!allFilled) {
      setSubmitError("Please fill in all the fields");
      return false;
    }
    if (password.length < 8) {
      newErrors.password = "Minimum 8 characters required";
    }
    if (isSignUp && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;

  };
  
  const handleSubmit = async () => {
    setSubmitError("");

    if (!validate()) return;

    const { name, email, password, confirmPassword } = form;
    try {
      const endpoint = isSignUp ? "signup" : "login";
      const payload = isSignUp ? { name, email, password, confirmPassword } : { email, password };

      const res = await axios.post(`http://localhost:5000/api/${endpoint}`, payload);
      localStorage.setItem("token", res.data.token);
      if(res.status == 200 || res.status == 201)
        localStorage.setItem("email", email);
      router.push(isSignUp ? "/preferences" : "/destinations");
    } catch (err) {
      setSubmitError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <AuthCard
      isSignUp={isSignUp}
      form={form}
      errors={errors}
      error={submitError}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onToggle={() => {
        setIsSignUp(!isSignUp);
        resetForm();
      }}
    />
  );
}
