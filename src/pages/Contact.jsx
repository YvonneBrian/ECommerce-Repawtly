import React, { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle, Loader2 } from "lucide-react";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setIsSent(false);

    
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);

    
      setFormData({ name: "", email: "", message: "" });

     
      setTimeout(() => setIsSent(false), 3000);
    }, 2000);
  };

  return (
    <section id="contact" className="px-6 py-16 bg-gray-50">
      <h2 className="text-4xl font-extrabold text-center text-sky-500 mb-12">
        Get in Touch with Repawtly
      </h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-3xl shadow-2xl overflow-hidden">
    
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Send us a message!
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                rows="4"
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 resize-none"
              ></textarea>
            </div>

           
            <button
              type="submit"
              disabled={isSending}
              className={`w-full py-3 font-bold rounded-full transition duration-200 shadow-md flex items-center justify-center ${
                isSending
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-amber-400 text-gray-900 hover:bg-amber-500"
              }`}
            >
              {isSending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Sending...
                </>
              ) : (
                "Submit Inquiry"
              )}
            </button>

            
            {isSent && (
              <div className="mt-5 text-green-600 text-center flex items-center justify-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Your message has been sent successfully!</span>
              </div>
            )}
          </form>
        </div>

        {/* Contact Info */}
        <div className="bg-sky-50 p-8 md:p-10 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-200">
          <h3 className="text-2xl font-semibold text-sky-700 mb-6">
            Our Details
          </h3>

          <div className="space-y-4 text-gray-700">
            <p className="flex items-center">
              <Mail className="w-5 h-5 text-sky-500 mr-3" />
              Suppawrt@repawtly.com
            </p>
            <p className="flex items-center">
              <Phone className="w-5 h-5 text-sky-500 mr-3" /> (02) 1234-4567
            </p>
            <p className="flex items-start">
              <MapPin className="w-5 h-5 text-sky-500 mr-3 mt-1" />
              <span>
                <strong>Office Address:</strong>
                <br />
                101 Aspin Lane, Puspin City 
              </span>
            </p>
          </div>

          <p className="mt-6 text-sm text-gray-500 italic">
            We’d love to hear from you! Fill out the form, or reach us directly
            using the contact details above.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
