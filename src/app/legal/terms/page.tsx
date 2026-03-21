import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Terms of Service | LenderBridge.ai",
  description: "LenderBridge.ai Terms of Service — please read before using our short sale negotiation services.",
};

export default function TermsPage() {
  const date = "March 20, 2026";
  return (
    <section style={{minHeight: '80vh', background: 'var(--color-gray-50)', padding: '80px 24px'}}>
      <div className="container">
        <div style={{maxWidth: '760px', margin: '0 auto', background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', padding: '56px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-gray-100)'}}>
          <div className="section-label">Legal</div>
          <h1 style={{fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '900', color: 'var(--color-navy)', margin: '16px 0 8px'}}>Terms of Service</h1>
          <p style={{fontSize: '14px', color: 'var(--color-gray-400)', marginBottom: '40px'}}>Last updated: {date}</p>

          {[
            { h: "1. Acceptance of Terms", t: "By accessing our website or using LenderBridge.ai services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services." },
            { h: "2. Services Provided", t: "LenderBridge.ai provides short sale negotiation services. We act as your representative in communicating with your mortgage lender's loss mitigation department. We are not a law firm and do not provide legal advice. You should consult with a qualified attorney for legal questions." },
            { h: "3. Intake Fee", t: "The $195 intake fee is non-refundable once we have initiated contact with your lender on your behalf. If no lender contact has been made within 3 business days of payment, you may request a full refund by contacting support@lenderbridge.ai." },
            { h: "4. No Guarantee of Results", t: "While we work diligently to achieve a short sale approval, we cannot guarantee that your lender will approve the short sale. Lender decisions are made at the lender's sole discretion. Past successful negotiations do not guarantee future results." },
            { h: "5. Client Responsibilities", t: "You agree to provide accurate and complete information in your intake form, respond to our requests for documents in a timely manner, and cooperate fully with our team throughout the negotiation process. Failure to do so may delay or prevent a successful outcome." },
            { h: "6. Confidentiality", t: "We treat all client information as strictly confidential. By submitting your intake form, you authorize us to communicate with your mortgage lender and share necessary information on your behalf solely for the purpose of negotiating your short sale." },
            { h: "7. Limitation of Liability", t: "LenderBridge.ai's liability is limited to the amount of the intake fee paid. We are not liable for any indirect, incidental, or consequential damages arising from the use of our services or any lender decisions." },
            { h: "8. Governing Law", t: "These Terms are governed by the laws of the State of California. Any disputes shall be resolved in the courts of California." },
            { h: "9. Changes to Terms", t: "We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated date. Continued use of our services constitutes acceptance of the revised Terms." },
            { h: "10. Contact", t: "For questions about these Terms, contact us at support@lenderbridge.ai or (800) 555-0191." },
          ].map((s) => (
            <div key={s.h} style={{marginBottom: '28px'}}>
              <h2 style={{fontSize: '18px', fontWeight: '700', color: 'var(--color-navy)', marginBottom: '10px', fontFamily: 'var(--font-heading)'}}>{s.h}</h2>
              <p style={{fontSize: '15px', color: 'var(--color-gray-600)', lineHeight: '1.8'}}>{s.t}</p>
            </div>
          ))}

          <div style={{marginTop: '40px', paddingTop: '28px', borderTop: '1px solid var(--color-gray-200)', display: 'flex', gap: '16px', flexWrap: 'wrap'}}>
            <Link href="/legal/privacy" className="btn btn--outline btn--sm">Privacy Policy</Link>
            <Link href="/contact" className="btn btn--outline btn--sm">Contact Us</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
