import { createServerFn } from "@tanstack/react-start";
import OpenAI from "openai";
import { portfolioAiData } from "./portfolio-ai-data";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type AskAiInput = {
  messages: ChatMessage[];
};

export const askChatGPT = createServerFn({ method: "POST" })
  .validator((input: AskAiInput) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error("Chưa cấu hình OPENAI_API_KEY");
    }

    const openai = new OpenAI({
      apiKey,
    });

    const response = await openai.responses.create({
      model: "gpt-6-luna",

      instructions: `
Bạn là AI Assistant chính thức của Hoàng Quân.

${portfolioAiData}

Hãy:
- Trả lời bằng tiếng Việt.
- Trả lời tự nhiên, thân thiện.
- Ưu tiên thông tin trong dữ liệu portfolio.
- Không tự bịa thông tin cá nhân.
- Nếu không biết, nói rõ là chưa có thông tin.
      `.trim(),

      input: data.messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    });

    return {
      message: response.output_text,
    };
  });
