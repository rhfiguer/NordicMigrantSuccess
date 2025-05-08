
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
    const prompt = `Como experto en las teorías del capital social, cultural, económico y erótico de Pierre Bourdieu y Catherine Hakim, genera una recomendación personalizada para un inmigrante en Noruega con los siguientes scores:

Capital Económico: ${scores.economic}%
Capital Cultural: ${scores.cultural}%
Capital Social: ${scores.social}%
Capital Erótico: ${scores.erotic}%

La recomendación debe:
1. Analizar los riesgos específicos de las áreas con menor puntaje
2. Explicar las consecuencias de no desarrollar cada tipo de capital
3. Sugerir acciones concretas para mejorar
4. Usar un tono profesional pero empático
5. Mantener un límite de 300 palabras`;

    const completion = await this.openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4",
      temperature: 0.7,
      max_tokens: 500
    });

    return completion.choices[0].message.content || "No se pudo generar una recomendación";
  }
}
