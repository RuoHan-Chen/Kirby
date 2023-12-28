import axios from "axios";

class ChatGPTWrapper {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiUrl = "https://api.openai.com/v1/chat/completions";
  }

  async generateResponse(messages) {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          messages,
          model: "gpt-3.5-turbo", 
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiKey}`,
          },
        }
      );
  
      return response.data;
    } catch (error) {

        console.error("ChatGPT API request failed:", error);
        throw error;
    }
  }
  
  
}

export default ChatGPTWrapper;
