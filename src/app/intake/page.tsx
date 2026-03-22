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
  address: string; city: string; state: string; zip: string;
  lender: string; otherMortgage1: string; mortgageLoanNumber: string; loanBalance: string;
  hasSecondMortgage: string; secondLender: string; otherMortgage2: string; secondMortgageLoanNumber: string;
  foreclosureStatus: string; foreclosureDate: string;
  realtorName: string; realtorPhone: string; realtorEmail: string;
  firstName: string; middleName: string; lastName: string; email: string; phone: string; ssn: string;
  hasCoSeller: string; coFirstName: string; coLastName: string; coEmail: string; coPhone: string; coSsn: string;
  message: string;
};

const INITIAL_FORM: FormData = {
  address: '', city: '', state: '', zip: '',
  lender: '', otherMortgage1: '', mortgageLoanNumber: '', loanBalance: '',
  hasSecondMortgage: 'no', secondLender: '', otherMortgage2: '', secondMortgageLoanNumber: '',
  foreclosureStatus: '', foreclosureDate: '',
  realtorName: '', realtorPhone: '', realtorEmail: '',
  firstName: '', middleName: '', lastName: '', email: '', phone: '', ssn: '',
  hasCoSeller: 'no', coFirstName: '', coLastName: '', coEmail: '', coPhone: '', coSsn: '',
  message: '',
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
    if (form.lender === 'Other' && !form.otherMortgage1.trim()) e.otherMortgage1 = 'Required';
    if (!form.mortgageLoanNumber.trim()) e.mortgageLoanNumber = 'Required';
    if (!form.loanBalance.trim()) e.loanBalance = 'Required';
    if (form.hasSecondMortgage === 'yes') {
      if (!form.secondLender) e.secondLender = 'Required';
      if (form.secondLender === 'Other' && !form.otherMortgage2.trim()) e.otherMortgage2 = 'Required';
      if (!form.secondMortgageLoanNumber.trim()) e.secondMortgageLoanNumber = 'Required';
    }
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
    if (!form.ssn.trim()) e.ssn = 'Required';
    if (form.hasCoSeller === 'yes') {
      if (!form.coFirstName.trim()) e.coFirstName = 'Required';
      if (!form.coLastName.trim()) e.coLastName = 'Required';
      if (!form.coEmail.trim() || !/\S+@\S+\.\S+/.test(form.coEmail)) e.coEmail = 'Valid email required';
      if (!form.coPhone.trim()) e.coPhone = 'Required';
      if (!form.coSsn.trim()) e.coSsn = 'Required';
    }
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
                      <label className="form-label" htmlFor="lender">1st Mortgage Company *</label>
                      <select id="lender" className="form-select" value={form.lender} onChange={set('lender')}>
                        <option value="">Select your lender...</option>
                        {LENDERS.map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                      {errors.lender && <span className="form-error">{errors.lender}</span>}
                    </div>
                    {form.lender === 'Other' && (
                      <div className="form-group">
                        <label className="form-label" htmlFor="otherMortgage1">Other Mortgage 1 *</label>
                        <input id="otherMortgage1" type="text" className="form-input" value={form.otherMortgage1} onChange={set('otherMortgage1')} placeholder="Name of lender" />
                        {errors.otherMortgage1 && <span className="form-error">{errors.otherMortgage1}</span>}
                      </div>
                    )}
                  </div>
                  <div className="grid-2" style={{gap: '16px'}}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="mortgageLoanNumber">Mortgage Loan Number *</label>
                      <input id="mortgageLoanNumber" type="text" className="form-input" value={form.mortgageLoanNumber} onChange={set('mortgageLoanNumber')} placeholder="e.g. 123456789" />
                      {errors.mortgageLoanNumber && <span className="form-error">{errors.mortgageLoanNumber}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="loanBalance">Estimated Loan Balance *</label>
                      <input id="loanBalance" type="text" className="form-input" value={form.loanBalance} onChange={set('loanBalance')} placeholder="e.g. $320,000" />
                      {errors.loanBalance && <span className="form-error">{errors.loanBalance}</span>}
                    </div>
                  </div>

                  <div className="form-group" style={{marginTop: '16px'}}>
                    <label className="form-label">Is There A Second Mortgage?</label>
                    <div style={{display: 'flex', gap: '16px'}}>
                      <label style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <input type="radio" name="hasSecondMortgage" value="yes" checked={form.hasSecondMortgage === 'yes'} onChange={set('hasSecondMortgage')} /> Yes
                      </label>
                      <label style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <input type="radio" name="hasSecondMortgage" value="no" checked={form.hasSecondMortgage === 'no'} onChange={set('hasSecondMortgage')} /> No
                      </label>
                    </div>
                  </div>

                  {form.hasSecondMortgage === 'yes' && (
                    <div style={{background: 'rgba(0,0,0,0.02)', padding: '16px', borderRadius: '8px', marginTop: '8px', border: '1px solid rgba(0,0,0,0.05)'}}>
                      <div className="grid-2" style={{gap: '16px'}}>
                        <div className="form-group">
                          <label className="form-label" htmlFor="secondLender">2nd Mortgage Company *</label>
                          <select id="secondLender" className="form-select" value={form.secondLender} onChange={set('secondLender')}>
                            <option value="">Select your lender...</option>
                            {LENDERS.map(l => <option key={`2nd-${l}`} value={l}>{l}</option>)}
                          </select>
                          {errors.secondLender && <span className="form-error">{errors.secondLender}</span>}
                        </div>
                        {form.secondLender === 'Other' && (
                          <div className="form-group">
                            <label className="form-label" htmlFor="otherMortgage2">Other Mortgage 2 *</label>
                            <input id="otherMortgage2" type="text" className="form-input" value={form.otherMortgage2} onChange={set('otherMortgage2')} placeholder="Name of 2nd lender" />
                            {errors.otherMortgage2 && <span className="form-error">{errors.otherMortgage2}</span>}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="secondMortgageLoanNumber">2nd Mortgage Loan Number *</label>
                        <input id="secondMortgageLoanNumber" type="text" className="form-input" value={form.secondMortgageLoanNumber} onChange={set('secondMortgageLoanNumber')} placeholder="e.g. 987654321" />
                        {errors.secondMortgageLoanNumber && <span className="form-error">{errors.secondMortgageLoanNumber}</span>}
                      </div>
                    </div>
                  )}

                  <div className="grid-2" style={{gap: '16px', marginTop: '16px'}}>
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

                <div className={styles.formSection}>
                  <h2 className={styles.sectionTitle}>
                    <User size={22} style={{ marginRight: '10px', verticalAlign: 'middle' }} color="var(--color-green)" /> 
                    Realtor Information (Optional)
                  </h2>
                  <div className="grid-3" style={{gap: '16px'}}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="realtorName">Realtor Name</label>
                      <input id="realtorName" type="text" className="form-input" value={form.realtorName} onChange={set('realtorName')} placeholder="Jane Doe" />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="realtorPhone">Realtor Phone</label>
                      <input id="realtorPhone" type="tel" className="form-input" value={form.realtorPhone} onChange={set('realtorPhone')} placeholder="(555) 000-0000" />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="realtorEmail">Realtor Email</label>
                      <input id="realtorEmail" type="email" className="form-input" value={form.realtorEmail} onChange={set('realtorEmail')} placeholder="jane@realty.com" />
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
                    Sellers Information
                  </h2>
                  <h3 style={{fontSize: '16px', fontWeight: '600', marginBottom: '16px'}}>Seller 1</h3>
                  <div className="grid-3" style={{gap: '16px'}}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="firstName">First Name *</label>
                      <input id="firstName" type="text" className="form-input" value={form.firstName} onChange={set('firstName')} placeholder="John" />
                      {errors.firstName && <span className="form-error">{errors.firstName}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="middleName">Middle Name</label>
                      <input id="middleName" type="text" className="form-input" value={form.middleName} onChange={set('middleName')} placeholder="A." />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="lastName">Last Name *</label>
                      <input id="lastName" type="text" className="form-input" value={form.lastName} onChange={set('lastName')} placeholder="Smith" />
                      {errors.lastName && <span className="form-error">{errors.lastName}</span>}
                    </div>
                  </div>
                  <div className="grid-3" style={{gap: '16px'}}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="phone">Phone Number *</label>
                      <input id="phone" type="tel" className="form-input" value={form.phone} onChange={set('phone')} placeholder="(555) 000-0000" />
                      {errors.phone && <span className="form-error">{errors.phone}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">Email Address *</label>
                      <input id="email" type="email" className="form-input" value={form.email} onChange={set('email')} placeholder="john@email.com" />
                      {errors.email && <span className="form-error">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="ssn">Last 4 of SSN *</label>
                      <input id="ssn" type="text" className="form-input" value={form.ssn} onChange={set('ssn')} placeholder="1234" maxLength={4} />
                      {errors.ssn && <span className="form-error">{errors.ssn}</span>}
                    </div>
                  </div>

                  <div className="form-group" style={{marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(0,0,0,0.1)'}}>
                    <label className="form-label" style={{fontSize: '16px', fontWeight: '600'}}>Is there a Seller 2 (Co-Seller)?</label>
                    <div style={{display: 'flex', gap: '16px', marginTop: '8px'}}>
                      <label style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <input type="radio" name="hasCoSeller" value="yes" checked={form.hasCoSeller === 'yes'} onChange={set('hasCoSeller')} /> Yes
                      </label>
                      <label style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <input type="radio" name="hasCoSeller" value="no" checked={form.hasCoSeller === 'no'} onChange={set('hasCoSeller')} /> No
                      </label>
                    </div>
                  </div>

                  {form.hasCoSeller === 'yes' && (
                    <div style={{background: 'rgba(0,0,0,0.02)', padding: '16px', borderRadius: '8px', marginTop: '16px', border: '1px solid rgba(0,0,0,0.05)'}}>
                      <h3 style={{fontSize: '16px', fontWeight: '600', marginBottom: '16px'}}>Seller 2</h3>
                      <div className="grid-2" style={{gap: '16px'}}>
                        <div className="form-group">
                          <label className="form-label" htmlFor="coFirstName">First Name *</label>
                          <input id="coFirstName" type="text" className="form-input" value={form.coFirstName} onChange={set('coFirstName')} placeholder="Jane" />
                          {errors.coFirstName && <span className="form-error">{errors.coFirstName}</span>}
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="coLastName">Last Name *</label>
                          <input id="coLastName" type="text" className="form-input" value={form.coLastName} onChange={set('coLastName')} placeholder="Smith" />
                          {errors.coLastName && <span className="form-error">{errors.coLastName}</span>}
                        </div>
                      </div>
                      <div className="grid-3" style={{gap: '16px'}}>
                        <div className="form-group">
                          <label className="form-label" htmlFor="coPhone">Phone Number *</label>
                          <input id="coPhone" type="tel" className="form-input" value={form.coPhone} onChange={set('coPhone')} placeholder="(555) 000-0000" />
                          {errors.coPhone && <span className="form-error">{errors.coPhone}</span>}
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="coEmail">Email Address *</label>
                          <input id="coEmail" type="email" className="form-input" value={form.coEmail} onChange={set('coEmail')} placeholder="jane@email.com" />
                          {errors.coEmail && <span className="form-error">{errors.coEmail}</span>}
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="coSsn">Last 4 of SSN *</label>
                          <input id="coSsn" type="text" className="form-input" value={form.coSsn} onChange={set('coSsn')} placeholder="5678" maxLength={4} />
                          {errors.coSsn && <span className="form-error">{errors.coSsn}</span>}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="form-group" style={{marginTop: '24px'}}>
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
