"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProgressSteps from "@/components/ProgressSteps";

const businessTypes = [
  { id: "doctor", label: "Doctor", icon: "👨‍⚕️" },
  { id: "mentor", label: "Mentor", icon: "👨‍🏫" },
  { id: "artist", label: "Artist", icon: "🎨" },
  { id: "musician", label: "Musician", icon: "🎵" },
  { id: "fitness", label: "Fitness Trainer", icon: "💪" },
  { id: "business", label: "Business Owner", icon: "💼" },
];

export default function BusinessTypePage() {
  const [selectedType, setSelectedType] = useState(null);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedType) {
      // TODO: Save business type to backend
      router.push("/onboarding/brand-name");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full pt-8 animate-slideDown">
        <ProgressSteps />
      </div>
      <div className="flex-1 w-full max-w-4xl mx-auto px-4">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600">
            What's your site primarily about?
          </h1>
          <p className="text-gray-600">
            Choose the category that best describes your profile
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {businessTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`
                  p-6 rounded-2xl cursor-pointer
                  transform hover:scale-[1.02] transition-all duration-300
                  ${
                    selectedType === type.id
                      ? "bg-black text-white shadow-[0_0_20px_rgba(0,0,0,0.3)]"
                      : "bg-white text-gray-800 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]"
                  }
                  animate-fadeIn
                `}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-4xl">{type.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{type.label}</h3>
                    <p
                      className={`text-sm ${
                        selectedType === type.id
                          ? "text-gray-300"
                          : "text-gray-500"
                      }`}
                    >
                      Perfect for {type.label.toLowerCase()}s
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={!selectedType}
              className={`
                px-8 py-3 rounded-lg text-white
                transform hover:scale-[1.02] transition-all duration-300
                relative overflow-hidden group
                ${
                  selectedType
                    ? "bg-black hover:shadow-[0_0_15px_rgba(0,0,0,0.2)]"
                    : "bg-gray-300 cursor-not-allowed"
                }
              `}
            >
              <span className="relative z-10">Continue</span>
              {selectedType && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
