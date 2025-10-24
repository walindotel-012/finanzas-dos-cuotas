import { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

export function useHousehold(uid = "demo") {
  const [household, setHousehold] = useState({
    userA: { name: "Usuario A" },
    userB: { name: "Usuario B" },
    splitPercent: 50,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "households"), where("uid", "==", uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const data = snapshot.docs[0].data();
        setHousehold({
          userA: data.userA || { name: "Usuario A" },
          userB: data.userB || { name: "Usuario B" },
          splitPercent: data.splitPercent || 50,
        });
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [uid]);

  const updateHousehold = async (newData) => {
    const q = query(collection(db, "households"), where("uid", "==", uid));
    const snapshot = await (await import("firebase/firestore")).getDocs(q);
    if (!snapshot.empty) {
      const docRef = doc(db, "households", snapshot.docs[0].id);
      await updateDoc(docRef, newData);
    } else {
      await addDoc(collection(db, "households"), { uid, ...newData });
    }
    setHousehold(newData);
  };

  return { household, loading, updateHousehold };
}
