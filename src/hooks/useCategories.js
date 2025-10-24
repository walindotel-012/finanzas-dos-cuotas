// src/hooks/useCategories.js
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

export function useCategories(uid = "demo") {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "categories"),
      where("uid", "==", uid),
      orderBy("nombre", "asc")
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCategories(list);
        setLoading(false);
      },
      (error) => {
        console.error("Error en useCategories:", error);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [uid]);

  const addCategory = async (nombre) => {
    if (!nombre.trim()) throw new Error("Nombre inválido");
    await addDoc(collection(db, "categories"), {
      uid,
      nombre: nombre.trim(),
      creadoEn: Date.now(),
    });
  };

  const updateCategory = async (id, nombre) => {
    if (!nombre.trim()) throw new Error("Nombre inválido");
    const docRef = doc(db, "categories", id);
    await updateDoc(docRef, { nombre: nombre.trim() });
  };

  const deleteCategory = async (id) => {
    const docRef = doc(db, "categories", id);
    await deleteDoc(docRef);
  };

  return { categories, loading, addCategory, updateCategory, deleteCategory };
}