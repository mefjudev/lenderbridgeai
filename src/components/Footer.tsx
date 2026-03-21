import Link from 'next/link';
import { ShieldCheck, Lock, ArrowRight } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoText}>LenderBridge</span>
            </Link>
            <p className={styles.tagline}>
              Helping homeowners avoid foreclosure through expert short sale negotiation.
            </p>
            <div className={styles.badges}>
              <span className="badge badge--green">
                <ShieldCheck size={14} style={{ marginRight: '4px' }} /> Licensed Negotiators
              </span>
              <span className="badge badge--blue">
                <Lock size={14} style={{ marginRight: '4px' }} /> Secure & Confidential
              </span>
            </div>
          </div>

          <div className={styles.linkGroup}>
            <h4 className={styles.groupTitle}>Services</h4>
            <Link href="/how-it-works" className={styles.footerLink}>How It Works</Link>
            <Link href="/intake" className={styles.footerLink}>Start Your Short Sale</Link>
            <Link href="/agents" className={styles.footerLink}>Agent Referrals</Link>
          </div>

          <div className={styles.linkGroup}>
            <h4 className={styles.groupTitle}>Company</h4>
            <Link href="/contact" className={styles.footerLink}>About & Contact</Link>
            <Link href="/legal/privacy" className={styles.footerLink}>Privacy Policy</Link>
            <Link href="/legal/terms" className={styles.footerLink}>Terms of Service</Link>
          </div>

          <div className={styles.linkGroup}>
            <h4 className={styles.groupTitle}>Start Today</h4>
            <p className={styles.ctaText}>Ready to explore your options? Get started with a $195 intake.</p>
            <Link href="/intake" className="btn btn--primary btn--sm" style={{marginTop: '12px'}}>
              Start Your Short Sale <ArrowRight size={16} style={{ marginLeft: '4px' }} />
            </Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>© {year} LenderBridge — All rights reserved.</p>
          <p className={styles.disclaimer}>
            LenderBridge is not a law firm. We do not provide legal advice. Short sale results may vary.
          </p>
        </div>
      </div>
    </footer>
  );
}
