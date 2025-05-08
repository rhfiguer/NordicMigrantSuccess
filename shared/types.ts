
export class QuizResponse {
  private responses: Record<string, number>;
  public score: number;
  public categoryScores: {
    economic: number;
    cultural: number;
    social: number;
    social: number;
    erotic: number;
  };
  public recommendation: string;

  constructor(responses: Record<string, number>) {
    this.responses = responses;
    this.score = 0;
    this.categoryScores = {
      economic: 0,
      cultural: 0,
      social: 0, 
      erotic: 0
    };
    this.calculateScores();
  }

  private calculateScores() {
    const categories = {
      economic: ['q1', 'q2'],
      cultural: ['q3', 'q4', 'q5'],
      social: ['q6', 'q7', 'q8'],
      erotic: ['q9', 'q10', 'q11']
    };

    let totalSum = 0;
    let totalAnswers = 0;

    // Calculate category scores
    for (const [category, questions] of Object.entries(categories)) {
      const validAnswers = questions
        .map(q => this.responses[q])
        .filter(Boolean);

      if (validAnswers.length > 0) {
        const categoryAvg = validAnswers.reduce((sum, val) => sum + val, 0) / validAnswers.length;
        this.categoryScores[category] = Math.round((categoryAvg - 1) / 3 * 100);
        totalSum += validAnswers.reduce((sum, val) => sum + val, 0);
        totalAnswers += validAnswers.length;
      }
    }

    // Calculate overall score
    const avgScore = totalSum / totalAnswers;
    this.score = Math.round((avgScore - 1) / 3 * 100);
  }

  public async generateRecommendation(aiService: any) {
    this.recommendation = await aiService.generateRecommendation(this.categoryScores);
    return this;
  }

  public getEmailContent(name: string): string {
    return `
      <h1>¡Gracias por completar el diagnóstico, ${name}!</h1>
      <h2 style="color: #2C3E50; margin-top: 30px;">Resultados de tu Diagnóstico de Capital MAAS</h2>
      <div style="background-color: #F8F9FA; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="font-size: 18px;"><strong>Tu puntuación general:</strong> ${this.score}%</p>
        <h3 style="color: #34495E; margin-top: 20px;">Desglose por categorías:</h3>
        <ul style="list-style-type: none; padding: 0;">
          ${Object.entries(this.categoryScores).map(([category, score]) => `
            <li style="margin: 10px 0;">
              <strong>Capital ${category.charAt(0).toUpperCase() + category.slice(1)}:</strong>
              <div style="background-color: #E8E8E8; height: 20px; border-radius: 10px; margin-top: 5px;">
                <div style="background-color: #4CAF50; width: ${score}%; height: 100%; border-radius: 10px;"></div>
              </div>
              <span>${score}%</span>
            </li>
          `).join('')}
        </ul>
        <h3 style="color: #34495E; margin-top: 20px;">Recomendación personalizada:</h3>
        <p style="background-color: #FFFFFF; padding: 15px; border-left: 4px solid #2196F3; margin: 10px 0;">
          ${this.recommendation}
        </p>
      </div>`;
  }
}
