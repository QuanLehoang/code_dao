import { useState, type FormEvent } from "react";
import {
  Bot,
  Loader2,
  MessageCircle,
  Send,
  Sparkles,
  User,
} from "lucide-react";
import { askChatGPT } from "@/lib/ai-chat.functions";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const suggestions = [
  "Giới thiệu về Hoàng Quân",
  "Hoàng Quân đang học gì?",
  "Các dự án của Hoàng Quân",
  "Hoàng Quân biết lập trình gì?",
];

export function AskAiSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Xin chào! Mình là AI đẹp trai nhất thế giới của portfolio Hoàng Quân. Mình có thể giúp bạn tìm hiểu về Hoàng Quân, các dự án, kỹ năng, hành trình học tập và công nghệ.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(message?: string) {
    const content = (message ?? input).trim();

    if (!content || loading) return;

    const userMessage: Message = {
      role: "user",
      content,
    };

    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const result = await askChatGPT({
        data: {
          messages: nextMessages,
        },
      });

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: result.message,
        },
      ]);
    } catch (error) {
      console.error("AI đẹp trai nhất thế giới error:", error);

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            "Xin lỗi, hiện tại mình chưa thể kết nối với AI đẹp trai nhất thế giới. Hãy kiểm tra OPENAI_API_KEY và server của website.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage();
  }

  return (
    <section id="ask-ai" className="section ask-ai-section">
      <div className="container">
        <div className="ask-ai-heading">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            05 / CHAT VỚI AI
          </span>

          <h2>
            Hỏi <em>AI đẹp trai nhất thế giới.</em>
          </h2>

          <p>
            Trò chuyện với trợ lý AI để khám phá portfolio, dự án, kỹ năng và
            hành trình học tập của Hoàng Quân.
          </p>
        </div>

        <div className="ai-chat-box">
          <div className="ai-chat-header">
            <div className="ai-chat-brand">
              <div className="ai-chat-avatar">
                <Sparkles size={20} />
              </div>

              <div>
                <strong>AI đẹp trai nhất thế giới</strong>
                <span>
                  <span className="ai-online-dot" />
                  Đang hoạt động
                </span>
              </div>
            </div>

            <div className="ai-chat-status">
              <Bot size={17} />
              AI Assistant
            </div>
          </div>

          <div className="ai-chat-messages">
            {messages.map((message, index) => {
              const isUser = message.role === "user";

              return (
                <div
                  key={`${message.role}-${index}`}
                  className={`ai-message ${
                    isUser ? "ai-message-user" : "ai-message-assistant"
                  }`}
                >
                  <div className="ai-message-avatar">
                    {isUser ? <User size={17} /> : <Bot size={17} />}
                  </div>

                  <div className="ai-message-content">
                    <span className="ai-message-name">
                      {isUser ? "Bạn" : "AI đẹp trai nhất thế giới"}
                    </span>

                    <p>{message.content}</p>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="ai-message ai-message-assistant">
                <div className="ai-message-avatar">
                  <Bot size={17} />
                </div>

                <div className="ai-message-content">
                  <span className="ai-message-name">AI đẹp trai nhất thế giới</span>

                  <div className="ai-typing">
                    <Loader2 size={16} className="ai-loading-icon" />
                    Đang suy nghĩ...
                  </div>
                </div>
              </div>
            )}
          </div>

          {messages.length === 1 && (
            <div className="ai-suggestions">
              <span>Gợi ý:</span>

              <div>
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => void sendMessage(suggestion)}
                    disabled={loading}
                  >
                    <MessageCircle size={14} />
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form className="ai-chat-input" onSubmit={handleSubmit}>
            <div className="ai-input-wrapper">
              <MessageCircle size={18} />

              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Hỏi AI đẹp trai nhất thế giới về Hoàng Quân..."
                disabled={loading}
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              className="ai-send-button"
              disabled={!input.trim() || loading}
              aria-label="Gửi tin nhắn"
            >
              {loading ? (
                <Loader2 size={18} className="ai-loading-icon" />
              ) : (
                <Send size={18} />
              )}
            </button>
          </form>

          <div className="ai-chat-footer">
            <span>
              <Sparkles size={13} />
              Powered by AI đẹp trai nhất thế giới
            </span>

            <span>AI có thể đôi khi đưa ra thông tin chưa chính xác.</span>
          </div>
        </div>
      </div>
    </section>
  );
}