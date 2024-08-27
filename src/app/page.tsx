import React from "react";
import MyNavbar from "@/components/navbar";
import HomePage from "@/app/home";
export default function Home() {
  return (
    <>
      <MyNavbar /> {/* Include the Navbar component */}
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <HomePage />
      </main>
    </>
  );
}
