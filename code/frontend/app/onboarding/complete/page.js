"use client";

import { useRouter } from "next/navigation";
import ProgressSteps from "@/components/ProgressSteps";

export default function CompletePage() {
  const router = useRouter();

  const handleShare = () => {
    // TODO: Implement share functionality
    const url = "https://linktree.me/username"; // This should be dynamic
    if (navigator.share) {
      navigator
        .share({
          title: "My Linktree",
          text: "Check out my Linktree!",
          url: url,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      navigator.clipboard.writeText(url).then(() => {
        alert("Link copied to clipboard!");
      });
    }
  };

  const handleContinue = () => {
    router.push("/dashboard");
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full pt-8 animate-slideDown">
        <ProgressSteps currentStep="complete" />
      </div>
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="w-full max-w-lg text-center">
          {/* Success Animation */}
          <div className="mb-8 relative">
            <div className="w-32 h-32 mx-auto bg-black rounded-full flex items-center justify-center animate-[scale_0.5s_ease-out]">
              <svg
                className="w-16 h-16 text-white animate-[slideDown_0.5s_ease-out_0.2s_both]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            {/* Confetti Effect */}
            <div className="absolute -inset-8 animate-[confetti_1s_ease-out]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: [
                        "#FF416C",
                        "#FF4B2B",
                        "#4A00E0",
                        "#8E2DE2",
                      ][i % 4],
                      transform: `rotate(${i * 30}deg) translate(40px)`,
                      animation: `confettiParticle 1s ease-out forwards ${
                        i * 0.1
                      }s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4 animate-[slideUp_0.5s_ease-out_0.3s_both] text-gray-900">
            🎉 Boom! You're done! 🎊
          </h1>

          <p className="text-gray-700 text-lg mb-12 animate-[slideUp_0.5s_ease-out_0.4s_both]">
            ✨ Your Linktree is ready to share with the world! 🚀
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[slideUp_0.5s_ease-out_0.5s_both]">
            <button
              onClick={handleShare}
              className="px-8 py-4 rounded-lg text-white bg-black transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-all duration-300 ease-out relative overflow-hidden group text-lg font-medium"
            >
              <span className="relative z-10">🔗 Share your link</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button
              onClick={handleContinue}
              className="px-8 py-4 rounded-lg text-black transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out bg-white border-2 border-black relative overflow-hidden group text-lg font-medium"
            >
              <span className="relative z-10">✏️ Continue editing</span>
              <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scale {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes slideDown {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideUp {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes confetti {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes confettiParticle {
          0% {
            transform: rotate(var(--rotation)) translate(0);
            opacity: 1;
          }
          100% {
            transform: rotate(var(--rotation)) translate(80px);
            opacity: 0;
          }
        }
      `}</style>
    </main>
  );
}
