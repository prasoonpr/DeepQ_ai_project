import { useState } from "react";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard";
import { getToken } from "./services/auth";
import { removeToken } from "./services/auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!getToken());
  const handleLogout = () => {
    removeToken()
    setLoggedIn(false)
  }

  return (
    <div>
      {loggedIn ? <Dashboard onLogout={handleLogout} /> : <Login onLogin={() => setLoggedIn(true)} />}
    </div>
  );
}

export default App;
