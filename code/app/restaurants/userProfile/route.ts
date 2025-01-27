import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/connect"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const userEmail = session.user?.email;

  if (!userEmail) {
    return res.status(400).json({ message: "Email not found in session" });
  }

  try {
    // Find the user (RestaurantCustomer) by email
    const user = await prisma.restaurantCustomer.findUnique({
      where: { email: userEmail },
      include: {
       // Reservations: true, // Correct way to include the related reservations
      },
    });
    

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user data and their reservations
    //return res.status(200).json({ customer: user, reservations: user.Reservations });
    return res.status(200).json({ customer: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
