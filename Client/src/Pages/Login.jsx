import React, { useState } from 'react';
import LoginSlider from '../Components/LoginSlider';

const registeredEmails = ["user@example.com", "test@example.com"];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !email.includes("@") || !email.includes(".")) {
      setMessage("Please enter a valid email.");
      return;
    }

    if (registeredEmails.includes(email)) {
      setMessage("Login successful!");
      console.log("Login successful for:", email);
    } else {
      setMessage("Email not registered.");
      console.log("Login failed: Email not registered.");
    }

    setEmail("");
    setPassword("");
  };


  return (
    <div className="flex h-screen items-center justify-center bg-[#8667F2] px-10">
    <div className="flex bg-white rounded-2xl shadow-lg p-8 gap-x-5 w-full max-w-4xl flex-col md:flex-row">
    <div className="hidden md:flex items-center justify-center w-1/2">
      <LoginSlider />
    </div>
    <div className="flex flex-col items-center justify-center h-[450px] w-9/10 bg-gray-100 rounded-2xl md:w-1/2">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Mock Ninja</h1>
      <div className="grid grid-cols-2 gap-3 items-center mb-6 max-w-80">

        <button className="flex flex-row bg-[#8667F2] text-white px-6 py-2 rounded-md hover:bg-[#b29ae0] transition duration-300 w-full">
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > 
        <rect x="1.8335" y="1.83301" width="18.3333" height="18.3333" rx="2" fill="#0476BC"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.60542 6.54678C8.60542 7.11745 8.1709 7.57928 7.4914 7.57928C6.83836 7.57928 6.40385 7.11745 6.4173 6.54678C6.40385 5.94838 6.83835 5.5 7.50441 5.5C8.17089 5.5 8.59239 5.94838 8.60542 6.54678ZM6.47193 15.0421V8.39493H8.53776V15.0416H6.47193V15.0421Z" fill="white"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1933 10.5157C10.1933 9.68663 10.166 8.97981 10.1387 8.39527H11.933L12.0284 9.3059H12.0692C12.3411 8.88442 13.0206 8.24609 14.1216 8.24609C15.4806 8.24609 16.5001 9.14328 16.5001 11.0998V15.0424H14.4342V11.3587C14.4342 10.5019 14.1354 9.91775 13.3879 9.91775C12.8168 9.91775 12.4772 10.3119 12.3415 10.6922C12.2869 10.8284 12.26 11.0183 12.26 11.2091V15.0424H10.1941V10.5157H10.1933Z" fill="white"/>
        </svg>
        Log in with LinkedIn
        </button>

        <button className="flex flex-row bg-[#8667F2] text-white px-6 py-2 rounded-md hover:bg-[#b29ae0] transition duration-300 w-full"> 
        <svg width="40" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.8089 9.2025C17.8089 8.61 17.7564 8.0475 17.6664 7.5H9.19141V10.8825H14.0439C13.8264 11.9925 13.1889 12.93 12.2439 13.5675V15.8175H15.1389C16.8339 14.25 17.8089 11.94 17.8089 9.2025Z" fill="#4285F4"/>
<path d="M9.19119 18.0003C11.6212 18.0003 13.6537 17.1903 15.1387 15.8178L12.2437 13.5678C11.4337 14.1078 10.4062 14.4378 9.19119 14.4378C6.84369 14.4378 4.85619 12.8553 4.14369 10.7178H1.15869V13.0353C2.63619 15.9753 5.67369 18.0003 9.19119 18.0003Z" fill="#34A853"/>
<path d="M4.14391 10.7173C3.95641 10.1773 3.85891 9.59984 3.85891 8.99984C3.85891 8.39984 3.96391 7.82234 4.14391 7.28234V4.96484H1.15891C0.543905 6.17984 0.191406 7.54484 0.191406 8.99984C0.191406 10.4548 0.543905 11.8198 1.15891 13.0348L4.14391 10.7173Z" fill="#FBBC05"/>
<path d="M9.19119 3.5625C10.5187 3.5625 11.7037 4.02 12.6412 4.9125L15.2062 2.3475C13.6537 0.892501 11.6212 0 9.19119 0C5.67369 0 2.63619 2.025 1.15869 4.965L4.14369 7.2825C4.85619 5.145 6.84369 3.5625 9.19119 3.5625Z" fill="#EA4335"/>
</svg>
        login with google
        </button>
      </div>
      <form onSubmit={handleSubmit} className="w-80">
        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        <button
          type="submit"
          className="w-full bg-[#8667F2] text-white px-4 py-2 rounded-md hover:bg-[#b29ae0] transition duration-300"
        > Submit
        </button>
      </form>
      <a href="/forgot-password" className="mt-4 text-blue-600 hover:underline">
        Forgot password?
      </a>
      <p className="mt-4 text-gray-600">
        Don’t have an account?{' '}
        <a href="/signup" className="text-blue-600 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  </div>
</div>
  );
};

export default Login