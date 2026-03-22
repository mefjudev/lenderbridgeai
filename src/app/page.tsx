'use client';
import Link from 'next/link';
import { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Zap, 
  Lock, 
  Trophy, 
  Plus, 
  Minus, 
  ArrowRight, 
  CheckCircle2,
  Shield
} from 'lucide-react';
import styles from './page.module.css';

const faqs = [
  {
    q: "What exactly is a short sale?",
    a: "A short sale is when a homeowner sells their property for less than the mortgage balance owed, with the lender's approval. It's a way to avoid foreclosure while satisfying a portion of the debt.",
  },
  {
    q: "How is LenderBridge.ai different from a real estate agent?",
    a: "We specifically handle the negotiation with your lender — including submitting the hardship package, communicating with loss mitigation departments, and securing lender approval. Your agent focuses on the sale; we focus on the lender.",
  },
  {
    q: "What is the $195 intake fee for?",
    a: "The intake fee covers review of your case, preparation of your initial file, and direct communication with your lender to begin the short sale approval process.",
  },
  {
    q: "How long does a short sale typically take?",
    a: "Most short sales take 60–120 days depending on the lender. We work to expedite the process by maintaining consistent communication and staying on top of your file.",
  },
  {
    q: "Can I be in active foreclosure and still qualify?",
    a: "Yes. We work with homeowners in all stages — whether you've just missed a payment or already received a foreclosure notice. The sooner you act, the more options you have.",
  },
  {
    q: "Will this hurt my credit?",
    a: "A short sale does impact your credit, but typically less than a full foreclosure. Many homeowners are able to qualify for a new mortgage within 2–3 years after a short sale.",
  },
];

const trustItems = [
  { icon: <ShieldCheck size={36} color="var(--color-green)" />, title: "Lender-Experienced", desc: "Our team has successfully negotiated with major lenders including Bank of America, Wells Fargo, and Chase." },
  { icon: <Zap size={36} color="var(--color-green)" />, title: "Fast Communication", desc: "We respond within 24 hours and maintain proactive contact with lenders to keep your case moving forward." },
  { icon: <Lock size={36} color="var(--color-green)" />, title: "100% Confidential", desc: "Your financial information is handled with the strictest confidentiality and never shared without your consent." },
  { icon: <Trophy size={36} color="var(--color-green)" />, title: "Proven Results", desc: "We've helped hundreds of homeowners achieve successful short sales and avoid the lasting damage of foreclosure." },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroBadge}>
            <Shield size={16} /> Short Sale Negotiation Experts
          </div>
          <h1 className={styles.heroTitle}>
            Avoid Foreclosure.<br />
            <span className={styles.heroAccent}>Get a Fresh Start.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            LenderBridge.ai negotiates directly with your mortgage lender to approve a short sale —
            protecting you from foreclosure and giving you a path forward.
          </p>
          <div className={styles.heroActions}>
            <Link href="/intake" className="btn btn--primary btn--lg">
              Start Your Short Sale — $195
            </Link>
            <Link href="/how-it-works" className="btn btn--secondary btn--lg">
              Learn How It Works
            </Link>
          </div>
          <div className={styles.heroTrust}>
            <span><CheckCircle2 size={16} color="var(--color-green)" /> No foreclosure on your record</span>
            <span><CheckCircle2 size={16} color="var(--color-green)" /> Direct lender negotiation</span>
            <span><CheckCircle2 size={16} color="var(--color-green)" /> Results in 60–120 days</span>
          </div>
        </div>
        <div className={styles.heroBg} aria-hidden="true" />
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className={`section section--navy`} id="how-it-works">
        <div className="container text-center">
          <div className="section-label mx-auto">Simple Process</div>
          <h2 className="section-title" style={{color: 'var(--color-white)'}}>How LenderBridge Works</h2>
          <p className="section-subtitle section-subtitle--white mx-auto">
            We handle the complex lender negotiation so you can focus on moving forward.
          </p>
          <div className="steps-grid">
            {[
              { n: "1", title: "Submit Your Information", desc: "Fill out a short intake form with your property details, lender info, and foreclosure status. Takes under 5 minutes." },
              { n: "2", title: "Pay $195 Intake Fee", desc: "A one-time fee to begin your case. We review your hardship, prepare your file, and initiate contact with your lender." },
              { n: "3", title: "We Negotiate With Your Lender", desc: "Our team submits your hardship package and negotiates directly with your lender's loss mitigation department on your behalf." },
              { n: "4", title: "Short Sale Approved", desc: "Once approved, your property is listed, sold, and your mortgage obligation is resolved — avoiding foreclosure entirely." },
            ].map((step) => (
              <div key={step.n} className="step-card card" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}>
                <div className="step-number">{step.n}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST SECTION ===== */}
      <section className="section section--gray">
        <div className="container text-center">
          <div className="section-label mx-auto">Why Choose Us</div>
          <h2 className="section-title">Built on Trust & Expertise</h2>
          <p className="section-subtitle mx-auto">
            We combine deep lender knowledge with a client-first approach to deliver the best possible outcome.
          </p>
          <div className="grid-4" style={{marginTop: '56px'}}>
            {trustItems.map((item) => (
              <div key={item.title} className="card" style={{textAlign: 'left'}}>
                <div className={styles.trustIcon}>{item.icon}</div>
                <h3 className={styles.trustTitle}>{item.title}</h3>
                <p className={styles.trustDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOCIAL PROOF BANNER ===== */}
      <section className={styles.statsBanner}>
        <div className="container">
          <div className={styles.statsGrid}>
            {[
              { num: "500+", label: "Short Sales Negotiated" },
              { num: "94%", label: "Lender Approval Rate" },
              { num: "72 Days", label: "Average Resolution Time" },
              { num: "$195", label: "Simple Flat Intake Fee" },
            ].map((s) => (
              <div key={s.label} className={styles.statItem}>
                <div className={styles.statNum}>{s.num}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{marginBottom: '56px'}}>
            <div className="section-label mx-auto">Common Questions</div>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle mx-auto">
              Understanding the process makes a big difference. Here are answers to the most common questions we hear.
            </p>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`faq-item ${openFaq === i ? 'open' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  {faq.q}
                  <span className="faq-icon">
                    {openFaq === i ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className={`${styles.ctaSection}`}>
        <div className="container text-center">
          <h2 className={styles.ctaTitle}>Ready to Take Control of Your Situation?</h2>
          <p className={styles.ctaSubtitle}>
            Every day matters. The sooner you start, the more options you have. Begin your short sale today.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/intake" className="btn btn--primary btn--lg">
              Start Your Short Sale — $195 <ArrowRight size={20} style={{ marginLeft: '8px' }} />
            </Link>
            <Link href="/contact" className="btn btn--secondary btn--lg">
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
