import GoogleProvider from "next-auth/providers/google";
import prisma from "./connect";
import { getServerSession, NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { useRouter } from "next/router";
import { cookies } from 'next/headers'


const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            // authorization: {
            //     params: {
            //         prompt: "consent",
            //         access_type: "offline",
            //         response_type: "code",
            //         userType: "user" || "admin",
            //     },
            // },
        }),
    ],
    callbacks: {
        async signIn(res) {
            console.log(res)
            const cookiesData = await cookies();
            const redirectedVia = cookiesData.get("redirected_via")?.value
            cookiesData.delete("redirected_via");

            const owner = await prisma.restaurantOwner.findFirst({ where: { userId: res.user.id } })
            const customer = await prisma.restaurantCustomer.findFirst({ where: { userId: res.user.id } })
            if (redirectedVia === 'owner') {
                if (!owner) {
                    const newOwner = await prisma.restaurantOwner.create({
                        data: {
                            userId: res.user.id,
                            restaurant_id: '',
                            email: res.user.email
                        }
                    })
                    console.log("Created new Owner", newOwner)
                    console.log("USER ORIGINAL:", res.user)
                }
                console.log("USER ORIGINAL:", res.user)
                console.log("USER OWNER:", owner)

            } else if (redirectedVia === 'customer') {
                if (!customer) {
                    const rest = cookiesData.get("rest_id")?.value
                    const newCustomer = await prisma.restaurantCustomer.create({
                        data: {
                            userId: res.user.id,
                            restaurant_id: rest ?? "",
                            email: res.user.email
                        }
                    })
                    cookiesData.delete("rest_id");
                    console.log("Created new Customer", newCustomer)
                    console.log("USER ORIGINAL:", res.user)
                }
                console.log("USER ORIGINAL:", res.user)
                console.log("USER CUSTOMER:", customer)
            }

            return true;

            // } else if (redirectedVia === 'customer') {
            //     if (!customer) {
            //         const newOwner = await prisma.restaurantCustomer.create({
            //             data: {
            //                 userId: res.user.id,
            //                 restaurant_id: '',
            //             }
            //         })
            //         res.user.restaurantCustomer = newOwner
            //         res.user.restaurantCustomerId = newOwner.id
            //         console.log("Created new Customer", newOwner)
            //         console.log("USER ORIGINAL:", res.user)
            //     } else {
            //         console.log("USER ORIGINAL:", res.user)
            //         console.log("USER Customer:", owner)
            //     }
            //     return true;

            // }
        },

        async redirect(res) {
            console.log(res)
            return res.url
        }
    }
};
export { authOptions };

export const getAuthSession = () => getServerSession(authOptions)