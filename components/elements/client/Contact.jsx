"use client";

import { useState } from "react";
import Button from "../Button";

export function Contact(props) {
 const [formData, setFormData] = useState({
  email: "",
  name: "",
  message: "",
 });

 const [success, setSuccess] = useState("");
 const [error, setError] = useState("");
 const [loading, setLoading] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setSuccess("");
  setError("");
  setLoading(true);

  const { email, name, message } = formData;

  if (!email) {
   setSuccess("");
   setLoading(false);
   return setError("Please enter your email address!");
  } else if (!email.includes("@") || !email.includes(".")) {
   setSuccess("");
   setLoading(false);
   return setError("Please enter a valid email address!");
  } else if (email.trim().length < 5 || email.trim().length > 50) {
   setSuccess("");
   setLoading(false);
   return setError("Email address must be between 5 and 50 characters!");
  } else if (!name) {
   setSuccess("");
   setLoading(false);
   return setError("Please enter your name!");
  } else if (!name.trim() || name.trim().length < 3 || name.trim().length > 20) {
   setSuccess("");
   setLoading(false);
   return setError("Name must be between 3 and 20 characters!");
  } else if (!message) {
   setSuccess("");
   setLoading(false);
   return setError("Please enter a message!");
  } else if (!message.trim() || message.trim().length < 10 || message.trim().length > 500) {
   setSuccess("");
   setLoading(false);
   return setError("Message must be between 10 and 500 characters!");
  }

  const data = { email, name, subject: "Portfolio Contact Form", message };
  
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (result.error) {
      setError(result.error);
    } else {
      setFormData({ email: "", name: "", message: "" });
      setSuccess(result.message);
    }
  } catch (err) {
    console.error("Contact form error:", err);
    setError("Failed to send message. Please try again.");
  } finally {
    setLoading(false);
  }
 };

 const handleChange = (e) => {
  console.log(e.target.name);
  setFormData({
   ...formData,
   [e.target.name]: e.target.value,
  });
 };

 return (
  <form {...props} onSubmit={handleSubmit} className="relative flex w-full flex-col items-center justify-center">
   <div className="z-[2] block w-full items-center justify-center gap-1.5 text-left md:flex">
    <label htmlFor="contact_name" className="w-full text-left text-sm font-semibold tracking-wide text-gray-600 dark:text-gray-400">
     Name
     <span aria-hidden={true} className="cursor-help text-red-500" title="Required">
      *
     </span>
     <input value={formData.name} name="name" onChange={handleChange} id="contact_name" className="my-2 w-full rounded-lg border-[1px] border-gray-300 p-2 font-normal text-zinc-800 outline-0 duration-200 focus:border-blue-700 dark:border-neutral-800 dark:bg-transparent dark:text-white focus:dark:border-blue-500" type="text" placeholder="John Doe" />
    </label>
    <label htmlFor="contact_email" className="w-full text-left text-sm font-semibold tracking-wide text-gray-600 dark:text-gray-400">
     Email
     <span aria-hidden={true} className="cursor-help text-red-500" title="Required">
      *
     </span>
     <input value={formData.email} name="email" onChange={handleChange} id="contact_email" className="my-2 w-full rounded-lg border-[1px] border-gray-300 p-2 font-normal text-zinc-800 outline-0 duration-200 focus:border-blue-700 dark:border-neutral-800 dark:bg-transparent dark:text-white  focus:dark:border-blue-500" type="email" placeholder="john@doe.com" />
    </label>
   </div>
   <div className="mt-2 flex w-full items-center justify-center gap-1.5">
    <label htmlFor="contact_message" className="w-full text-left text-sm font-semibold tracking-wide text-gray-600 dark:text-gray-400">
     Message
     <span aria-hidden={true} className="cursor-help text-red-500" title="Required">
      *
     </span>
     <textarea value={formData.message} name="message" onChange={handleChange} id="contact_message" className="my-2 max-h-40 min-h-[80px] w-full rounded-lg border-[1px] border-gray-300 p-2 font-normal text-zinc-800 outline-0 duration-200 focus:border-blue-700 dark:border-neutral-800 dark:bg-transparent dark:text-white focus:dark:border-blue-500" type="email" placeholder="Hello there!" />
    </label>
   </div>
   {success ? <p className="self-start text-sm font-semibold tracking-wide text-green-500 ">{success}</p> : <></>}
   {error ? <p className="self-start text-sm font-semibold tracking-wide text-red-500 ">{error}</p> : <></>}
   <div className="w-full py-2">
    <Button type="submit" className="ml-auto" disabled={loading}>
     {loading ? "Sending..." : "Send"}
    </Button>
   </div>
  </form>
 );
}
