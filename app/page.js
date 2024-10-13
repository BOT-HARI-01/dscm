import Link from 'next/link';

export default function Home() {
  return (
    <div className='main_container'>
      <div className="header-container">
        <header className="header link-body-emphasis text-decoration-none">
          <Link href="/" className="header-title">
            DSCM
          </Link>
          <nav className="nav nav-pills"> {/* Nav pills for the active , button */}
            <ul>
              <li><Link href="/" className="nav-link">Home</Link></li>
              <li><Link href="/about" className="nav-link">About</Link></li>
              <li><Link href="/auth/Login" className="nav-link nav-button">Login</Link></li>
              <li><Link href="/auth/Signup" className="nav-link nav-button">Signup</Link></li>
              {/* <li className="nav-item"><Link href="#" className="nav-link nav-button">Features</Link></li> */}
            </ul>
          </nav>
        </header>
      </div>
     
      <main className="flex-grow-1">
        {/* Add your main content here */
        }
                <section className="hero">
          <h1>Welcome to Drug Inventory System</h1>
          <p>Streamlining supply chain management from raw materials to hospitals and pharmacies.</p>
        </section>
      </main>
      
      <footer>
        <p>© 2024 Drug Inventory System</p>
      </footer>
    </div>
  );
}
