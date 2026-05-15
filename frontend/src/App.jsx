import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import DocsPage from "./pages/DocsPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
