import React from "react";
import { useNavigate } from "react-router-dom";
import "./services.css"; // Or wherever your custom CSS is

const servicesData = [
  {
    title: "Tax",
    description:
      "Get help with filing your taxes, understanding deductions, and resolving tax-related queries.",
    icon: "🏛️",
  },
  {
    title: "Pension",
    description:
      "Assistance with pension applications, status checks, and understanding your pension benefits.",
    icon: "📄",
  },
  {
    title: "Healthcare",
    description:
      "Access quality medical care, health checkups, and wellness programs.",
    icon: "🏥",
  },
  {
    title: "Housing",
    description:
      "Information about government housing schemes, subsidies, and application procedures.",
    icon: "🏠",
  },
  {
    title: "Employment",
    description:
      "Help with job searches, unemployment benefits, and career development programs.",
    icon: "💼",
  },
  {
    title: "Education",
    description:
      "Information about scholarships, student loans, and educational programs.",
    icon: "🎓",
  },
];

const ServicesPage = () => {
  const navigate = useNavigate();

  const handleAccessService = (service) => {
    // Navigate to the service chat page with the service title
    navigate(`/service-chat/${encodeURIComponent(service.title)}`);
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