import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, address, city, state, zip, lender, loanBalance, foreclosureStatus } = body;

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: 19500, // $195.00 in cents
            product_data: {
              name: 'LenderBridge.ai Short Sale Intake Fee',
              description: `Case review and lender negotiation initiation for ${address}, ${city}, ${state} ${zip}`,
              images: [],
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        customerName: `${firstName} ${lastName}`,
        propertyAddress: `${address}, ${city}, ${state} ${zip}`,
        lender,
        loanBalance,
        foreclosureStatus,
      },
      allow_promotion_codes: true,
      success_url: `${baseUrl}/intake/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/intake`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
