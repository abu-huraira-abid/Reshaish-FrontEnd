import React, { createContext, useContext, useMemo, useState } from "react";
import toast from "react-hot-toast";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (listingId) => {
    setFavorites((prev) =>
      prev.includes(listingId)
        ? prev.filter((id) => id !== listingId)
        : [...prev, listingId]
    );
  };

  const addToast = (message, variant = "primary") => {
    const options = {
      duration: 3500,
      position: "top-right"
    };

    if (variant === "success") return toast.success(message, options);
    if (variant === "danger" || variant === "error") {
      return toast.error(message, options);
    }
    return toast(message, options);
  };

  const value = useMemo(
    () => ({ favorites, toggleFavorite, addToast }),
    [favorites]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
