import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import SyncLogic from "./pages/sync-logic";
import Signup from "./pages/sign-up";
import Signin from "./pages/sign-in";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sync-logic" element={<SyncLogic />} />
        <Route path="/sign-in" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
