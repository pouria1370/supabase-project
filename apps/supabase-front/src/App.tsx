import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./superbase-client";
import TaskManager from "./components/TaskManager";
import Auth from "./components/auth/Auth";
import Navbar from "./components/auth/Navbar";

export default function App() {
  /**
   *  --------------------- states ---------------------
   */
  const [session, setSession] = useState<any>(null);

  /**
   *  --------------------- handlers ---------------------
   */
  const fetchSession = async () => {
    const { data: sessionData, error } = await supabase.auth.getSession();
    if (!error) setSession(sessionData.session);
  };
  /**
   *  --------------------- side-effects ---------------------
   */
  useEffect(() => {
    fetchSession();
    const authListener = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      {session && (
        <>
          <Navbar />
          <TaskManager session={session} />
        </>
      )}
      {!session && <Auth />}
    </>
  );
}
