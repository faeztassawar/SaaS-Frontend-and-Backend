import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Stripe from "stripe";
import {
  createCheckoutLink,
  createCustomerIfNull,
  generateCustomerPortalLink,
  hasSubscription,
} from "@/lib/billing";
import prisma from "@/lib/connect";
import Link from "next/link";

export const stripe = new Stripe(String(process.env.STRIPE_SECRET), {
  apiVersion: "2025-01-27.acacia",
});

export default async function Page() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return <p className="text-center text-red-500">Unauthorized access</p>;
    }

    await createCustomerIfNull();

    const owner = await prisma.restaurantOwner.findFirst({
      where: { email: session.user.email },
    });

    if (!owner?.stripe_customer_id) {
      return (
        <p className="text-center text-red-500">Billing setup not found.</p>
      );
    }

    const manageBillingUrl = await generateCustomerPortalLink(
      owner.stripe_customer_id
    );

    const hasSub = await hasSubscription();
    const checkout_link = await createCheckoutLink(
      "" + owner?.stripe_customer_id
    );

    return (
      <div className="max-w-4xl m-auto w-full px-4">
        <div className="flex flex-col">
          <p className="text-2xl font-medium">Welcome, {session.user.name}</p>
          {manageBillingUrl ? (
            <div className="py-4">
              <Link
                href={manageBillingUrl}
                className="p-6 rounded-md border-zinc-400 border shadow-sm font-medium flex items-center gap-2"
              >
                Manage Billing
              </Link>
              <div>
                {hasSub ? (
                  <div className="p-6 rounded-md border-emerald-400 border shadow-sm font-medium">
                    Subscribed
                  </div>
                ) : (
                  <div className="p-6 rounded-md border-zinc-400 border shadow-sm font-medium flex items-center gap-2">
                    Free Plan
                    <Link
                      className="bg-black text-white rounded-md px-2 py-1 ml-auto"
                      href={"" + checkout_link}
                    >
                      Upgrade
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-red-500">Failed to generate billing link.</p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading billing page:", error);
    return (
      <p className="text-center text-red-500">
        An error occurred. Please try again later.
      </p>
    );
  }
}
