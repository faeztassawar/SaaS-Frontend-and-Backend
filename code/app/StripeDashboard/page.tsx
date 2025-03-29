import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import {
  createCheckoutLink,
  createCustomerIfNull,
  generateCustomerPortalLink,
  hasSubscription,
} from "@/lib/billing";
import prisma from "@/lib/connect";
import Link from "next/link";
import { FaCreditCard, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import NavBar from "../components/NavBar";

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
      <div className="w-full overflow-x-hidden">
        <NavBar />
        <div className="min-h-screen flex flex-col items-center justify-center bg-[linear-gradient(to_bottom,#000,#200d42_34%,#4f21a1_65%,#a46edb_100%)] text-white px-6">
          {/* Header */}
          <h1 className="text-4xl font-extrabold text-center mt-8">
            Stripe Billing Dashboard
          </h1>
          <p className="text-gray-300 text-center mt-2">
            Manage your subscription and billing details easily.
          </p>

          {/* Billing Overview Card */}
          <div className="mt-10 bg-white/10 backdrop-blur-lg border border-gray-500/30 shadow-xl rounded-2xl p-8 max-w-lg w-full text-center">
            <h2 className="text-xl font-semibold">
              Welcome, {session.user.name}
            </h2>

            <div className="flex items-center justify-center gap-4 mt-4">
              <FaCreditCard className="text-4xl text-yellow-300" />
              {hasSub ? (
                <div className="flex flex-col items-center gap-2 bg-green-700/20 text-green-400 px-3 py-2 rounded-lg shadow-md">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle />
                    <span className="font-medium">Active Subscription</span>
                  </div>
                  <p className="text-sm text-yellow-300 mt-1">
                    🎉 Congratulations! Go to your profile to access your
                    restaurant.
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-red-700/20 text-red-400 px-3 py-2 rounded-lg shadow-md">
                  <FaTimesCircle />
                  <span className="font-medium">Free Plan</span>
                </div>
              )}
            </div>

            {/* Manage Billing & Upgrade Options */}
            <div className="flex flex-col gap-4 mt-6">
              {manageBillingUrl ? (
                <Link
                  href={manageBillingUrl}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg px-6 py-3 transition-all"
                >
                  Manage Billing
                </Link>
              ) : (
                <p className="text-red-400">Failed to generate billing link.</p>
              )}

              {!hasSub && (
                <Link
                  href={"" + checkout_link}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg px-6 py-3 transition-all"
                >
                  Upgrade Plan
                </Link>
              )}
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 text-gray-400 text-sm">
            Powered by Stripe. Secure payments guaranteed.
          </footer>
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
