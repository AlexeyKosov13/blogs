
import { BlogContent } from "./components/BlogContent/BlogContent";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";

import './App.css';


export function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <BlogContent />
      </main>

      <Footer year={ new Date().getFullYear()} />
    </div>
  );
}

