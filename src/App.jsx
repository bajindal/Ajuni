import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { CookieBanner, ChatWidget, ScrollTopBtn } from "./components/Widgets";
import { ScrollProgress, ScrollToTop } from "./components/Primitives";

import Home from "./pages/Home";
import Platform from "./pages/Platform";
import Agents from "./pages/Agents";
import Industry from "./pages/Industry";
import Func from "./pages/Function";
import Module from "./pages/Module";
import Legal from "./pages/Legal";
import Pricing from "./pages/Pricing";
import Security from "./pages/Security";
import Customers from "./pages/Customers";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Resources from "./pages/Resources";
import Integrations from "./pages/Integrations";
import CaseStudies from "./pages/CaseStudies";
import CaseStudy from "./pages/CaseStudy";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <ScrollProgress />
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/platform" element={<Platform />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/industries/:slug" element={<Industry />} />
          <Route path="/functions/:slug" element={<Func />} />
          <Route path="/modules/:slug" element={<Module />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/security" element={<Security />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/:slug" element={<CaseStudy />} />
          <Route path="/privacy" element={<Legal />} />
          <Route path="/terms" element={<Legal />} />
          <Route path="/dpa" element={<Legal />} />
          <Route path="/cookies" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CookieBanner />
      <ChatWidget />
      <ScrollTopBtn />
    </>
  );
}
