import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Nav/Nav';
import LandingPage from "./pages/LandingPage";
import Articles from "./pages/Articles";
import ArticlesPlan from "./pages/ArticlesPlan";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/articles" element={<ProtectedRoute/>}>
          <Route path="/articles" element={<Articles />}/>
        </Route>
        <Route path="/article-plans" element={<ProtectedRoute/>}>
          <Route path="/article-plans" element={<ArticlesPlan />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
