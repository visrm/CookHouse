import { useState } from "react";
import {
  LuGithub,
  LuInstagram,
  LuLinkedin,
  LuMail,
  LuPhone,
  LuSend,
} from "react-icons/lu";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { FEEDBACKS_API_END_POINT } from "../utils/constants.js";
import toast from "react-hot-toast";
import axios from "axios";

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {user} = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let feedback = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };
      const response = await axios.post(
        `${FEEDBACKS_API_END_POINT}/`,
        feedback,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setIsSubmitted(true);
      }
    } catch (error) {
      toast.error(err.response.data.message);
    } finally {
      setTimeout(() => setIsSubmitted(false), 3000);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }
  };

  return (
    <>
      <main className="relative flex flex-col flex-nowrap max-w-full h-full w-full min-h-[90svh] md:min-h-screen mx-auto transition-all duration-300 overflow-x-hidden">
        <div className="max-w-6xl mx-auto sm:px-4 py-12 w-[90%]">
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4 sm:mb-6">
            Contact Us
          </h1>
          <p className="text-sm sm:text-lg text-center text-gray-600 mb-12">
            Have questions about CookHouse? We're here to help the cooking
            community grow together!
          </p>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Information */}
            <div className="bg-amber-50 p-8 rounded-lg shadow-md">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-amber-100 p-2 sm:p-3 rounded-full mr-2 sm:mr-4">
                    <LuMail className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-xs sm:text-sm">Email</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">support@cookhouse.com</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-amber-100 p-2 sm:p-3 rounded-full mr-2 sm:mr-4">
                    <LuPhone className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-xs sm:text-sm">Phone</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">+91 (455) 123-4567</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-6 sm:mt-8 mb-3 sm:mb-4">
                Developer Social
              </h3>
              <div className="flex space-x-4 md:space-x-8">
                <a
                  href="https://github.com/visrm"
                  target="_blank"
                  className="bg-amber-100 p-3 rounded-full hover:bg-amber-200 transition-colors"
                >
                  <LuGithub className="h-6 w-6 text-amber-600" />
                </a>
                <a
                  href="https://www.linkedin.com/in/rahulmurali852"
                  target="_blank"
                  className="bg-amber-100 p-3 rounded-full hover:bg-amber-200 transition-colors"
                >
                  <LuLinkedin className="h-6 w-6 text-amber-600" />
                </a>
                <a
                  href="https://www.instagram.com/vyali.v0"
                  target="_blank"
                  className="bg-amber-100 p-3 rounded-full hover:bg-amber-200 transition-colors"
                >
                  <LuInstagram className="h-6 w-6 text-amber-600" />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-full">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-6">Send us a Message</h2>

              {isSubmitted ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  Thank you for your message! We'll get back to you soon.
                </div>
              ) : null}

              <div className="space-x-3 sm:space-y-4 w-full max-w-full">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-0 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-0 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-0 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-0 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <button
                  onClick={handleSubmit}
                  className="flex justify-center items-center w-full max-w-full mt-2 amber-gradient text-white py-2 px-4 rounded-md hover:bg-amber-600 transition-colors font-medium"
                >
                  Send Message
                  <LuSend className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {!user && ( <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold mb-2">
              Join our Cooking Community
            </h2>
            <p className="text-gray-600 mb-6">
              Connect with thousands of culinary enthusiasts around the world
            </p>
            <button
              className="amber-gradient text-white py-2 px-6 rounded-md hover:bg-amber-600 transition-colors font-medium"
              onClick={(e) => {
                e.preventDefault();
                navigate("/register");
              }}
            >
              Sign Up Today
            </button>
          </div> )}
        </div>
      </main>
    </>
  );
};

export default Contacts;
