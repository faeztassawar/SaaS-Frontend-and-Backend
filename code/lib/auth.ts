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
            await prisma.session.deleteMany({
                where: { userId: res.user.id },
            });
            if (res.profile?.email !== res.user.email) {
                console.log("Updating user email in database.");
                await prisma.user.update({
                    where: { id: res.user.id },
                    data: { email: res.profile?.email },
                });
            }

            console.log(res)
            const cookiesData = await cookies();
            const redirectedVia = cookiesData.get("redirected_via")?.value
            const restaurant = cookiesData.get("restaurant")?.value
            const customerCall = cookiesData.get("customer")?.value
            console.log("COOKIES: ", cookiesData)
            cookiesData.delete("redirected_via");
            console.log("Logged in from: ", res.user)
            console.log("REDIRECTED VIAAAAAAAAAAAA: ", redirectedVia)
            console.log("CUSTOMER EXSITS: ", customerCall)
            console.log("RESTAURANT EXSITS: ", restaurant)
            const rest = cookiesData.get("rest_id")?.value

            const owner = await prisma.restaurantOwner.findFirst({ where: { email: res.user.email as string } })
            const customer = await prisma.restaurantCustomer.findFirst({ where: { email: res.user.email as string, restaurant_id: rest } })
            if (redirectedVia === 'owner') {
                console.log("OWNER API IS RUNNING!")
                if (!owner) {
                    const newOwner = await prisma.restaurantOwner.create({
                        data: {
                            userId: res.user.id,
                            email: res.user.email as string,
                            name: res.user.name as string
                        }
                    })
                    console.log("Created new Owner", newOwner)
                    console.log("USER ORIGINAL:", res.user)
                }
                console.log("USER ORIGINAL:", res.user)
                console.log("USER OWNER:", owner)

            } else {
                console.log("CUSTOMER API IS RUNNING!")

                console.log(`RESTAURANT: `, rest)
                if (!customer) {
                    console.log("RESTAURANT AUTH: ", rest)
                    const newCustomer = await prisma.restaurantCustomer.create({
                        data: {
                            userId: res.user.id,
                            email: res?.user.email as string,
                            name: res?.user.name as string,
                            isAdmin: false,
                            isOwner: false,
                            Restaurant: {
                                connect: { restaurant_id: rest },
                            }
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