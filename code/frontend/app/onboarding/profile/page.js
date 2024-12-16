"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ProgressSteps from "@/components/ProgressSteps";

export default function ProfilePage() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [bio, setBio] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Upload image and save bio to backend
    router.push("/onboarding/complete");
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full pt-8 animate-slideDown">
        <ProgressSteps currentStep="profile" />
      </div>
      <div className="flex-1 w-full max-w-2xl mx-auto">
        <div className="text-center mb-8 animate-fadeIn">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">
            Complete your profile
          </h1>
          <p className="text-gray-700 text-lg">
            Add a photo and bio to personalize your page
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Image Upload */}
          <div className="bg-white rounded-2xl p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)]">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-900">
                Profile Photo
              </h2>
              <p className="text-gray-600">
                Add a photo to help people recognize you
              </p>
            </div>

            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                relative w-40 h-40 mx-auto rounded-full
                overflow-hidden cursor-pointer
                transition-all duration-300
                ${
                  isDragging
                    ? "border-4 border-black scale-105"
                    : previewUrl
                    ? ""
                    : "border-4 border-dashed border-gray-300 hover:border-gray-400"
                }
              `}
            >
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Profile preview"
                  fill
                  style={{ objectFit: "cover" }}
                  className="hover:opacity-75 transition-opacity duration-300"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                  <svg
                    className="w-12 h-12 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span className="text-sm font-medium">Add Photo</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <p className="text-center text-sm text-gray-600 mt-4">
              Click or drag and drop • Max size 5MB
            </p>
          </div>

          {/* Bio Section */}
          <div className="bg-white rounded-2xl p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)]">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-900">Bio</h2>
              <p className="text-gray-600">
                Tell people a little bit about yourself
              </p>
            </div>

            <div className="relative">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Write a short bio..."
                rows={4}
                maxLength={160}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg
                  focus:border-black focus:outline-none focus:ring-0
                  transition-all duration-300
                  text-gray-900
                  placeholder:text-gray-500
                  bg-gray-50 focus:bg-white"
              />
              <div className="absolute bottom-2 right-2 text-sm text-gray-600 font-medium">
                {bio.length}/160
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 rounded-lg text-white bg-black
                transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(0,0,0,0.2)]
                transition-all duration-300 ease-out
                relative overflow-hidden
                group
                text-lg font-medium"
            >
              <span className="relative z-10">Continue</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
