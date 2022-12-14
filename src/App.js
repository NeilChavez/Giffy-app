import { Routes, Route } from "react-router-dom";
import Details from "./pages/Details";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchPage from "./pages/SearchPage";
import ErrorPage from "./pages/ErrorPage";
import AuthContextProvider from "./context/AuthContext";
import { GifsContextProvider } from "./context/GifsContext";

import "./App.css";

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <Header />
        <GifsContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword">
              <Route path=":rating" element={<SearchPage />}>
                <Route path=":language" element={<SearchPage />} />
                <Route path="" element={<SearchPage />} />
              </Route>
              <Route path="" element={<SearchPage />} />
            </Route>
            <Route path="/gif/:id" element={<Details />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </GifsContextProvider>
      </div>
    </AuthContextProvider>
  );
}

export default App;
