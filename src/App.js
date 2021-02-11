import "./App.css";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login"
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function App() {
  const[{user},dispatch] = useStateValue();
  return (
    <div className="app">
      {!user ? (
        <Login/>
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomID">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
