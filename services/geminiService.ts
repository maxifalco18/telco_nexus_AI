import { GoogleGenAI } from "@google/genai";
import { Message, MessageRole, DocumentChunk } from '../types';
import { KNOWLEDGE_BASE } from '../constants';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Simulate a Vector Similarity Search
// In a real app, this would call a backend vector DB (Milvus, Pinecone, pgvector)
const retrieveDocuments = async (query: string): Promise<DocumentChunk[]> => {
  // Simple keyword matching simulation for the prototype
  const terms = query.toLowerCase().split(' ');
  
  const scoredDocs = KNOWLEDGE_BASE.map(doc => {
    let score = 0;
    terms.forEach(term => {
      if (doc.content.toLowerCase().includes(term) || doc.source.toLowerCase().includes(term)) {
        score += 0.2;
      }
    });
    return { ...doc, score: Math.min(score, 0.99) }; // Cap score
  });

  // Filter out low relevance and sort
  const relevantDocs = scoredDocs
    .filter(doc => doc.score > 0.1)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3); // Top 3

  // If no documents match well, return a generic architecture doc to show *something*
  if (relevantDocs.length === 0) {
    return [KNOWLEDGE_BASE[2]]; 
  }

  return relevantDocs;
};

export const sendMessageToRAG = async (
  currentMessage: string,
  history: Message[]
): Promise<{ text: string; retrievedDocs: DocumentChunk[] }> => {
  
  // 1. Retrieval Step
  const retrievedDocs = await retrieveDocuments(currentMessage);
  
  // 2. Augmented Prompt Construction
  const contextString = retrievedDocs.map(doc => 
    `Source: ${doc.source}\nContent: ${doc.content}`
  ).join('\n\n');

  const systemInstruction = `
    You are an expert AI Assistant for TelcoNexus, a major telecommunications company.
    Your role is to assist network engineers and data scientists by answering questions using ONLY the provided context.
    
    Strict Rules:
    1. Use the provided "Context" to answer the user's question.
    2. If the answer is not in the context, state that you don't have that information in the internal knowledge base.
    3. Be professional, concise, and technical. Use telecom acronyms (HSS, UPF, SLA) correctly.
    4. Format your response with clear headings or bullet points if necessary.
    5. Do NOT mention that you are a Google AI. You are the TelcoNexus Internal Assistant.
  `;

  const finalPrompt = `
    Context Information:
    ${contextString}

    User Question:
    ${currentMessage}
  `;

  // 3. Generation Step
  try {
    const model = 'gemini-2.5-flash';
    const response = await ai.models.generateContent({
      model: model,
      contents: [
        // Convert history to format if needed, for now we just send the current prompt 
        // effectively as a single turn with heavy context injection.
        // In a full implementation, we'd format 'history' into the contents array.
        { role: 'user', parts: [{ text: finalPrompt }] }
      ],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.2, // Low temperature for factual RAG
      }
    });

    return {
      text: response.text || "No response generated.",
      retrievedDocs: retrievedDocs
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "Error: Unable to connect to the inference engine. Please check your network connection or API key configuration.",
      retrievedDocs: []
    };
  }
};