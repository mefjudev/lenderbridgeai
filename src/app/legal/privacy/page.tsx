import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Privacy Policy | LenderBridge.ai",
  description: "LenderBridge.ai Privacy Policy — how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  const date = "March 20, 2026";
  return (
    <section className={styles.page}>
      <div className="container">
        <div className={styles.inner}>
          <div className="section-label">Legal</div>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.updated}>Last updated: {date}</p>

          {[
            {
              heading: "1. Information We Collect",
              text: "We collect information you provide when filling out our intake form, including your name, email address, phone number, property address, mortgage lender information, and estimated loan balance. We also collect payment information processed by Stripe (we do not store card numbers directly).",
            },
            {
              heading: "2. How We Use Your Information",
              text: "Your information is used solely to provide our short sale negotiation services, communicate with your mortgage lender on your behalf, process your payment, and send you case updates. We do not sell your personal information to third parties.",
            },
            {
              heading: "3. Data Sharing",
              text: "We may share your information with your mortgage lender or servicer as necessary to negotiate your short sale. We use Stripe as our payment processor — their privacy policy applies to payment data. We may engage third-party service providers under strict confidentiality obligations.",
            },
            {
              heading: "4. Data Security",
              text: "We implement industry-standard security measures to protect your personal and financial information. All data transmissions are encrypted via TLS/SSL. We limit access to your information to authorized personnel only.",
            },
            {
              heading: "5. Cookies",
              text: "Our website may use cookies to improve your browsing experience and analyze site traffic. You can disable cookies in your browser settings without affecting your ability to use our core services.",
            },
            {
              heading: "6. Your Rights",
              text: "You may request access to, correction of, or deletion of your personal data by contacting us at support@lenderbridge.ai. We will respond to verified requests within 30 days.",
            },
            {
              heading: "7. Contact Us",
              text: "If you have questions about this Privacy Policy, please email us at support@lenderbridge.ai or call (800) 555-0191.",
            },
          ].map((s) => (
            <div key={s.heading} className={styles.section}>
              <h2 className={styles.heading}>{s.heading}</h2>
              <p className={styles.text}>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
