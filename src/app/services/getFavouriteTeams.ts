import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getFavoriteTeams = async (userId: string): Promise<number[]> => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const favourites = userSnap.data().favourites || [];
      console.log("🔥 Любими отбори от Firestore:", favourites);
      return favourites;
    } else {
      console.warn("⚠️ Потребителят няма любими отбори.");
      return [];
    }
  } catch (error) {
    console.error("❌ Грешка при извличане на любимите отбори:", error);
    return [];
  }
};
