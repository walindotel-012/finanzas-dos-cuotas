// src/hooks/useCards.js
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/config";

export function useCards(uid = "demo") {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "cards"),
      where("uid", "==", uid),
      orderBy("entidad", "asc")
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCards(list);
        setLoading(false);
      },
      (error) => {
        console.error("Error en useCards:", error);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [uid]);

  const addCard = async (cardData) => {
    await addDoc(collection(db, "cards"), {
      uid,
      ...cardData,
      creadoEn: Date.now(),
    });
  };

  const updateCard = async (id, cardData) => {
    const docRef = doc(db, "cards", id);
    await updateDoc(docRef, cardData);
  };

  const deleteCard = async (id) => {
    const docRef = doc(db, "cards", id);
    await deleteDoc(docRef);
  };

  return { cards, loading, addCard, updateCard, deleteCard };
}