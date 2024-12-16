"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProgressSteps from "@/components/ProgressSteps";

export default function PhoneNumberPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [step, setStep] = useState("phone");
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/SendOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();

      if (data.success) {
        setUserId(data.userId);
        setStep("otp");
        setSuccess("OTP sent successfully!");
      } else {
        setError(data.message || "Failed to send OTP");
      }
    } catch (error) {
      setError("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/VerifyOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          secret: otp,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("OTP verified successfully!");
        // Navigate to the next step after successful verification
        router.push("/onboarding/profile");
      } else {
        setError(data.message || "Failed to verify OTP");
      }
    } catch (error) {
      setError("Failed to verify OTP. Please try again.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full pt-8 animate-slideDown">
        <ProgressSteps />
      </div>
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)] backdrop-blur-sm animate-fadeIn">
          <h1 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600">
            {step === "phone"
              ? "Enter your phone number"
              : "Enter verification code"}
          </h1>

          {step === "phone" ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div className="relative group">
                <label
                  htmlFor="phone"
                  className="block text-base font-semibold text-gray-700 mb-2 transition-transform group-focus-within:-translate-y-1"
                >
                  Phone Number
                </label>
                <div
                  className={`
                    relative rounded-lg transition-all duration-300
                    ${isFocused ? "shadow-[0_0_15px_rgba(0,0,0,0.1)]" : ""}
                  `}
                >
                  <input
                    type="tel"
                    id="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="+385 99 123 4567"
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg
                      focus:border-black focus:outline-none focus:ring-0
                      transition-all duration-300"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-4 px-6 rounded-lg
                  hover:bg-gray-800 transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Continue
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="relative group">
                <label
                  htmlFor="otp"
                  className="block text-base font-semibold text-gray-700 mb-2 transition-transform group-focus-within:-translate-y-1"
                >
                  Verification Code
                </label>
                <div
                  className={`
                    relative rounded-lg transition-all duration-300
                    ${isFocused ? "shadow-[0_0_15px_rgba(0,0,0,0.1)]" : ""}
                  `}
                >
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Enter 6-digit code"
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg
                      focus:border-black focus:outline-none focus:ring-0
                      transition-all duration-300"
                    required
                    maxLength={6}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 px-6 rounded-lg
                    hover:bg-gray-800 transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  Verify Code
                </button>
                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="w-full bg-white text-black py-4 px-6 rounded-lg border-2 border-gray-200
                    hover:bg-gray-50 transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  Back to Phone Number
                </button>
              </div>
            </form>
          )}

          {error && (
            <div className="mt-4 p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
              {error}
            </div>
          )}
          {success && (
            <div className="mt-4 p-3 text-sm text-green-600 bg-green-50 rounded-lg border border-green-200">
              {success}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
