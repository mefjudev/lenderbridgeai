import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Handshake, 
  Zap, 
  BarChart3, 
  MessageSquare, 
  ShieldCheck, 
  Banknote,
  Mail,
  Home
} from 'lucide-react';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Agent Referral Program | LenderBridge.ai",
  description: "Real estate agents: refer your short sale listings to LenderBridge.ai. We handle all lender negotiation while you focus on the sale.",
};

const benefits = [
  { icon: <Handshake size={36} color="var(--color-green)" />, title: "We Handle the Lender", desc: "You focus on the listing and the buyer. We manage every step of lender negotiation, from submission to approval." },
  { icon: <Zap size={36} color="var(--color-green)" />, title: "Faster Closings", desc: "Our experienced team keeps lender communication active, reducing delays and accelerating your timeline to close." },
  { icon: <BarChart3 size={36} color="var(--color-green)" />, title: "Grow Your Business", desc: "Accept short sale clients that other agents turn away. We make foreclosure-risk listings viable and profitable for you." },
  { icon: <MessageSquare size={36} color="var(--color-green)" />, title: "Transparent Updates", desc: "We keep you in the loop at every stage — approval status, lender requests, and timeline updates — so you always know where the deal stands." },
  { icon: <ShieldCheck size={36} color="var(--color-green)" />, title: "Protect Your Clients", desc: "We advocate for your sellers to obtain deficiency waivers, protecting them from future lender collections after closing." },
  { icon: <Banknote size={36} color="var(--color-green)" />, title: "Your Commission, Protected", desc: "We work with your negotiated commission structure. Our services don't affect your payday — only the lender negotiation is our responsibility." },
];

const faqs = [
  { q: "How do I refer a client?", a: "Simply direct your client to our intake form at LenderBridge.ai/intake, or contact us directly and we will set everything up together." },
  { q: "What lenders do you work with?", a: "We work with all major lenders including Bank of America, Wells Fargo, Chase, Nationstar, Ocwen, and most regional and community banks." },
  { q: "Who pays the intake fee?", a: "The $195 intake fee is paid by the homeowner/seller. It covers case intake, hardship package preparation, and initial lender outreach." },
  { q: "Can I stay involved in the process?", a: "Absolutely. We welcome agent involvement and provide regular updates. You remain the listing agent; we handle the lender relationship." },
];

export default function AgentsPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className="section-label">For Real Estate Agents</div>
          <h1 className={styles.heroTitle}>
            Turn Short Sale Listings into <span className={styles.accent}>Closed Deals</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Refer your short sale clients to LenderBridge.ai. We handle all lender negotiation and hardship paperwork — you focus on selling the home.
          </p>
          <div className={styles.heroActions}>
            <Link href="/contact" className="btn btn--primary btn--lg">Partner With Us</Link>
            <Link href="/intake" className="btn btn--secondary btn--lg">Refer a Client Now</Link>
          </div>
        </div>
        <div className={styles.heroBg} />
      </section>

      <section className="section section--gray">
        <div className="container text-center">
          <div className="section-label mx-auto">Why Partner With Us</div>
          <h2 className="section-title">Everything You Need to Close Short Sales</h2>
          <p className="section-subtitle mx-auto">We&apos;re your behind-the-scenes negotiation team — invisible to the lender, invaluable to your client.</p>
          <div className="grid-3" style={{marginTop: '56px', textAlign: 'left'}}>
            {benefits.map((b) => (
              <div key={b.title} className="card">
                <div style={{ marginBottom: '16px' }}>{b.icon}</div>
                <h3 style={{fontSize: '18px', fontWeight: '700', color: 'var(--color-navy)', marginBottom: '10px'}}>{b.title}</h3>
                <p style={{fontSize: '14px', color: 'var(--color-gray-600)', lineHeight: '1.7'}}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container">
          <div className="grid-2" style={{alignItems: 'center', gap: '64px'}}>
            <div>
              <div className="section-label">How It Works for Agents</div>
              <h2 className="section-title" style={{color: 'var(--color-white)'}}>Simple Referral Process</h2>
              <div style={{display: 'flex', flexDirection: 'column', gap: '28px', marginTop: '36px'}}>
                {[
                  { n: 1, title: "You Refer the Client", desc: "Send your short sale client to us directly or via our intake link." },
                  { n: 2, title: "We Handle the Lender", desc: "We take over all communication with the loss mitigation department." },
                  { n: 3, title: "Approval & Listing", desc: "Once approved, you list the property and handle the sale as usual." },
                  { n: 4, title: "Deal Closes", desc: "The lender is satisfied, your client is protected, and you earn your commission." },
                ].map((step) => (
                  <div key={step.n} style={{display: 'flex', gap: '20px', alignItems: 'flex-start'}}>
                    <div style={{
                      width: '40px', height: '40px', background: 'var(--color-green)',
                      borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-heading)', fontWeight: '800', color: 'white', fontSize: '18px', flexShrink: 0
                    }}>{step.n}</div>
                    <div>
                      <h4 style={{color: 'var(--color-white)', fontSize: '16px', fontWeight: '700', marginBottom: '4px'}}>{step.title}</h4>
                      <p style={{color: 'rgba(255,255,255,0.65)', fontSize: '14px', lineHeight: '1.6'}}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.agentCard}>
              <div className={styles.agentCardInner}>
                <h3 className={styles.agentCardTitle}>Ready to Partner?</h3>
                <p className={styles.agentCardText}>
                  Contact us to set up an agent referral arrangement, or refer your first client directly through our intake form.
                </p>
                <div style={{display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '28px'}}>
                  <Link href="/contact" className="btn btn--primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Mail size={18} /> Contact Our Team
                  </Link>
                  <Link href="/intake" className="btn btn--outline" style={{color: 'var(--color-white)', borderColor: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>
                    <Home size={18} /> Refer a Client
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center" style={{marginBottom: '48px'}}>
            <div className="section-label mx-auto">Agent FAQs</div>
            <h2 className="section-title">Questions from Agents</h2>
          </div>
          <div style={{maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px'}}>
            {faqs.map((faq) => (
              <div key={faq.q} className="card" style={{padding: '24px'}}>
                <h3 style={{fontSize: '16px', fontWeight: '700', color: 'var(--color-navy)', marginBottom: '10px'}}>{faq.q}</h3>
                <p style={{fontSize: '14px', color: 'var(--color-gray-600)', lineHeight: '1.7'}}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
