import Link from 'next/link';
import type { Metadata } from 'next';
import { 
  CheckCircle2, 
  Mail, 
  PhoneCall, 
  FolderOpen, 
  Landmark, 
  Check, 
  Home 
} from 'lucide-react';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Payment Confirmed | LenderBridge.ai",
  description: "Your short sale intake is confirmed. Here are your next steps.",
};

export default function SuccessPage() {
  return (
    <section className={styles.page}>
      <div className="container">
        <div className={styles.card}>
          <div className={styles.checkIcon}>
            <CheckCircle2 size={64} color="var(--color-green)" />
          </div>
          <h1 className={styles.title}>You&apos;re All Set!</h1>
          <p className={styles.subtitle}>
            Your payment of <strong>$195</strong> has been received. Your short sale case is now officially open.
          </p>

          <div className={styles.steps}>
            <h2 className={styles.nextTitle}>What Happens Next</h2>
            {[
              { n: "1", icon: <Mail size={24} color="var(--color-green)" />, title: "Confirmation Email", desc: "Check your inbox — you should receive a payment receipt and a welcome email from our team within the next few minutes." },
              { n: "2", icon: <PhoneCall size={24} color="var(--color-green)" />, title: "Team Introduction Call", desc: "Within 1–2 business days, a member of our negotiation team will reach out to introduce themselves and walk you through the next steps." },
              { n: "3", icon: <FolderOpen size={24} color="var(--color-green)" />, title: "Document Collection", desc: "We'll send you a secure checklist of documents we need to prepare your hardship package. Gathering these ahead of time speeds up the process." },
              { n: "4", icon: <Landmark size={24} color="var(--color-green)" />, title: "Lender Contact Begins", desc: "Once we have your documents, we'll initiate contact with your lender's loss mitigation department and begin formal negotiations." },
            ].map((s) => (
              <div key={s.n} className={styles.step}>
                <div className={styles.stepIcon}>{s.icon}</div>
                <div>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepDesc}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.docNote}>
            <h3>
              <FolderOpen size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> 
              Documents to Gather
            </h3>
            <p>Start collecting these documents before your first call. Our team will guide you and help you write your hardship letter.</p>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              {[
                "Last 2 months of bank statements",
                "Last 2 tax returns / W-2s",
                "Recent pay stubs (or loss of income documentation)",
                "Monthly budget / expense breakdown",
                "Current mortgage statement",
                "Any foreclosure notices you've received",
              ].map((d) => (
                <li key={d} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px', fontSize: '14px', color: 'var(--color-gray-600)' }}>
                  <Check size={16} color="var(--color-green)" style={{ flexShrink: 0, marginTop: '2px' }} /> 
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.actions}>
            <Link href="/contact" className="btn btn--primary btn--lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Mail size={18} /> Contact Our Team
            </Link>
            <Link href="/" className="btn btn--outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Home size={18} /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
