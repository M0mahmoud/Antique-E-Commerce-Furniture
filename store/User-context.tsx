"use client";
import { UserDocument } from "@/lib/definitions";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type UserContextType = {
  user: UserDocument | null;
  setUser: Dispatch<SetStateAction<UserDocument | null>>;
  loading: boolean;
  updateUser: (email: string, name: string) => Promise<void | Error>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserDocument | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        if (res.ok) {
          const userFe = await res.json();
          setUser(userFe);
        } else setUser(null);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const updateUser = async (email: string, name: string) => {
    try {
      // TODO: Add Token or csrf or any security
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      const newData = await response.json();
      setUser(newData);
    } catch (error: any) {
      console.error("Error updating user:", error);
      setUser(null);
      return error;
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
