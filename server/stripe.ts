import Stripe from 'stripe';

export class StripeService {
  private stripe: Stripe;

  constructor() {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY no está configurada');
    }
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16'
    });
  }

  async createPaymentSession(workshop: string, price: number) {
    try {
      console.log('Creando sesión de Stripe para:', workshop, 'precio:', price);
      console.log('Usando clave de Stripe:', process.env.STRIPE_SECRET_KEY?.substring(0, 8) + '...');
      const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'nok',
            product_data: {
              name: workshop,
            },
            unit_amount: price * 100, // Stripe usa centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `https://www.somosmaas.no/success`,
      cancel_url: `${process.env.REPLIT_APP_URL || `https://${process.env.REPL_SLUG}.replit.app`}/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });

    console.log('Sesión de Stripe creada exitosamente:', session.id);
    return session;
    } catch (error) {
      console.error('Error al crear sesión de Stripe:', error);
      throw new Error(error instanceof Error ? error.message : 'Error al crear la sesión de pago');
    }
  }
}