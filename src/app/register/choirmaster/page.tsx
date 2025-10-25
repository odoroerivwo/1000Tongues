"use client";

import { Music, Users, Award, Heart } from "lucide-react";
import ChoirmasterForm from "@/components/ChoirmasterForm";

export default function PublicChoirmasterRegistration() {
  const handleSubmit = async (formData: any) => {
    const res = await fetch("/api/choirmasters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, isPublic: true }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
      {/* Header Section */}
      <div className="bg-[#B8860B] text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3">
            <Music className="w-8 h-8" />
            <h1 className="text-2xl md:text-3xl font-bold">Choir Management System</h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Join Our Choir Community
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Register as a choirmaster and become part of our vibrant musical family. 
            Share your talent, inspire others, and make beautiful music together.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-[#B8860B]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Connect</h3>
            <p className="text-gray-600">
              Join a community of passionate choirmasters and musicians
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-[#B8860B]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Grow</h3>
            <p className="text-gray-600">
              Develop your skills and share your expertise with others
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-[#B8860B]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Inspire</h3>
            <p className="text-gray-600">
              Lead choirs and create memorable musical experiences
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl p-8 md:p-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Registration Form
              </h3>
              <p className="text-gray-600">
                Fill in your details below to register as a choirmaster
              </p>
            </div>

            <ChoirmasterForm
              onSubmit={handleSubmit}
              submitButtonText="Register Now"
              isPublic={true}
            />

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                Your application will be reviewed by our admin team. You'll receive 
                a notification once your registration is approved.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Already registered? Contact the admin for access to your account.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Choir Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}