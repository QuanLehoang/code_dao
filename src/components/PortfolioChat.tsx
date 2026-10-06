import { useState } from "react";
import { MessageCircle, X, Bot, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Conversation, ConversationContent } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputTextarea, PromptInputFooter, PromptInputSubmit } from "@/components/ai-elements/prompt-input";
import { profile, projects, skills, socials } from "@/lib/portfolio-data";

type ChatMessage = { role: "user" | "assistant"; content: string };
const suggestions = ["Bạn là ai?", "Bạn đang làm dự án gì?", "Bạn giỏi công nghệ nào?", "Liên hệ thế nào?"];

function localAnswer(question: string) {
  const text = question.toLocaleLowerCase("vi");
  if (/dự án|project|xây dựng|làm gì/.test(text)) return `Hiện có ${projects.length} dự án mẫu trong portfolio, gồm **${projects.slice(0, 3).map(p => p.title).join("**, **")}**. Bạn có thể xem thêm ở mục Dự án nhé!`;
  if (/công nghệ|kỹ năng|ngôn ngữ|giỏi|học gì/.test(text)) return `Mình đang học và sử dụng ${skills.flatMap(group => group.items.map(item => item.name)).join(", ")}. Mỗi ngày mình đều học thêm một chút!`;
  if (/liên hệ|email|facebook|github|instagram/.test(text)) return `Bạn có thể liên hệ qua **${profile.email}** hoặc các kênh ${socials.map(s => s.name).join(", ")}. Các liên kết hiện là dữ liệu mẫu nhé.`;
  if (/ai là|bạn là|giới thiệu|tên/.test(text)) return `Đây là portfolio của **${profile.name}** — ${profile.intro} Mình thích khám phá web, thiết kế và các sản phẩm nhỏ thú vị.`;
  if (/ai|robot|thật/.test(text)) return "Mình là trợ lý trả lời mẫu chạy ngay trên trang, **chưa kết nối dịch vụ AI thật**. Mình chỉ trả lời dựa trên thông tin của portfolio này thôi nhé.";
  return `Mình là trợ lý trả lời mẫu của ${profile.name}, chưa kết nối AI thật. Bạn thử hỏi về dự án, kỹ năng hoặc cách liên hệ nhé!`;
}

export function PortfolioChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", content: `Xin chào! Mình là trợ lý trả lời mẫu của ${profile.name}. Bạn muốn biết điều gì về hành trình của mình?` }]);
  function send(text: string) {
    const value = text.trim();
    if (!value) return;
    setMessages(previous => [...previous, { role: "user", content: value }, { role: "assistant", content: localAnswer(value) }]);
  }
  return <div className="chat-root">
    {open && <section className="chat-window" aria-label="Trợ lý portfolio">
      <div className="chat-head"><div className="chat-identity"><span className="chat-avatar"><Bot size={21} /></span><div><strong>Bạn đồng hành nhỏ</strong><span>Trả lời mẫu · không dùng AI thật</span></div></div><Button size="icon" variant="ghost" aria-label="Đóng chat" onClick={() => setOpen(false)}><X size={18}/></Button></div>
      <Conversation className="chat-conversation"><ConversationContent className="gap-4 px-4 py-5">{messages.map((message, index) => <Message key={index} from={message.role} className={message.role === "user" ? "chat-user-message" : "chat-assistant-message"}><MessageContent><MessageResponse>{message.content}</MessageResponse></MessageContent></Message>)}</ConversationContent></Conversation>
      <div className="chat-bottom"><div className="chat-suggestions">{suggestions.map(s => <Button key={s} variant="outline" size="sm" onClick={() => send(s)}>{s} <ArrowUpRight size={12}/></Button>)}</div><PromptInput onSubmit={({ text }) => send(text)} className="chat-prompt"><PromptInputTextarea placeholder="Hỏi mình điều gì đó..." aria-label="Tin nhắn" /><PromptInputFooter className="justify-end"><PromptInputSubmit /></PromptInputFooter></PromptInput></div>
    </section>}
    <Button className="chat-trigger" aria-label={open ? "Đóng trợ lý" : "Mở trợ lý"} onClick={() => setOpen(!open)}>{open ? <X size={22}/> : <MessageCircle size={23}/>}<span className="sr-only">{open ? "Đóng" : "Mở"} chat</span></Button>
  </div>;
}
