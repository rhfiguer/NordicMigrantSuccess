
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
    try {
      const jsonData = JSON.parse(recommendation);
      
      const sections = [
        { type: 'economic', title: 'Capital Económico' },
        { type: 'cultural', title: 'Capital Cultural' },
        { type: 'social', title: 'Capital Social' },
        { type: 'erotic', title: 'Capital Erótico' }
      ];

      return sections
        .map(section => {
          const data = jsonData[section.type];
          if (!data) return '';
          
          return `
            <div style="margin-bottom: 20px;">
              <h3 style="color: #2C3E50; margin-bottom: 10px;">${section.title}: ${data.score}%</h3>
              <p>${data.analysis}</p>
            </div>
          `;
        })
        .filter(Boolean)
        .join('\n\n');
        
    } catch (error) {
      console.error('Error parsing recommendation JSON:', error);
      // Fallback al formato anterior si hay error
      const parts = recommendation.split(/(?=Capital\s+\w+:|Para\s+desarrollar)/);
      return parts
        .filter(part => part.trim())
        .map(part => `<p style="margin-bottom: 20px;">${part.trim()}</p>`)
        .join('\n\n');
    }
  }

  async sendBankTransferEmail(to: string, workshopName: string, price: number) {
    const html = `
      <h1>Información para Transferencia Bancaria - ${workshopName}</h1>
      
      <p>Gracias por tu interés en nuestro taller. Para completar tu inscripción, sigue estos pasos:</p>
      
      <div style="background-color: #F8F9FA; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2>Datos para la transferencia:</h2>
        <ul style="list-style-type: none; padding-left: 0;">
          <li>🏦 <strong>Banco:</strong> [NOMBRE DEL BANCO]</li>
          <li>💳 <strong>Número de cuenta:</strong> [NÚMERO]</li>
          <li>👤 <strong>Titular:</strong> [NOMBRE]</li>
          <li>💰 <strong>Monto:</strong> ${price} NOK</li>
        </ul>
      </div>

      <p>Por favor, después de realizar la transferencia:</p>
      <ol>
        <li>Responde a este correo adjuntando el comprobante</li>
        <li>Incluye la siguiente información:
          <ul>
            <li>Tu nombre completo</li>
            <li>Fecha de la transferencia</li>
            <li>Monto transferido</li>
          </ul>
        </li>
      </ol>

      <p>Confirmaremos tu inscripción en un plazo de 24-48 horas hábiles.</p>
      
      <p><strong>Nota:</strong> Si tienes alguna pregunta, no dudes en contactarnos.</p>
    `;

    return this.sendEmail(to, `Información de Pago - ${workshopName}`, html);
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
