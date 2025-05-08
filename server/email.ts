
import nodemailer from 'nodemailer';

export class EmailService {
  private transporter: nodemailer.Transporter;

  private constructor(config: { user: string; pass: string }) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.user,
        pass: config.pass
      }
    });
  }

  static initialize(config: { user: string; pass: string }) {
    return new EmailService(config);
  }

  private formatRecommendation(recommendation: string): string {
    // Separar el texto por categorías y la invitación final
    const parts = recommendation.split(/(?=Capital\s+\w+:|Para\s+desarrollar)/);
    
    // Filtrar líneas vacías y formatear cada parte
    return parts
      .filter(part => part.trim())
      .map(part => `<p style="margin-bottom: 20px;">${part.trim()}</p>`)
      .join('\n\n');
  }

  async sendEmail(to: string, subject: string, html: string) {
    // Si el contenido incluye la recomendación del quiz
    if (html.includes('Resultados de tu Diagnóstico')) {
      // Encontrar la sección de recomendación
      const recommendationMatch = html.match(/<p style="background-color: #FFFFFF; padding: 15px[^>]*>(.*?)<\/p>/s);
      
      if (recommendationMatch) {
        const originalRecommendation = recommendationMatch[1];
        const formattedRecommendation = this.formatRecommendation(originalRecommendation);
        
        // Reemplazar la recomendación original con la formateada
        html = html.replace(
          recommendationMatch[0],
          `<div style="background-color: #FFFFFF; padding: 15px; border-left: 4px solid #2196F3; margin: 10px 0;">
            ${formattedRecommendation}
          </div>`
        );
      }
    }

    console.log('Enviando email:', {
      to,
      subject,
      html: html.substring(0, 500) + '...' // Solo mostramos los primeros 500 caracteres
    });
    
    return await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html
    });
  }
}
