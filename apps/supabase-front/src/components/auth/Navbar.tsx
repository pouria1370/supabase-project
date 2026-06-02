import { supabase } from "../../superbase-client";
import "./Navbar.css";

export default function Navbar() {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      return;
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Supabase App</div>

      <div className="navbar-actions">
        <button className="logout-btn" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </nav>
  );
}
