import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FiMic, FiSend, FiVolume2, FiVolumeX } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import {franc} from "franc"; // Language detection library

const ServiceChatPage = () => {
  const { serviceTitle } = useParams();
  const location = useLocation();
  const decodedTitle = decodeURIComponent(serviceTitle);
  const port = location.state?.port || 5000;

  const [prompt, setPrompt] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [isTTSEnabled, setIsTTSEnabled] = useState(true); // TTS toggle state
  const chatContainerRef = useRef(null);
  const timeoutRef = useRef(null);

  // Cleanup TTS on component unmount or page reload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel(); // Stop any ongoing speech
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel(); // Cleanup on component unmount
      }
    };
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = "en-US";

      recog.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setPrompt((prev) => prev + " " + transcript);
        setIsListening(false);
        clearTimeout(timeoutRef.current);
      };

      recog.onerror = (err) => {
        console.error("Speech recognition error: ", err);
        setIsListening(false);
        clearTimeout(timeoutRef.current);

        if (err.error === "no-speech") {
          alert("No speech detected. Please try again.");
        } else {
          alert("Speech recognition failed. Please try again.");
        }
      };

      recog.onend = () => {
        setIsListening(false);
        clearTimeout(timeoutRef.current);
      };

      setRecognition(recog);
    } else {
      console.warn("Speech Recognition not supported in this browser.");
      alert("Your browser does not support speech recognition.");
    }
  }, []);

  // Scroll to the bottom of the chat when conversation updates
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  // Start/stop speech recognition
  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
      clearTimeout(timeoutRef.current);
    } else {
      recognition.start();
      setIsListening(true);

      // Set a timeout for no speech (e.g., 5 seconds)
      timeoutRef.current = setTimeout(() => {
        if (isListening) {
          recognition.stop();
          setIsListening(false);
          alert("No speech detected. Please try again.");
        }
      }, 5000); // 5 seconds
    }
  };

  // Handle prompt submission
  const handlePromptSubmit = async () => {
    if (!prompt.trim()) return;

    setConversation((prev) => [
      ...prev,
      { role: "user", content: prompt.trim() },
    ]);

    setPrompt("");

    try {
      const res = await fetch(`http://127.0.0.1:${port}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: prompt.trim() }),
      });

      const data = await res.json();

      if (data.response) {
        const botResponse = data.response;
        setConversation((prev) => [
          ...prev,
          { role: "bot", content: botResponse },
        ]);

        // Speak the bot's response only if TTS is enabled
        if (isTTSEnabled) {
          speakText(botResponse);
        }
      } else if (data.error) {
        setConversation((prev) => [
          ...prev,
          { role: "bot", content: `Error: ${data.error}` },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setConversation((prev) => [
        ...prev,
        { role: "bot", content: "Error: Unable to connect to the server." },
      ]);
    }
  };

  // Handle Enter key for prompt submission
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handlePromptSubmit();
    }
  };

  // Function to detect language
  const detectLanguage = (text) => {
    const langCode = franc(text);
    return langCode === "hin" ? "hi-IN" : "en-US"; // Use 'hi-IN' for Hindi, 'en-US' for English
  };

  // Function to speak text using the Web Speech API
  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = detectLanguage(text); // Set language dynamically
      utterance.rate = 1; // Speed of speech
      utterance.pitch = 1; // Pitch of speech
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Text-to-speech not supported in this browser.");
      alert("Your browser does not support text-to-speech.");
    }
  };

  // Replay the most recent bot response
  const replayBotResponse = () => {
    const lastBotMessage = conversation
      .slice()
      .reverse()
      .find((msg) => msg.role === "bot");

    if (lastBotMessage) {
      speakText(lastBotMessage.content);
    } else {
      alert("No bot response available to replay.");
    }
  };

  // Toggle TTS feature and interrupt ongoing speech
  const toggleTTS = () => {
    if (isTTSEnabled && "speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Stop ongoing speech
    }
    setIsTTSEnabled((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex flex-col items-center text-white px-4">
      <h2 className="text-3xl font-semibold my-8">What can I help with?</h2>

      <div
        ref={chatContainerRef}
        className="w-full h-[calc(100vh-200px)] bg-[#191919] rounded-lg p-4 overflow-y-auto flex flex-col space-y-4"
      >
        {conversation.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                msg.role === "user"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              {msg.role === "bot" ? (
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full bg-[#191919] rounded-full flex items-center px-4 py-2 my-4">
        <input
          type="text"
          className="bg-transparent flex-1 focus:outline-none text-white placeholder-gray-500"
          placeholder="Ask anything"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          onClick={toggleListening}
          className={`mr-3 ${
            isListening ? "text-red-400 animate-pulse" : "text-gray-400 hover:text-white"
          }`}
          title={isListening ? "Stop listening" : "Start listening"}
        >
          <FiMic size={20} />
        </button>

        <button
          onClick={handlePromptSubmit}
          className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition duration-300"
        >
          <FiSend size={20} />
        </button>
      </div>

      {isListening && (
        <p className="text-sm text-gray-400 mb-4">Listening...</p>
      )}

      {/* TTS Toggle Button */}
      <button
        onClick={toggleTTS}
        className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300 flex items-center mb-4"
      >
        {isTTSEnabled ? (
          <>
            <FiVolume2 size={16} className="mr-2" />
            Disable Text-to-Speech
          </>
        ) : (
          <>
            <FiVolumeX size={16} className="mr-2" />
            Enable Text-to-Speech
          </>
        )}
      </button>

      {/* Replay button for the most recent bot response */}
      <button
        onClick={replayBotResponse}
        className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300 flex items-center"
      >
        <FiVolume2 size={16} className="mr-2" />
        Replay Bot Response
      </button>

      <p className="mb-6 text-gray-400">
        Currently chatting with:{" "}
        <span className="text-white">{decodedTitle}</span>
      </p>
    </div>
  );
};

export default ServiceChatPage;