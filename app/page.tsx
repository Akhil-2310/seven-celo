"use client";

import { useSignerStatus } from "@account-kit/react";
import { useState, useEffect } from "react";
import UserInfoCard from "./components/user-info-card";
import LoginCard from "./components/login-card";
import Header from "./components/header";
import SevenUpDownGame from "./components/sevenupdowngame";
import VerifyPage from "./components/VerifyPage";

export default function Home() {
  const signerStatus = useSignerStatus();
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  const checkVerificationStatus = () => {
    if (signerStatus.isConnected) {
      const verifiedData = localStorage.getItem('verifiedUserData');
      if (verifiedData) {
        const { isVerified: verified } = JSON.parse(verifiedData);
        setIsVerified(verified);
      } else {
        setIsVerified(false);
      }
    }
  };

  useEffect(() => {
    checkVerificationStatus();
  }, [signerStatus.isConnected]);

  if (!signerStatus.isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <Header />
        <div className="bg-bg-main bg-cover bg-center bg-no-repeat h-[calc(100vh-4rem)]">
          <main className="container mx-auto px-4 py-8 h-full">
            <div className="flex justify-center items-center h-full pb-[4rem]">
              <LoginCard />
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Show verification check if user is connected but not verified
  if (!isVerified) {
    return <VerifyPage onVerificationComplete={() => setIsVerified(true)} />;
  }

  // User is connected and verified - show game
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Header />
      <div className="bg-bg-main bg-cover bg-center bg-no-repeat h-[calc(100vh-4rem)]">
        <main className="container mx-auto px-4 py-8 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
            {/* User Info Card - Left Side */}
            <div className="lg:col-span-1 flex flex-col">
              <UserInfoCard />
            </div>
            
            {/* Game - Center/Right Side */}
            <div className="lg:col-span-3 flex items-center justify-center">
              <SevenUpDownGame />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}