'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>LenderBridge</span>
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
          <Link href="/" className={styles.navLink} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/how-it-works" className={styles.navLink} onClick={() => setMenuOpen(false)}>How It Works</Link>
          <Link href="/agents" className={styles.navLink} onClick={() => setMenuOpen(false)}>For Agents</Link>
          <Link href="/contact" className={styles.navLink} onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link href="/intake" className={`btn btn--primary btn--sm ${styles.navCta}`} onClick={() => setMenuOpen(false)}>
            Start Your Short Sale
          </Link>
        </nav>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={28} color="white" /> : <Menu size={28} color="white" />}
        </button>
      </div>
    </header>
  );
}
