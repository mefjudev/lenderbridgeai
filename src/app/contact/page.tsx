'use client';
import { useState, FormEvent } from 'react';
import { 
  Mail, 
  Phone, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Send 
} from 'lucide-react';
import styles from './page.module.css';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = e.currentTarget;
    const data = {
      firstName: (form.querySelector('#first-name') as HTMLInputElement).value,
      lastName: (form.querySelector('#last-name') as HTMLInputElement).value,
      email: (form.querySelector('#contact-email') as HTMLInputElement).value,
      phone: (form.querySelector('#contact-phone') as HTMLInputElement).value,
      subject: (form.querySelector('#contact-subject') as HTMLSelectElement).value,
      message: (form.querySelector('#contact-message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Submission failed');

      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className="section-label">Get In Touch</div>
          <h1 className={styles.heroTitle}>About LenderBridge.ai</h1>
          <p className={styles.heroSubtitle}>
            We&apos;re a specialized short sale negotiation firm committed to helping homeowners navigate one of the most stressful financial situations they&apos;ll ever face.
          </p>
        </div>
      </section>

      <section className="section section--gray">
        <div className="container">
          <div className="grid-2" style={{gap: '64px', alignItems: 'flex-start'}}>
            <div>
              <div className="section-label" style={{marginBottom: '24px'}}>Our Mission</div>
              <h2 style={{fontSize: '32px', fontWeight: '800', color: 'var(--color-navy)', marginBottom: '20px', lineHeight: '1.2', fontFamily: 'var(--font-heading)'}}>
                Helping Homeowners When It Matters Most
              </h2>
              <p style={{fontSize: '16px', color: 'var(--color-gray-600)', lineHeight: '1.8', marginBottom: '20px'}}>
                At LenderBridge.ai, we understand that facing foreclosure is overwhelming. Our team of experienced negotiators works tirelessly to communicate with lenders on your behalf, advocating for a resolution that protects your financial future.
              </p>
              <p style={{fontSize: '16px', color: 'var(--color-gray-600)', lineHeight: '1.8', marginBottom: '32px'}}>
                We&apos;ve helped homeowners across the country navigate the short sale process — reducing stress, protecting credit, and providing a clear path forward.
              </p>
              <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                {[
                  { icon: <Mail size={20} color="var(--color-green)" />, label: "Email", val: "support@lenderbridge.ai" },
                  { icon: <Clock size={20} color="var(--color-green)" />, label: "Hours", val: "Mon–Fri: 8am–6pm PST" },
                  { icon: <MapPin size={20} color="var(--color-green)" />, label: "Service Area", val: "All 50 States" },
                ].map((c) => (
                  <div key={c.label} style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                    <div style={{
                      width: '44px', height: '44px', background: 'rgba(16,185,129,0.1)',
                      borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0
                    }}>{c.icon}</div>
                    <div>
                      <div style={{fontSize: '12px', fontWeight: '600', color: 'var(--color-gray-400)', textTransform: 'uppercase', letterSpacing: '0.08em'}}>{c.label}</div>
                      <div style={{fontSize: '15px', fontWeight: '600', color: 'var(--color-navy)'}}>{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.formCard}>
              {submitted ? (
                <div className={styles.successMsg}>
                  <CheckCircle2 size={48} color="var(--color-green)" style={{ marginBottom: '16px' }} />
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. Our team will respond within 1 business day.</p>
                </div>
              ) : (
                <>
                  <h2 className={styles.formTitle}>Send Us a Message</h2>
                  <p className={styles.formSubtitle}>Have a question? We typically respond within a few hours.</p>
                  {error && (
                    <div style={{ padding: '12px', background: '#FEE2E2', color: '#DC2626', borderRadius: '8px', fontSize: '14px', marginBottom: '16px' }}>
                      {error}
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className="grid-2" style={{gap: '16px'}}>
                      <div className="form-group">
                        <label className="form-label" htmlFor="first-name">First Name</label>
                        <input id="first-name" type="text" className="form-input" placeholder="John" required />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="last-name">Last Name</label>
                        <input id="last-name" type="text" className="form-input" placeholder="Smith" required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-email">Email Address</label>
                      <input id="contact-email" type="email" className="form-input" placeholder="john@email.com" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-phone">Phone Number</label>
                      <input id="contact-phone" type="tel" className="form-input" placeholder="(555) 000-0000" />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-subject">Subject</label>
                      <select id="contact-subject" className="form-select">
                        <option>General Inquiry</option>
                        <option>Short Sale Question</option>
                        <option>Agent Referral Partnership</option>
                        <option>Billing / Payment</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-message">Message</label>
                      <textarea id="contact-message" className="form-textarea" placeholder="Tell us about your situation..." required />
                    </div>
                    <button type="submit" className="btn btn--primary" style={{width: '100%', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}} disabled={loading}>
                      {loading ? 'Sending...' : <>Send Message <Send size={18} /></>}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
