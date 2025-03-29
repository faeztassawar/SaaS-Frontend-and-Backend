import { getServerSession } from "next-auth";
import Stripe from "stripe";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import prisma from "./connect";

export const stripe = new Stripe(String(process.env.STRIPE_SECRET), {
    apiVersion: '2025-01-27.acacia'
});

export async function hasSubscription(): Promise<boolean> {
    try {
        const session = await getServerSession(authOptions);

        if (session) {
            const owner = await prisma.restaurantOwner.findFirst({
                where: { email: session.user?.email }
            });

            if (!owner?.stripe_customer_id) return false;

            const subscriptions = await stripe.subscriptions.list({
                customer: owner.stripe_customer_id
            });

            return subscriptions.data.length > 0;
        }

        return false;
    } catch (error) {
        console.error("Error checking subscription:", error);
        return false;
    }
}

export async function createCheckoutLink(customer: string): Promise<string | undefined> {
    try {
        const checkout = await stripe.checkout.sessions.create({
            success_url: `${process.env.NEXTAUTH_URL}/details?success=true`,
            cancel_url: `${process.env.NEXTAUTH_URL}/StripeDashboard?canceled=true`,
            customer: customer,
            line_items: [
                {
                    price: 'price_1R702nKNed87YjIOBZOy6Tp0',
                    quantity: 1
                }
            ],
            mode: "subscription"
        });

        return checkout.url as string;
    } catch (error) {
        console.error("Error creating checkout link:", error);
        return undefined;
    }
}

export async function generateCustomerPortalLink(customerId: string): Promise<string | undefined> {
    try {
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${process.env.NEXTAUTH_URL}/StripeDashboard`
        });

        return portalSession.url;
    } catch (error) {
        console.error("Error generating customer portal link:", error);
        return undefined;
    }
}

export async function createCustomerIfNull(): Promise<string | undefined> {
    try {
        const session = await getServerSession(authOptions);

        if (session) {
            const owner = await prisma.restaurantOwner.findFirst({
                where: { email: session.user?.email }
            });

            if (!owner) return undefined;

            if (!owner.stripe_customer_id) {
                const customer = await stripe.customers.create({
                    email: owner.email
                });

                await prisma.restaurantOwner.update({
                    where: { id: owner.id },
                    data: { stripe_customer_id: customer.id }
                });

                return customer.id;
            }

            return owner.stripe_customer_id;
        }

        return undefined;
    } catch (error) {
        console.error("Error creating Stripe customer:", error);
        return undefined;
    }
}