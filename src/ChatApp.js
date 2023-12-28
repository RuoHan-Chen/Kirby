import React, { useState } from "react";
import ChatGPTWrapper from "./ChatGPTWrapper";

const ChatApp = () => {
  const [userInput, setUserInput] = useState("");
  const [displayInput, setDisplayInput] = useState("Hi! Kirby here! Poyo!");
  let conversation = [
    {
      role: "system",
      content:
        "Pretend that you are Kirby, and talk only with Poyo, very simple words, and cute sounds. Do not address yourself as Chatgpt or anyone other than Kirby. Also simple words are allowed. When talking, you can use quotation marks to express what you mean",
    },
  ];
  const [loading, setLoading] = useState(false);
  const apiKey = process.env.REACT_APP_OPEN_AI_API_KEY;
  const chatgpt = new ChatGPTWrapper(apiKey);
  const [response, setResponse] = useState("");


  const handleUserInput = async () => {
    if (userInput.trim() === "") return;
    
    conversation = [
      conversation[0],
      {
        role: "user",
        content: userInput,
      },
    ];

    console.log(conversation);
    console.log(userInput);
    setLoading(true);

    try {
      const apiResponse = await chatgpt.generateResponse(conversation);
      const firstChoice = apiResponse.choices[0].message.content;
      setResponse(firstChoice);
      setDisplayInput(userInput);
    } catch (error) {
      console.error("Error generating response:", error);
    } finally {
      setLoading(false);
    }

    setUserInput("");
  };

  return (
    <div>
      <div>
        <h1>{displayInput}</h1>
        <h1>{response}</h1>
      </div>

      <div>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={handleUserInput} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
