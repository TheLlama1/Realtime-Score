import React from "react";
import MyNavbar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <MyNavbar /> {/* Include the Navbar component */}
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8">RealtimeScore</h1>
        <p className="text-lg">
          The best place to check your football results!
        </p>
      </main>
    </>
  );
}
