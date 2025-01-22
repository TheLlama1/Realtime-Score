import { NextApiRequest, NextApiResponse } from "next";
import { db, auth } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { teamId, userId, action } = req.body;

  if (!teamId || !userId || !action) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    if (action === "add") {
      const userFavoriteDoc = doc(
        db,
        "users",
        userId,
        "favorites",
        teamId.toString()
      );
      await setDoc(userFavoriteDoc, { teamId });
      return res.status(200).json({ message: "Team favorited successfully" });
    } else if (action === "check") {
      const userFavoriteDoc = doc(
        db,
        "users",
        userId,
        "favorites",
        teamId.toString()
      );
      const docSnap = await getDoc(userFavoriteDoc);
      return res.status(200).json({ favorited: docSnap.exists() });
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }
  } catch (error) {
    console.error("Error favoriting team:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
