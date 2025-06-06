"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useSession } from "next-auth/react"

interface AboutUsPageProps {
  restaurant_id: string
  name: string
}

const AboutUs: React.FC<AboutUsPageProps> = ({ restaurant_id, name }) => {
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
    <div className="flex flex-col min-h-screen bg-[#FDFFF1]">
      {/* Header Component */}
      <Header rest_id={restaurant_id} rest_name="About Us" />

      {/* Main Content */}
      <main className="flex-grow">
        <div className="text-center mt-8 sm:mt-10 lg:my-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#333333] mb-4">Our Story</h2>
          <div className="text-[#333333] max-w-md sm:max-w-xl lg:max-w-4xl mx-auto px-4 lg:px-0 flex flex-col gap-6">
                <div className="text-sm sm:text-base leading-relaxed">
                  {aboutUsContent || "Welcome to our restaurant, where passion meets flavor. Our journey began..."}
                </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center mt-10 sm:mt-20 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#333333] mb-4">Contact Us</h2>
          <p className="text-sm sm:text-base text-[#333333] max-w-lg mx-auto mb-4">
            Have questions or want to learn more? We would love to hear from you!
          </p>
          <a className="text-1xl sm:text-2xl lg:text-2xl text-[#333333]">
            +92 4543545346
          </a>
        </div>
      </main>

      {/* Footer */}
      <Footer restaurant_id={restaurant_id}/>
    </div>
  )
}

export default AboutUs

