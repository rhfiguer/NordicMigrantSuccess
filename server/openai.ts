
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
    const prompt = `Como experto en las teorías del capital social, cultural, económico y erótico de Pierre Bourdieu y Catherine Hakim, analiza los siguientes scores y genera un mensaje personal y directo para el usuario:

Capital Económico: ${scores.economic}%
Capital Cultural: ${scores.cultural}%
Capital Social: ${scores.social}%
Capital Erótico: ${scores.erotic}%

Genera un análisis breve (máximo 200 palabras) que:
1. Use un tono personal y directo, dirigiéndote al usuario como "tú" y usando frases como "tu capital", "podrías enfrentar", "tus fortalezas"
2. Divida el análisis en secciones claramente separadas por tipo de capital
3. Se enfoque en los riesgos y consecuencias personales de no desarrollar cada capital
4. Mantenga un tono profesional pero cercano y empático
5. NO incluya recomendaciones específicas
6. Termine con: "Para desarrollar estrategias concretas que te ayuden a mejorar tu capital migrante, te invitamos a participar en nuestro taller Capital Migrante MAAS."`;

    const completion = await this.openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4",
      temperature: 0.7,
      max_tokens: 500
    });

    return completion.choices[0].message.content || "No se pudo generar una recomendación";
  }
}
