"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import bgImage from "@/app/template1/images/Landing.png"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import Link from "next/link"
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
    <div className="relative min-h-screen w-screen overflow-hidden font-chillax">
      <Image
        className="absolute top-0 left-0 object-cover brightness-50 h-full w-full"
        src={bgImage || "/placeholder.svg"}
        fill
        alt="Background"
        priority
      />

      <div className="relative z-10 flex items-center min-h-screen flex-col gap-10 justify-between py-[5vh]">
        <h1
          className="text-white text-2xl md:text-4xl font-chillax pt-[5vh]"
          style={{
            opacity: 0,
            animation: "fadeIn 1s forwards",
            animationDelay: "0s",
          }}
        >
          <Link href={`/restaurants/${restaurant_id}`}>{name}</Link>
        </h1>
        <div className="text-white flex gap-2 md:gap-7 flex-col justify-between items-center">
          <h2
            className="text-4xl md:text-7xl font-rose text-[#face8d]"
            style={{
              opacity: 0,
              animation: "fadeIn 1s forwards",
              animationDelay: "0.2s",
            }}
          >
            About Us
          </h2>
          <div className="max-w-2xl">
            {isEditing ? (
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="mt-4 text-lg md:text-2xl text-black w-full h-40 p-2"
                style={{
                  opacity: 0,
                  animation: "fadeIn 1s forwards",
                  animationDelay: "0.2s",
                }}
              />
            ) : (
              <p
                className="mt-4 text-lg md:text-2xl text-white text-center"
                style={{
                  opacity: 0,
                  animation: "fadeIn 1s forwards",
                  animationDelay: "0.2s",
                }}
              >
                {aboutUsContent || "No content available."}
              </p>
            )}
          </div>
        </div>
        <NavBar rest_id={restaurant_id} />
      </div>
      <Footer restaurant_id={restaurant_id}/>
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default AboutUsPage

