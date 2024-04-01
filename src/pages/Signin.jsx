import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { publicAxios } from "../api";
import { TokensContext } from "../hooks/useTokens";

const Signin = () => {
  const navigate = useNavigate();
  const { setTokens } = useContext(TokensContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { isLoading, error, mutate } = useMutation({
    mutationFn: (data) => {
      return publicAxios.post("/auth/login", data);
    },
    onSuccess: (data) => {
      setTokens(data.data.accessToken, data.data.refreshToken);
      navigate("/");
      toast.success("Successfully logged in");
    },
    onError: (err) => {
      console.log("error while log in", err);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <section className="flex items-center justify-center my-20 w-full bg-zinc-900 text-white">
      <form className="flex flex-col w-11/12 sm:w-1/3 space-y-4" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          disabled={isLoading}
          name="email"
          id="email"
          required
          className="border bg-transparent py-2 rounded-md px-2"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          disabled={isLoading}
          name="password"
          id="password"
          required
          className="border bg-transparent py-2 rounded-md px-2"
          value={formData.password}
          onChange={handleChange}
        />

        {error && <p className="text-red-500 ml-auto">{error.response.data.message}</p>}

        <button disabled={isLoading} type="submit" className="px-2 py-2 bg-purple-500 hover:bg-purple-700">
          Signin
        </button>

        <div className="flex items-center justify-between">
          <p>
            Don&apos;t have an account?
            <Link to="/signup">
              <span className="ml-1 text-blue-500 underline">Signup</span>
            </Link>
          </p>
          <p className="text-blue-500 cursor-pointer transition-colors hover:underline">Forgot Password</p>
        </div>
      </form>
    </section>
  );
};

export default Signin;
