import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { publicAxios } from "../api";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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
      return publicAxios.post("/auth/register", data);
    },
    onSuccess: () => {
      toast.success("Successfully registered");
      navigate("/signin");
    },
    onError: (err) => {
      console.log("error while registering", err);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <section className="w-full flex items-center justify-center my-20  text-black rounded-md">
      <form className="flex flex-col w-11/12 sm:w-1/3 space-y-4 shadow-md p-6" onSubmit={handleSubmit}>
      <div className="image w-full h-2  flex justify-center items-center p-8 m-4  ">
      <img className="" src="smartLogo.png" alt="" />
      </div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="border bg-transparent py-2 rounded-md px-2"
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="border bg-transparent py-2 rounded-md px-2"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          className="border bg-transparent py-2 rounded-md px-2"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
        />

        {error && <p className="text-red-500 ml-auto">{error.response.data.message}</p>}

        <button disabled={isLoading} type="submit" className="px-2 py-2 bg-purple-500 hover:bg-purple-700 rounded-md">
          Signup
        </button>

        <div className="">
          <p>
            Already have an account?
            <Link to="/signin">
              <span className="ml-1 text-blue-500 underline">Signin</span>
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Signup;
