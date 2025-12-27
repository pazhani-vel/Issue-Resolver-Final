import React, { createContext, useState, useEffect, useCallback } from "react";
import { getUserIssues } from "../firebase/firestore";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({}); // lowercase keys
  const [issues, setIssues] = useState([]);

  const fetchIssues = useCallback(async () => {
    if (!userData?.email) {
      setIssues([]);
      return;
    }
    try {
      const data = await getUserIssues(userData.email);
      setIssues(data);
    } catch (err) {
      console.error("Error fetching issues:", err);
      setIssues([]);
    }
  }, [userData?.email]);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  return (
    <UserContext.Provider value={{ userData, setUserData, issues, fetchIssues }}>
      {children}
    </UserContext.Provider>
  );
};
