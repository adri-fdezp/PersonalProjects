import { portfolioData } from '../../data/portfolioData';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header-fixed">
      <nav className="header-container">
        <Link to="/" className="logo-link">
          &lt;{portfolioData.personal.shortName} /&gt;
        </Link>
        <div className="nav-links">
          <Link to="/tools" className="btn-nav btn-primary" style={{border: '1px solid rgba(22, 78, 99, 0.3)', color: '#22d3ee'}}>
            Cybersecurity Tools
          </Link>
        </div>
      </nav>
    </header>
  )
}
