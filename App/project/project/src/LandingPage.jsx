// LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiFileText, FiCreditCard, FiHelpCircle } from 'react-icons/fi';
import { AiOutlineRobot } from "react-icons/ai";
import { FiMenu, FiX } from "react-icons/fi";



// ─────────────────────────────────────────────────────────────
// Hero Component
// ─────────────────────────────────────────────────────────────
// Hero.jsx

export const Hero = () => {
  // 2) A helper function to scroll to the services section
  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="pt-24 pb-12 bg-black">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Content */}
        <div className="md:w-1/2 text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Smart Chatbots for{" "}
            <span className="text-primary-600">Modern Governance</span>
          </h1>
          <p className="text-gray-300 mt-4 max-w-xl">
            Enhancing citizen engagement with government services using AI-powered
            chatbots. Get instant assistance for passport services, tax filing,
            legal aid, or filing a complaint.
          </p>
          <div className="mt-6 flex space-x-4">
            {/* 3) Changed "Try Chatbot Demo" to "Get Started" */}
            <button className="bg-primary-600 text-white px-6 py-3 rounded hover:bg-primary-700 transition duration-300">
              Get Started
            </button>

            {/* 4) "Explore Services" scrolls to services section */}
            <button
              onClick={scrollToServices}
              className="bg-transparent border border-white text-white px-6 py-3 rounded hover:bg-gray-300 hover:text-black transition duration-300"
            >
              Explore Services
            </button>
          </div>
        </div>

        {/* Right Content: Chat Simulation */}
        <div className="md:w-1/2 flex justify-center">
          <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg max-w-sm w-full">
            {/* Chat Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <AiOutlineRobot className="text-white mr-2" size={20} />
                <h3 className="text-white font-semibold">SmartGov Assistant</h3>
              </div>
              <span className="text-xs text-green-400">Online</span>
            </div>

            {/* Chat Messages */}
            <div className="h-64 bg-[#2a2a2a] rounded-md overflow-y-auto p-4 flex flex-col space-y-3">
              {/* User Message */}
              <div className="bg-white text-black p-2 rounded-md self-start">
                <span className="text-sm font-bold">Ivy</span>
                <span className="text-xs text-gray-500 ml-2">12:28 am</span>
                <p className="text-sm mt-1">
                  I need help with that specific query. Could you provide more
                  details about passport services, tax filing, legal aid, or
                  filing a complaint?
                </p>
              </div>

              {/* Assistant Message */}
              <div className="bg-blue-500 text-white p-2 rounded-md self-end">
                <span className="text-sm font-bold">Assistant</span>
                <span className="text-xs text-white ml-2">12:29 am</span>
                <p className="text-sm mt-1">
                  Sure, I'd be happy to guide you. Please tell me your location
                  and the specific service you want to explore first.
                </p>
              </div>
            </div>

            {/* Chat Input */}
            <div className="mt-4 flex">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-l-md bg-[#0d0d0d] text-white focus:outline-none"
              />
              <button className="bg-primary-600 text-white px-4 py-2 rounded-r-md hover:bg-primary-700 transition duration-300">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// Landing Services Component (3 service cards)
// ─────────────────────────────────────────────────────────────
export const Services = () => (
  <section id="services" className="py-16 bg-[#0d0d0d]">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-12 text-white">Our AI-Powered Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ServiceCard
          title="Pension Services"
          description="Get assistance with Pension application, status check, and understanding your pension benefits."
          icon={FiFileText}
        />
        <ServiceCard
          title="Education Support"
          description="Information about scholarships, student loans, and educational programs."
          icon={FiCreditCard}
        />
        <ServiceCard
          title="Housing Assistance"
          description="Information about government housing schemes, subsidies, and application procedures."
          icon={FiHelpCircle}
        />
      </div>
    </div>
  </section>
);



export const HowItWorks = () => {
  return (
    <section className="bg-[#0d0d0d] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-gray-400 mb-12">
          Access government services in three simple steps
        </p>

        {/* Placeholder for Video or Image */}
        <div className="mx-auto w-full max-w-3xl h-64 md:h-96 bg-[#2a2a2a] rounded-lg flex items-center justify-center mb-10">
          <p className="text-gray-500 text-xl">
            Video or Image Placeholder
          </p>
        </div>

        {/* Three Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-[#191919] rounded-full flex items-center justify-center mb-4">
              <span className="text-primary-600 text-2xl">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Choose a Service</h3>
            <p className="text-gray-400 max-w-sm">
              Select from our specialized chatbots based on what you need help with.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-[#191919] rounded-full flex items-center justify-center mb-4">
              <span className="text-primary-600 text-2xl">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Chat or Speak</h3>
            <p className="text-gray-400 max-w-sm">
              Interact with the chatbot by typing or using your voice.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-[#191919] rounded-full flex items-center justify-center mb-4">
              <span className="text-primary-600 text-2xl">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Results</h3>
            <p className="text-gray-400 max-w-sm">
              Receive guidance, submit applications, or resolve issues instantly.
            </p>
          </div>
        </div>
      </div>

      {/* Final Call-to-Action */}
      <div className="bg-[#191919] mt-16 py-10 text-center px-4">
        <h3 className="text-2xl font-semibold text-white mb-2">
          Ready to Get Started?
        </h3>
        <p className="text-gray-400 mb-6">
          Join thousands of citizens who are already benefiting from our e-governance chatbots.
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-primary-600 text-white px-6 py-2 rounded hover:bg-primary-700 transition duration-300"
          >
            Login or Sign Up
          </Link>
          <Link
            to="/services"
            className="bg-white text-black px-6 py-2 rounded hover:bg-gray-300 transition duration-300"
          >
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
};



// ─────────────────────────────────────────────────────────────
// Internal ServiceCard Component for Landing Page
// ─────────────────────────────────────────────────────────────
const ServiceCard = ({ title, description, icon: Icon }) => (
  <div
    className="bg-[#191919] p-6 rounded-xl shadow-lg card-hover transition-transform hover:-translate-y-1"
    onClick={() => console.log(`Starting chat with ${title}`)}
  >
    <div className="text-primary-600 w-12 h-12 mb-4">
      <Icon size={48} />
    </div>
    <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
    <p className="text-gray-300 mb-4">{description}</p>
    <button className="bg-primary-100 text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-primary-200 transition duration-300">
      Explore
    </button>
  </div>
);

// ─────────────────────────────────────────────────────────────
// Footer Component
// ─────────────────────────────────────────────────────────────
export const Footer = () => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-lg font-semibold mb-4">About</h4>
          <p className="text-gray-400">
            Making government services accessible through AI technology.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/services" className="hover:text-white">Services</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-gray-400">
            <li>support@egov.com</li>
            <li>1-800-GOV-HELP</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
            <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
        <p>© 2025 E-Gov Portal. All rights reserved.</p>
      </div>
    </div>
  </footer>
);
