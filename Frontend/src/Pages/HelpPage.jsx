import React, { useState } from "react"
import { ChevronDown } from "lucide-react"

// Dummy Header and Footer components
const Header = () => (
  <header className="bg-primary text-white p-4 text-center font-semibold text-lg">
    Yojna Finder
  </header>
)

const Footer = () => (
  <footer className="bg-primary text-white p-4 text-center text-sm">
    © 2025 Yojna Finder. All rights reserved.
  </footer>
)

// Reusable Button component
const Button = ({ children, variant = "default", size = "md", onClick }) => {
  const base =
    "rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
  const variants = {
    default: "bg-primary text-white hover:bg-primary/80 focus:ring-primary",
    outline:
      "border border-primary text-primary hover:bg-primary/10 focus:ring-primary",
  }
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }
  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </button>
  )
}

// FAQ data
const faqs = [
  {
    question: "How do I search for schemes on Yojna Finder?",
    answer:
      "You can search for schemes using our search bar or browse section. Use keywords related to your needs, and our intelligent search will find relevant schemes. You can also use filters to narrow down results by category, level, and other criteria.",
  },
  {
    question: "What does the 'Level' filter mean?",
    answer:
      "The Level filter helps you distinguish between different types of schemes: Central (nationwide) or State-specific. You can filter by either level to find schemes relevant to your location.",
  },
  {
    question: "How can I save my favorite schemes?",
    answer:
      "Click the bookmark icon on any scheme card to save it. Your saved schemes will be stored locally and accessible anytime from the Saved section.",
  },
  {
    question: "What information is provided for each scheme?",
    answer:
      "Each scheme includes comprehensive details — name, description, benefits, eligibility, process, required documents, level, and tags.",
  },
  {
    question: "Is the content available in multiple languages?",
    answer:
      "Yes! Yojna Finder supports both English and Hindi. You can switch between languages on scheme pages.",
  },
  {
    question: "How often is the scheme information updated?",
    answer:
      "We update our database regularly, but we recommend verifying details on official government sources before applying.",
  },
  {
    question: "Can I apply for schemes directly through Yojna Finder?",
    answer:
      "No, Yojna Finder provides information and guidance only. Applications are done through official government portals or offices.",
  },
  {
    question: "What should I do if I find incorrect information?",
    answer:
      "Please reach out via the Contact Us page. We’ll verify and correct the data promptly.",
  },
  {
    question: "How do the filters work?",
    answer:
      "You can combine multiple filters (Category, Level, Tags) to find schemes that match your requirements precisely.",
  },
  {
    question: "Is my saved data secure?",
    answer:
      "Yes! All saved data stays in your browser’s local storage. We don’t collect or store personal data.",
  },
]

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="min-h-screen flex flex-col bg-background">

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="max-w-3xl mx-auto text-center space-y-4 px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Help & Support
            </h1>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions and learn how to make the most of
              Yojna Finder
            </p>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Getting Started",
                  description: "Learn the basics of using Yojna Finder",
                  icon: "🚀",
                },
                {
                  title: "Search & Filter",
                  description: "Master advanced search and filtering options",
                  icon: "🔍",
                },
                {
                  title: "Scheme Details",
                  description: "Understand scheme information and eligibility",
                  icon: "📋",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6 bg-muted/30 rounded-lg border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-colors"
                >
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                    className="w-full px-6 py-4 flex items-center justify-between bg-background hover:bg-muted/50 transition-colors"
                  >
                    <h3 className="font-semibold text-foreground text-left">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`h-5 w-5 text-muted-foreground transition-transform ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openIndex === index && (
                    <div className="px-6 py-4 bg-muted/30 border-t border-border">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
       
      </main>
    </div>
  )
}
