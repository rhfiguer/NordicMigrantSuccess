
import OpenAI from 'openai';

export class AIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateRecommendation(scores: {
    economic: number;
    cultural: number;
    social: number;
    erotic: number;
  }): Promise<string> {
    const prompt = `Como experto en las teorías del capital social, cultural, económico y erótico de Pierre Bourdieu y Catherine Hakim, analiza los siguientes scores de un inmigrante en Noruega:

Capital Económico: ${scores.economic}%
Capital Cultural: ${scores.cultural}%
Capital Social: ${scores.social}%
Capital Erótico: ${scores.erotic}%

Genera un análisis breve (máximo 200 palabras) que:
1. Divida el análisis en secciones claramente separadas por tipo de capital
2. Se enfoque en los riesgos y consecuencias de no desarrollar cada capital
3. Use un tono profesional pero directo
4. NO incluya recomendaciones específicas
5. Termine con: "Para desarrollar estrategias concretas que te ayuden a mejorar tu capital migrante, te invitamos a participar en nuestro taller Capital Migrante MAAS."`;

    const completion = await this.openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4",
      temperature: 0.7,
      max_tokens: 500
    });

    return completion.choices[0].message.content || "No se pudo generar una recomendación";
  }
}
