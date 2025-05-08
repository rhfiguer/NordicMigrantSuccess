
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
    const prompt = `Como experto en las teorías del capital social, cultural, económico y erótico de Pierre Bourdieu y Catherine Hakim, analiza los siguientes scores y genera una respuesta en formato JSON:

Capital Económico: ${scores.economic}%
Capital Cultural: ${scores.cultural}%
Capital Social: ${scores.social}%
Capital Erótico: ${scores.erotic}%

Genera un análisis en formato JSON que contenga:
{
  "economic": {
    "score": number,
    "analysis": string (análisis específico del capital económico, máximo 2 líneas)
  },
  "cultural": {
    "score": number,
    "analysis": string (análisis específico del capital cultural, máximo 2 líneas)
  },
  "social": {
    "score": number,
    "analysis": string (análisis específico del capital social, máximo 2 líneas)
  },
  "erotic": {
    "score": number,
    "analysis": string (análisis específico del capital erótico, máximo 2 líneas)
  }
}

Reglas para el análisis:
1. Usa un tono personal y directo ("tu capital", "podrías enfrentar")
2. Para scores < 70%, enfatiza riesgos específicos
3. Para scores > 70%, solo menciona la importancia de mantenerlo
4. Mantén un tono profesional pero empático
5. NO incluyas recomendaciones específicas`;

    const completion = await this.openai.chat.completions.create({
      messages: [{ 
        role: "user", 
        content: prompt,
        response_format: { type: "json_object" }
      }],
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4",
      temperature: 0.7,
      max_tokens: 500
    });

    return completion.choices[0].message.content || "No se pudo generar una recomendación";
  }
}
