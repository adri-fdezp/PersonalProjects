import { Outlet } from 'react-router-dom';
import Header from '../components/portfolio/Header';
import AnimatedBackground from '../components/portfolio/AnimatedBackground';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ScrollToHashElement component to handle scrolling to anchor tags on route change
function ScrollToHashElement() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return null;
}

export default function PortfolioLayout() {
  return (
    <div className="portfolio-layout">
      <ScrollToHashElement />
      <AnimatedBackground />
      
      <Header />

      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
}