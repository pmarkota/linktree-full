"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProgressSteps from "@/components/ProgressSteps";

const socialPlatforms = [
  {
    id: "instagram",
    name: "Instagram",
    icon: "📸",
    placeholder: "instagram.com/username",
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: "🐦",
    placeholder: "twitter.com/username",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: "🎥",
    placeholder: "youtube.com/@channel",
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: "🎵",
    placeholder: "tiktok.com/@username",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "👥",
    placeholder: "facebook.com/username",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "💼",
    placeholder: "linkedin.com/in/username",
  },
  {
    id: "github",
    name: "GitHub",
    icon: "💻",
    placeholder: "github.com/username",
  },
  {
    id: "website",
    name: "Website",
    icon: "🌐",
    placeholder: "www.example.com",
  },
];

export default function SocialPage() {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [platformUrls, setPlatformUrls] = useState({});
  const router = useRouter();

  const togglePlatform = (platformId) => {
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(selectedPlatforms.filter((id) => id !== platformId));
      const newUrls = { ...platformUrls };
      delete newUrls[platformId];
      setPlatformUrls(newUrls);
    } else if (selectedPlatforms.length < 5) {
      setSelectedPlatforms([...selectedPlatforms, platformId]);
    }
  };

  const handleUrlChange = (platformId, url) => {
    setPlatformUrls({
      ...platformUrls,
      [platformId]: url,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Save social platforms to backend
    router.push("/onboarding/profile");
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full pt-8 animate-slideDown">
        <ProgressSteps />
      </div>
      <div className="flex-1 w-full max-w-3xl mx-auto">
        <div className="text-center mb-8 animate-fadeIn">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">
            Add your social platforms
          </h1>
          <p className="text-gray-700 text-lg">
            Select up to 5 platforms where people can find you
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {socialPlatforms.map((platform) => (
              <div
                key={platform.id}
                onClick={() => togglePlatform(platform.id)}
                className={`
                  p-4 rounded-xl cursor-pointer text-center
                  transform hover:scale-[1.02] transition-all duration-300
                  ${
                    selectedPlatforms.includes(platform.id)
                      ? "bg-black text-white shadow-[0_0_20px_rgba(0,0,0,0.3)]"
                      : selectedPlatforms.length >= 5
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] text-gray-900"
                  }
                `}
              >
                <div className="text-3xl mb-2">{platform.icon}</div>
                <div className="font-medium">{platform.name}</div>
              </div>
            ))}
          </div>

          {selectedPlatforms.length > 0 && (
            <div className="space-y-4 bg-white rounded-2xl p-6 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)]">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                Add your links
              </h2>
              {selectedPlatforms.map((platformId) => {
                const platform = socialPlatforms.find(
                  (p) => p.id === platformId
                );
                return (
                  <div key={platformId} className="relative group">
                    <label
                      htmlFor={platformId}
                      className="block text-sm font-medium text-gray-800 mb-1"
                    >
                      {platform.name}
                    </label>
                    <input
                      type="url"
                      id={platformId}
                      value={platformUrls[platformId] || ""}
                      onChange={(e) =>
                        handleUrlChange(platformId, e.target.value)
                      }
                      placeholder={platform.placeholder}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg
                        focus:border-black focus:outline-none focus:ring-0
                        transition-all duration-300
                        text-gray-900
                        placeholder:text-gray-500
                        bg-gray-50 focus:bg-white"
                      required
                    />
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={selectedPlatforms.length === 0}
              className={`
                px-8 py-3 rounded-lg text-white
                transform hover:scale-[1.02] transition-all duration-300
                relative overflow-hidden group text-lg font-medium
                ${
                  selectedPlatforms.length > 0
                    ? "bg-black hover:shadow-[0_0_15px_rgba(0,0,0,0.2)]"
                    : "bg-gray-400 cursor-not-allowed"
                }
              `}
            >
              <span className="relative z-10">Continue</span>
              {selectedPlatforms.length > 0 && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
