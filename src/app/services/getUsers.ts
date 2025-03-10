import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function getUsers() {
  const usersSnapshot = await getDocs(collection(db, "users"));
  return usersSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}
