import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { reviewText, sentiment, businessName } = await req.json();

    // Yahan hum prompt bhejenge AI ko
    const prompt = `
      You are a professional customer relations manager for ${businessName}. 
      Write a short, polite, and engaging reply to the following customer review.
      
      Review: "${reviewText}"
      Sentiment: ${sentiment}

      Instructions:
      1. If positive, thank them and invite them back.
      2. If negative, apologize sincerely and ask them to contact support.
      3. Keep it under 60 words.
    `;

    // Note: Yahan tum Google Gemini ya OpenAI ki API call lagaoge. 
    // Abhi ke liye main ek simulated professional response bhej raha hoon
    // taaki tum UI check kar sako.
    
    let aiReply = "";
    if (sentiment === "Positive") {
      aiReply = `Thank you so much for your kind words! We're thrilled to hear you had a great experience at ${businessName}. We look forward to serving you again soon!`;
    } else {
      aiReply = `We're truly sorry to hear about your experience. At ${businessName}, we strive for excellence and clearly missed the mark here. Please reach out to our support team so we can make this right.`;
    }

    return NextResponse.json({ reply: aiReply });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate reply" }, { status: 500 });
  }
}