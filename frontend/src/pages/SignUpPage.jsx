import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return <div className="min-h-screen grid place-items-center">
    <div className="flex flex-col ">

    </div>
  </div>;
}

export default SignUpPage;
