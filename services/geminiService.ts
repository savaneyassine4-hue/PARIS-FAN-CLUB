
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const editImageWithAI = async (base64Image: string, prompt: string, mimeType: string = 'image/jpeg') => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1] || base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: `Modifie cette image selon les instructions suivantes en français: ${prompt}. Si l'utilisateur demande d'ajouter des éléments du PSG (maillot, logo, écharpe), assure-toi qu'ils soient fidèles aux couleurs bleu et rouge.`,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("Aucune image n'a été générée.");
  } catch (error) {
    console.error("AI Image Edit Error:", error);
    throw error;
  }
};

export const summarizeNews = async (newsText: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Résume brièvement cette actualité pour les fans du PSG à Abidjan: ${newsText}`,
    });
    return response.text;
  } catch (error) {
    return newsText;
  }
};
