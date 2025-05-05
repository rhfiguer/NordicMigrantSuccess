import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRecommendation(score: number): string {
  if (score < 40) {
    return "Tu puntuación indica que hay múltiples áreas donde puedes fortalecer tu capital migrante. El taller te será extremadamente beneficioso.";
  } else if (score < 60) {
    return "Tienes algunas bases, pero aún hay importantes oportunidades de mejora en tu integración. El taller te ayudará a potenciar tus fortalezas.";
  } else {
    return "Has construido buenas bases, pero el taller te permitirá optimizar estratégicamente tu capital migrante para lograr una integración plena.";
  }
}

export function getQuizProgress(currentStep: number, totalSteps: number): number {
  return Math.floor((currentStep / totalSteps) * 100);
}

export function scrollToElement(elementId: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
