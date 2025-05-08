"use client";
import React, { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

interface FavouriteButtonProps {
  teamId: number;
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({ teamId }) => {
  const [user, setUser] = useState<any>(null);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        checkFavourite(user.uid, teamId);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [teamId]);

  const checkFavourite = async (userId: string, teamId: number) => {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      if (userData.favourites && userData.favourites.includes(teamId)) {
        setIsFavourite(true);
      }
    }
  };

  const toggleFavourite = async () => {
    if (!user) {
      alert(
        "Трябва да сте влезнали в акаунта си, за да зададете отбор като любим."
      );
      return;
    }

    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      let newFavourites = [];

      if (userData.favourites && userData.favourites.includes(teamId)) {
        newFavourites = userData.favourites.filter(
          (id: number) => id !== teamId
        );
        setIsFavourite(false);
      } else {
        newFavourites = [...(userData.favourites || []), teamId];
        setIsFavourite(true);
      }

      await setDoc(userDocRef, { favourites: newFavourites }, { merge: true });
    } else {
      await setDoc(userDocRef, { favourites: [teamId] }, { merge: true });
      setIsFavourite(true);
    }
  };

  return (
    <button
      onClick={toggleFavourite}
      className={`text-white ${
        isFavourite ? "bg-gray-600" : "bg-gray-700"
      } hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}
    >
      {isFavourite ? "Премахване от любими" : "Добавяне към любими"}
    </button>
  );
};

export default FavouriteButton;
