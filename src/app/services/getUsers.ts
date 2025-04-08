import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function getUsers() {
  const usersSnapshot = await getDocs(collection(db, "users"));

  return usersSnapshot.docs.map((doc) => {
    // Return the user data including id, username, and email (or other fields you may have)
    return {
      id: doc.id,
      username: doc.data().username, // Make sure this field exists in your Firestore documents
      email: doc.data().email, // Make sure this field exists in your Firestore documents
      // Include other fields if necessary
    };
  });
}
