'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Home, 
  Landmark, 
  User, 
  Lock, 
  Check, 
  ArrowRight, 
  ClipboardList 
} from 'lucide-react';
import styles from './page.module.css';

type Step = 1 | 2;

const LENDERS = [
  "Bank of America", "Wells Fargo", "Chase", "Citi Mortgage", "Nationstar / Mr. Cooper",
  "Ocwen / PHH Mortgage", "Select Portfolio Servicing", "Carrington Mortgage",
  "NewRez / Shellpoint", "US Bank", "PNC Mortgage", "LoanDepot",
  "Freedom Mortgage", "Cenlar", "Other"
];

const FORECLOSURE_STATUS = [
  "No foreclosure started yet",
  "Missed 1–3 payments",
  "Received default notice / NOD",
  "Foreclosure sale scheduled",
  "Other",
];

type FormData = {
  address: string;
  city: string;
  state: string;
  zip: string;
  lender: string;
  loanBalance: string;
  foreclosureStatus: string;
  foreclosureDate: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

const INITIAL_FORM: FormData = {
  address: '', city: '', state: '', zip: '', lender: '', loanBalance: '',
  foreclosureStatus: '', foreclosureDate: '', firstName: '', lastName: '',
  email: '', phone: '', message: '',
};

export default function IntakePage() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [key]: e.target.value }));
    setErrors(er => ({ ...er, [key]: '' }));
  };

  const validateStep1 = () => {
    const e: Partial<FormData> = {};
    if (!form.address.trim()) e.address = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.state.trim()) e.state = 'Required';
    if (!form.zip.trim()) e.zip = 'Required';
    if (!form.lender) e.lender = 'Required';
    if (!form.loanBalance.trim()) e.loanBalance = 'Required';
    if (!form.foreclosureStatus) e.foreclosureStatus = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Partial<FormData> = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = (e: FormEvent) => {
    e.preventDefault();
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Something went wrong. Please try again.');
        setLoading(false);
      }
    } catch {
      alert('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className="section-label">Start Your Short Sale</div>
          <h1 className={styles.heroTitle}>Short Sale Intake Form</h1>
          <p className={styles.heroSubtitle}>Complete the form below. After submission, you&apos;ll be directed to a secure $195 payment page to begin your case.</p>
        </div>
      </section>

      <section className="section section--gray">
        <div className="container">
          <div className={styles.formWrapper}>
            {/* Progress bar */}
            <div className="progress-steps">
              <div className={`progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`}>
                <div className="progress-dot">{step > 1 ? <Check size={14} /> : '1'}</div>
                <span>Property Info</span>
              </div>
              <div className={`progress-line ${step > 1 ? 'done' : ''}`} />
              <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
                <div className="progress-dot">2</div>
                <span>Your Details</span>
              </div>
              <div className="progress-line" />
              <div className="progress-step">
                <div className="progress-dot">3</div>
                <span>Payment</span>
              </div>
            </div>

            {step === 1 && (
              <form onSubmit={handleNext} className={styles.form}>
                <div className={styles.formSection}>
                  <h2 className={styles.sectionTitle}>
                    <Home size={22} style={{ marginRight: '10px', verticalAlign: 'middle' }} color="var(--color-green)" /> 
                    Property Information
                  </h2>
                  <div className="form-group">
                    <label className="form-label" htmlFor="address">Property Street Address *</label>
                    <input id="address" type="text" className="form-input" value={form.address} onChange={set('address')} placeholder="123 Main Street" />
                    {errors.address && <span className="form-error">{errors.address}</span>}
                  </div>
                  <div className="grid-3" style={{gap: '16px'}}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="city">City *</label>
                      <input id="city" type="text" className="form-input" value={form.city} onChange={set('city')} placeholder="Los Angeles" />
                      {errors.city && <span className="form-error">{errors.city}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="state">State *</label>
                      <input id="state" type="text" className="form-input" value={form.state} onChange={set('state')} placeholder="CA" maxLength={2} />
                      {errors.state && <span className="form-error">{errors.state}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="zip">ZIP Code *</label>
                      <input id="zip" type="text" className="form-input" value={form.zip} onChange={set('zip')} placeholder="90001" />
                      {errors.zip && <span className="form-error">{errors.zip}</span>}
                    </div>
                  </div>
                </div>

                <div className={styles.formSection}>
                  <h2 className={styles.sectionTitle}>
                    <Landmark size={22} style={{ marginRight: '10px', verticalAlign: 'middle' }} color="var(--color-green)" /> 
                    Mortgage Information
                  </h2>
                  <div className="grid-2" style={{gap: '16px'}}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="lender">Mortgage Lender / Servicer *</label>
                      <select id="lender" className="form-select" value={form.lender} onChange={set('lender')}>
                        <option value="">Select your lender...</option>
                        {LENDERS.map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                      {errors.lender && <span className="form-error">{errors.lender}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="loanBalance">Estimated Loan Balance *</label>
                      <input id="loanBalance" type="text" className="form-input" value={form.loanBalance} onChange={set('loanBalance')} placeholder="e.g. $320,000" />
                      {errors.loanBalance && <span className="form-error">{errors.loanBalance}</span>}
                    </div>
                  </div>
                  <div className="grid-2" style={{gap: '16px'}}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="foreclosureStatus">Foreclosure Status *</label>
                      <select id="foreclosureStatus" className="form-select" value={form.foreclosureStatus} onChange={set('foreclosureStatus')}>
                        <option value="">Select status...</option>
                        {FORECLOSURE_STATUS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.foreclosureStatus && <span className="form-error">{errors.foreclosureStatus}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="foreclosureDate">Foreclosure Sale Date (if known)</label>
                      <input id="foreclosureDate" type="date" className="form-input" value={form.foreclosureDate} onChange={set('foreclosureDate')} />
                    </div>
                  </div>
                </div>

                <div className={styles.nextAction}>
                  <button type="submit" className="btn btn--primary btn--lg" style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>
                    Continue to Your Details <ArrowRight size={18} />
                  </button>
                  <p className={styles.secureNote}>
                    <Lock size={12} style={{ marginRight: '4px' }} /> 
                    Your information is encrypted and 100% confidential
                  </p>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formSection}>
                  <h2 className={styles.sectionTitle}>
                    <User size={22} style={{ marginRight: '10px', verticalAlign: 'middle' }} color="var(--color-green)" /> 
                    Your Contact Information
                  </h2>
                  <div className="grid-2" style={{gap: '16px'}}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="firstName">First Name *</label>
                      <input id="firstName" type="text" className="form-input" value={form.firstName} onChange={set('firstName')} placeholder="John" />
                      {errors.firstName && <span className="form-error">{errors.firstName}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="lastName">Last Name *</label>
                      <input id="lastName" type="text" className="form-input" value={form.lastName} onChange={set('lastName')} placeholder="Smith" />
                      {errors.lastName && <span className="form-error">{errors.lastName}</span>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address *</label>
                    <input id="email" type="email" className="form-input" value={form.email} onChange={set('email')} placeholder="john@email.com" />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone Number *</label>
                    <input id="phone" type="tel" className="form-input" value={form.phone} onChange={set('phone')} placeholder="(555) 000-0000" />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="message">Additional Notes (optional)</label>
                    <textarea id="message" className="form-textarea" value={form.message} onChange={set('message')} placeholder="Tell us anything else about your situation that might help us..." style={{minHeight: '100px'}} />
                  </div>
                </div>

                <div className={styles.summaryBox}>
                  <h3 className={styles.summaryTitle}>
                    <ClipboardList size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> 
                    Property Summary
                  </h3>
                  <p className={styles.summaryText}>{form.address}, {form.city}, {form.state} {form.zip}</p>
                  <p className={styles.summaryText}>Lender: {form.lender} · Balance: {form.loanBalance}</p>
                  <p className={styles.summaryText}>Status: {form.foreclosureStatus}</p>
                  <button type="button" onClick={() => setStep(1)} className={styles.editBtn}>Edit Property Info</button>
                </div>

                <div className={styles.paymentBox}>
                  <div className={styles.paymentInfo}>
                    <div className={styles.paymentAmount}>$195</div>
                    <div>
                      <div className={styles.paymentLabel}>Intake Fee — Secure Stripe Checkout</div>
                      <div className={styles.paymentSub}>Covers case review, hardship package prep, and initial lender contact</div>
                    </div>
                  </div>
                </div>

                <div style={{display: 'flex', gap: '12px'}}>
                  <button type="button" onClick={() => setStep(1)} className="btn btn--outline" style={{flex: '0 0 auto'}}>
                    ← Back
                  </button>
                  <button type="submit" className="btn btn--primary btn--lg" style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}} disabled={loading}>
                    {loading ? '⏳ Redirecting...' : <><Lock size={18} /> Pay $195 & Begin My Short Sale</>}
                  </button>
                </div>
                <p className={styles.secureNote} style={{textAlign: 'center', marginTop: '8px'}}>
                  <Lock size={12} style={{ marginRight: '4px' }} /> 
                  Secure payment powered by Stripe. We never store your card details.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
