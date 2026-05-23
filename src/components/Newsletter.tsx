import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Newsletter: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  
  // Track loading state so users don't click twice while sending
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { firstName, lastName, email } = formData;

    if (!firstName || !lastName || !email) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.warning("Please enter a valid email address.");
      return;
    }

    // Start loading
    setIsSubmitting(true);

    try {
      // Send the data to your Express backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/newsletter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email }),
      });

      if (response.ok) {
        toast.success("🎉 Subscription successful! Thank you for joining.");
        setFormData({ firstName: "", lastName: "", email: "" }); // Clear form
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("A network error occurred. Please try again.");
    } finally {
      // Stop loading
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
          {/* Left Section - Text Information */}
          <div className="flex-1">
            <p className="text-gray-500 text-sm mb-2">Stay in touch</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-800 mb-4">
              Stay Connected
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Sign up for our weekly newsletter update.
            </p>
          </div>

          {/* Right Section - Subscription Form */}
          <div className="flex-1 w-full">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Fields Row */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your first name"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="flex-1">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your last name"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email address"
                  disabled={isSubmitting}
                />
              </div>

              {/* Privacy Policy Disclaimer */}
              <p className="text-sm text-gray-600">
                By submitting this form, I agree with the website's{" "}
                <a href="#" className="text-blue-600 underline hover:text-blue-800 transition-colors">
                  Privacy Policy.
                </a>
              </p>

              {/* Subscribe Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gray-900 text-white py-3 px-8 rounded-full font-semibold hover:bg-black transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover draggable theme="colored" />
    </section>
  );
};

export default Newsletter;