import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  FileText, 
  CreditCard, 
  FolderOpen, 
  MessageSquare, 
  CheckCircle2, 
  PartyPopper, 
  Clock,
  Check
} from 'lucide-react';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "How It Works | LenderBridge.ai",
  description: "Learn how LenderBridge.ai negotiates with your lender to approve a short sale and help you avoid foreclosure — step by step.",
};

const steps = [
  {
    n: "01",
    title: "Submit Your Intake Form",
    desc: "Fill out our secure intake form with your property address, mortgage lender, outstanding balance, and current foreclosure status. This helps us understand your situation before we contact your lender.",
    time: "5 minutes",
    icon: <FileText size={32} color="var(--color-green)" />,
  },
  {
    n: "02",
    title: "Pay the $195 Intake Fee",
    desc: "After submitting the form, you'll be directed to our secure Stripe payment page to pay the $195 flat intake fee. This covers the initial case review, hardship package preparation, and first lender contacts.",
    time: "2 minutes",
    icon: <CreditCard size={32} color="var(--color-green)" />,
  },
  {
    n: "03",
    title: "We Prepare Your Hardship Package",
    desc: "We compile all necessary financial documents, write a compelling hardship letter, and prepare the full short sale package required by lenders. We will contact you to gather any missing documents.",
    time: "3–5 business days",
    icon: <FolderOpen size={32} color="var(--color-green)" />,
  },
  {
    n: "04",
    title: "Lender Negotiation Begins",
    desc: "Our team submits your package to your lender's loss mitigation department and enters into active negotiation. We handle all lender communication, follow-ups, appraisal scheduling, and paperwork.",
    time: "30–90 days",
    icon: <MessageSquare size={32} color="var(--color-green)" />,
  },
  {
    n: "05",
    title: "Short Sale Approval",
    desc: "Once the lender approves the short sale, we coordinate with your real estate agent to list and sell the property at an approved price. The sale satisfies your mortgage obligation.",
    time: "30–60 days",
    icon: <CheckCircle2 size={32} color="var(--color-green)" />,
  },
  {
    n: "06",
    title: "Closure & Next Steps",
    desc: "After closing, you receive a formal deficiency waiver from your lender, protecting you from future collection. We provide guidance on rebuilding credit and your path forward.",
    time: "At closing",
    icon: <PartyPopper size={32} color="var(--color-green)" />,
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className="section-label">The Process</div>
          <h1 className={styles.heroTitle}>How LenderBridge.ai Works</h1>
          <p className={styles.heroSubtitle}>
            From your first form submission to lender approval, we manage every step so you never have to navigate the process alone.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.timeline}>
            {steps.map((step, i) => (
              <div key={step.n} className={styles.timelineItem}>
                <div className={styles.timelineLeft}>
                  <div className={styles.timelineIcon}>{step.icon}</div>
                  {i < steps.length - 1 && <div className={styles.timelineLine} />}
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.stepNum}>Step {step.n}</div>
                  <h2 className={styles.stepTitle}>{step.title}</h2>
                  <p className={styles.stepDesc}>{step.desc}</p>
                  <div className={styles.stepTime}>
                    <Clock size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> 
                    Typical timeframe: <strong>{step.time}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--gray">
        <div className="container text-center">
          <h2 className="section-title">What You&apos;ll Need to Provide</h2>
          <div className="grid-3" style={{marginTop: '48px', textAlign: 'left'}}>
            {[
              { title: "Property Documents", items: ["Property address", "Mortgage statement", "HOA documents (if applicable)", "Two most recent tax bills"] },
              { title: "Financial Documents", items: ["Last 2 months of bank statements", "Last 2 years of tax returns", "Recent pay stubs or proof of income", "Monthly expense documentation"] },
              { title: "Hardship Documentation", items: ["Hardship letter (we help write this)", "Medical bills, job loss letters, divorce docs", "Any correspondence from your lender", "Existing foreclosure notices"] },
            ].map((group) => (
              <div key={group.title} className="card">
                <h3 style={{marginBottom: '16px', color: 'var(--color-navy)', fontSize: '18px', fontWeight: '700'}}>{group.title}</h3>
                <ul style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                  {group.items.map((item) => (
                    <li key={item} style={{fontSize: '14px', color: 'var(--color-gray-600)', display: 'flex', alignItems: 'flex-start', gap: '8px'}}>
                      <Check size={14} color="var(--color-green)" style={{ marginTop: '3px', flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container text-center">
          <h2 className="section-title" style={{color: 'var(--color-white)'}}>Ready to Begin?</h2>
          <p className="section-subtitle section-subtitle--white mx-auto">
            Don&apos;t wait for foreclosure to knock on your door. Start the process today and take control of your situation.
          </p>
          <div style={{display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '40px'}}>
            <Link href="/intake" className="btn btn--primary btn--lg">Start Your Short Sale — $195</Link>
            <Link href="/contact" className="btn btn--secondary btn--lg">Ask a Question</Link>
          </div>
        </div>
      </section>
    </>
  );
}
