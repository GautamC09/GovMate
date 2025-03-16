// ServicesPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./services.css"; // Or wherever your custom CSS is

const servicesData = [
  {
    title: "Tax Filing Assistant",
    description:
      "Get help with filing your taxes, understanding deductions, and resolving tax-related queries.",
    icon: "🏛️",
  },
  {
    title: "Pension Services",
    description:
      "Assistance with pension applications, status checks, and understanding your pension benefits.",
    icon: "📄",
  },
  {
    title: "Heathcare Services",
    description:
      "Access quality medical care, health checkups, and wellness programs.",
    icon: "🏥",
  },
  {
    title: "Housing Assistance",
    description:
      "Information about government housing schemes, subsidies, and application procedures.",
    icon: "🏠",
  },
  {
    title: "Employment Services",
    description:
      "Help with job searches, unemployment benefits, and career development programs.",
    icon: "💼",
  },
  {
    title: "Education Support",
    description:
      "Information about scholarships, student loans, and educational programs.",
    icon: "🎓",
  },
];

const servicePorts = {
  "Tax Filing Assistant": 5001,
  "Pension Services": 5002,
  "Heathcare Services": 5003,
  "Housing Assistance": 5004,
  "Employment Services": 5005,
  "Education Support": 5006,
};

const ServicesPage = () => {
  const navigate = useNavigate();

  const handleAccessService = (service) => {
    const port = servicePorts[service.title];
    navigate(`/service-chat/${encodeURIComponent(service.title)}`, {
      state: { port }, // Pass the server port as state
    });
  };

  return (
    <div className="services-container">
      <h2 className="services-heading">Our Chatbot Services</h2>
      <p className="services-subtext">
        Explore our range of AI-powered chatbots designed to make government services accessible to everyone.
      </p>
      <div className="tabs">
        <button className="active-tab">All Services</button>
      </div>
      <div className="services-grid">
        {servicesData.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
            <button
              className="service-button"
              onClick={() => handleAccessService(service)}
            >
              Access Service
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
