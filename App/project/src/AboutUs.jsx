// AboutUs.jsx
import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";

const AboutUs = () => {
  // FAQ data (9 items)
  const faqs = [
    {
      question: "What is GovMate?",
      answer:
        "GovMate is an AI-driven platform that simplifies government processes and provides 24/7 support for all your government service needs.",
    },
    {
      question: "Do I need an account to use GovMate?",
      answer:
        "While basic information is available without an account, signing up unlocks personalized features and faster service.",
    },
    {
      question: "How secure is my data?",
      answer:
        "We prioritize security with advanced encryption and strict access controls to ensure your personal information remains safe.",
    },
    {
      question: "Which languages does GovMate support?",
      answer:
        "We offer services in multiple languages to cater to a diverse community, ensuring everyone can benefit.",
    },
    {
      question: "How do the chatbots work?",
      answer:
        "Each chatbot is specialized for a particular government domain—be it taxes, pensions, or documents—so they provide accurate, context-driven responses.",
    },
    {
      question: "Is GovMate available 24/7?",
      answer:
        "Yes! Our platform is available round-the-clock, ensuring you can get assistance anytime without waiting in queues.",
    },
    {
      question: "What makes GovMate’s AI unique?",
      answer:
        "Our advanced AI integration uses natural language processing to understand complex queries and deliver precise, actionable answers instantly.",
    },
    {
      question: "How do I provide feedback?",
      answer:
        "You can share your feedback via our Contact Us page or through the built-in feedback option in your user dashboard.",
    },
    {
      question: "What if I have multiple queries?",
      answer:
        "GovMate is designed to handle multiple queries seamlessly, and you can switch between various specialized chatbots as needed.",
    },
  ];

  // Track which FAQ is open
  const [openFAQ, setOpenFAQ] = useState(null);
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-6 pt-24 pb-16">
      {/* Intro Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About GovMate</h1>
        <p className="text-gray-400">
          GovMate leverages cutting-edge AI to make government services simple, accessible, and efficient.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Our Mission */}
        <div className="bg-[#191919] rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>Leverage AI to simplify and automate government processes.</li>
            <li>Provide 24/7 support and instant access to essential information.</li>
            <li>Ensure inclusivity with services in multiple languages and formats.</li>
          </ul>
        </div>
        {/* Our Vision */}
        <div className="bg-[#191919] rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>Enable every citizen to interact with government agencies as easily as chatting with a friend.</li>
            <li>Enhance transparency, efficiency, and trust in public services with intuitive AI.</li>
            <li>Evolve continuously to meet the changing needs of citizens and governments.</li>
          </ul>
        </div>
      </div>

      {/* Why GovMate is Better */}
      <div className="max-w-6xl mx-auto bg-[#191919] rounded-lg p-6 mb-12">
        <h2 className="text-2xl font-semibold mb-4">Why GovMate is Better</h2>
        <p className="text-gray-400 mb-4">
          We stand out by focusing exclusively on specialized government services, 
          backed by robust AI and a user-friendly design.
        </p>

        {/* Wrap your list items in a Fade cascade */}
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <Fade triggerOnce cascade damping={0.1}>
            <li>
              <strong>Specialized Chatbots</strong>
            </li>
            <li>
              <strong>Advanced AI Integration</strong>
            </li>
            <li>
              <strong>Multi-Lingual Support</strong>
            </li>
            <li>
              <strong>Voice-to-Text Feature</strong>
            </li>
            <li>
              <strong>24/7 Availability</strong>
            </li>
            <li>
              <strong>Security &amp; Privacy</strong>
            </li>
          </Fade>
        </ul>
      </div>


      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div key={index} className="bg-[#191919] rounded-lg p-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left flex justify-between items-center focus:outline-none"
              >
                <span className="text-lg font-semibold">{item.question}</span>
                <span className="text-gray-400">
                  {openFAQ === index ? "–" : "+"}
                </span>
              </button>
              {openFAQ === index && (
                <p className="mt-3 text-gray-300">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
