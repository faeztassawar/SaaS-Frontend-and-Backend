"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import bgImage from "@/app/template1/images/Landing.png" // Make sure this image exists
import Footer from "../components/Footer"
import Link from "next/link"
import NavBar from "../components/NavBar"
import { useSession } from "next-auth/react"

interface AboutUsPageProps {
  restaurant_id: string
  name: string
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ restaurant_id, name }) => {
  const { data: session } = useSession()
  const [aboutUsContent, setAboutUsContent] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState("")

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
        const response = await fetch(`${apiUrl}/api/about-us/${restaurant_id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch about us content")
        }
        const data = await response.json()
        setAboutUsContent(data.about_us || "")
        setEditedContent(data.about_us || "")
      } catch (error) {
        console.error("Error fetching about us content:", error)
      }
    }

    fetchAboutUs()
  }, [restaurant_id])

  const handleSave = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      const response = await fetch(`${apiUrl}/api/about-us/${restaurant_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ about_us: editedContent }),
      })

      if (response.ok) {
        setAboutUsContent(editedContent)
        setIsEditing(false)
      } else {
        throw new Error("Failed to update about us content")
      }
    } catch (error) {
      console.error("Error updating about us content:", error)
    }
  }

  return (
    <div className="md:flex h-screen w-screen bg-[#050505] font-chillax">
      {/* Left Side Screen */}
      <div className="relative h-24 md:h-full md:w-1/2 w-full flex items-center justify-center overflow-hidden">
        <Image
          className="absolute top-0 left-0 object-cover brightness-50"
          src={bgImage || "/placeholder.svg"}
          alt="Background"
          layout="fill"
        />
        <div className="relative z-10 flex items-center h-full flex-col justify-between gap-20 py-14">
          <h1 className="text-white text-xl md:text-4xl font-chillax">
            <Link href={`/restaurants/${restaurant_id}`}>{name}</Link>
          </h1>
          <div className="text-white flex gap-2 flex-col justify-between items-center">
            <h2 className="text-3xl md:text-7xl font-rose text-[#face8d]">About Us</h2>
          </div>
          <NavBar rest_id={restaurant_id} />
        </div>
      </div>

      {/* Right Side Screen */}
      <div className="md:ml-1/2 z-10 w-screen pt-10 h-screen md:w-1/2 text-2xl flex flex-col gap-8 font-chillax text-white p-4 bg-[#010000] overflow-y-auto">
        <div className="px-16 py-10 mt-10">
          <h2 className="text-4xl font-[900] mar mb-2">About Us</h2>
              <div className="text-xl opacity-60 leading-[160%]">{aboutUsContent || "No content available."}</div>
        </div>
        <div className="mt-10 flex items-center justify-center md:hidden">
          <NavBar rest_id={restaurant_id} />
        </div>
        <div className="mt-10">
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default AboutUsPage

