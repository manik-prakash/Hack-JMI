import React, { useState } from "react";
import axios from "axios";

const ChatApp = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([{ type: "bot", text: "Hello! Gaffer I am here to assist you on Web3 based Land Allocation System" }]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { type: "user", text: message };
    setChatHistory((prev) => [...prev, userMessage]);
    setMessage("");

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/chatbot/chat", {
        message,
      });
      if (res.data.success) {
        const botResponse = { type: "bot", text: res.data.response };
        setChatHistory((prev) => [...prev, botResponse]);
      } else {
        const errorMessage = {
          type: "bot",
          text: "Error: Unable to fetch response.",
        };
        setChatHistory((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage = {
        type: "bot",
        text: "Error: Something went wrong.",
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-gradient-to-br from-white/5 to-white/5 backdrop-blur-lg p-8 shadow-xl shadow-[#027af23b] border border-white/20 rounded-4xl w-[65vw] h-[75vh] flex flex-col">
        <h1 className="text-4xl font-bold text-center text-white mb-4">
          WEB3 BASED LAND ALLOCATION CHATBOT
        </h1>
        {/* Chat Container */}
        <div className="flex flex-col flex-grow overflow-y-auto space-y-2">
          {/* Display chat history */}
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`p-3 w-[50vw] rounded-lg ${
                msg.type === "user"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-200 text-gray-800 self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input Form (Sticky to the bottom) */}
        <form onSubmit={handleSubmit} className="mt-4 flex space-x-2 text-white">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask your question here..."
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-5 py-3 text-white rounded-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatApp;