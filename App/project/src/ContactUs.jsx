// ContactUs.jsx
import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-8 py-16">
      <h1 className="text-4xl font-bold text-center mb-2">Contact Us</h1>
      <p className="text-center text-gray-400 mb-10">
        Have questions or need assistance? We're here to help.
      </p>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form Section */}
        <div className="bg-[#191919] p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-gray-400 mb-6">
            Fill out the form and our team will get back to you as soon as possible.
          </p>
          <form className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="First name"
                className="w-1/2 p-3 bg-[#0d0d0d] rounded border border-gray-600 text-white focus:outline-none"
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-1/2 p-3 bg-[#0d0d0d] rounded border border-gray-600 text-white focus:outline-none"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 bg-[#0d0d0d] rounded border border-gray-600 text-white focus:outline-none"
            />
            <select className="w-full p-3 bg-[#0d0d0d] rounded border border-gray-600 text-white focus:outline-none">
              <option>Select a subject</option>
              <option>General Inquiry</option>
              <option>Support Request</option>
              <option>Other</option>
            </select>
            <textarea
              placeholder="How can we help you?"
              className="w-full p-3 bg-[#0d0d0d] rounded border border-gray-600 text-white focus:outline-none h-32"
            />
            <button
              type="submit"
              className="w-full bg-white text-black py-3 rounded font-semibold hover:bg-gray-300 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info Section */}
        <div className="bg-[#191919] p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="text-gray-400 mb-6">
            You can reach us through the following channels.
          </p>
          <p className="mb-2">
            <strong>Email:</strong> support@egovchatbots.gov
          </p>
          <p className="mb-2">
            <strong>Phone:</strong> +1 (800) 123-4567
          </p>
          <p className="mb-6">
            <strong>Address:</strong> 123 Government Plaza, Capital City, ST 12345
          </p>

          <h2 className="text-2xl font-semibold mb-4">Helpline Numbers</h2>
          <p className="mb-2">
            <strong>Tax Services:</strong> +1 (800) 123-4568
          </p>
          <p className="mb-2">
            <strong>Pension Services:</strong> +1 (800) 123-4569
          </p>
          <p className="mb-2">
            <strong>Document Services:</strong> +1 (800) 123-4570
          </p>
          <p>
            <strong>Technical Support:</strong> +1 (800) 123-4571
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
