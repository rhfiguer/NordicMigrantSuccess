import { useState, useEffect } from 'react';
import { useQuiz } from '@/hooks/use-quiz';
import { QuizQuestion } from '@/types/quiz';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { scrollToElement } from '@/lib/utils';

interface QuizProps {
  questions: QuizQuestion[];
}

const QuizOptions = [
  { value: 1, label: "Bajo nivel (Necesita mejorar)" },
  { value: 2, label: "Nivel básico (En desarrollo)" },
  { value: 3, label: "Nivel medio (Adecuado)" },
  { value: 4, label: "Nivel alto (Excelente)" }
];

const DiagnosticQuiz: React.FC<QuizProps> = ({ questions }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (questions.length > 0) {
      setIsLoaded(true);
    }
  }, [questions]);

  const {
    currentStep,
    totalSteps,
    currentQuestion,
    responses,
    isSubmitting,
    result,
    isLastStep,
    showResults,
    updateResponse,
    goToNext,
    goToPrevious,
    submitQuiz,
    reset
  } = useQuiz({
    questions: isLoaded ? questions : Array(11).fill({ id: 0, question: '', category: '', order: 0 }) 
  });

  const progress = Math.floor((currentStep / totalSteps) * 100);

  const handleOptionChange = (value: string) => {
    if (currentQuestion) {
      updateResponse(currentQuestion.order, Number(value));
    }
  };

  const handleNextClick = () => {
    if (isLastStep) {
      submitQuiz();
    } else {
      goToNext();
    }
  };

  // Determine if next button should be enabled
  const isNextDisabled = () => {
    if (currentQuestion) {
      const responseKey = `q${currentQuestion.order}` as keyof typeof responses;
      return !responses[responseKey] && !showResults;
    }
    return false;
  };

  return (
    <section id="diagnostico" className="py-16 bg-gradient-to-br from-primary-light to-primary scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-6 md:p-10">
            <h2 className="font-poppins font-bold text-2xl md:text-3xl text-center mb-3 text-primary">
              Evalúa tu Capital Migrante
            </h2>
            <p className="text-center text-neutral-600 mb-10">
              Responde estas preguntas para descubrir tu nivel actual de integración y las áreas donde puedes mejorar
            </p>

            {!isLoaded ? (
              <div className="flex justify-center items-center h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div id="quiz-container">
                <div className="quiz-progress mb-6">
                  <Progress value={progress} className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden" />
                  <div className="flex justify-between text-sm text-neutral-500 mt-1">
                    <span id="current-question">
                      {showResults ? 'Resultados' : `Pregunta ${currentStep + 1} de ${totalSteps}`}
                    </span>
                    <span id="completion-status">{progress}% Completado</span>
                  </div>
                </div>

                <ScrollArea className="h-[400px] rounded-md border p-4">
                  {showResults ? (
                    <div className="text-center py-6">
                      <h3 className="font-poppins font-bold text-xl md:text-2xl mb-4 text-primary">
                        Tu Diagnóstico de Capital MAAS
                      </h3>
                      <div className="mx-auto w-32 h-32 rounded-full border-8 border-secondary flex items-center justify-center mb-6">
                        <span id="quiz-score" className="text-3xl font-bold text-primary">
                          {result?.score || 0}%
                        </span>
                      </div>
                      <Card className="mb-8">
                        <CardContent className="pt-6">
                          <p className="mb-2 font-semibold">¡Diagnóstico completado!</p>
                          <p>{result?.recommendation || 'Gracias por completar el diagnóstico.'}</p>
                        </CardContent>
                      </Card>
                      
                      <div className="space-y-4">
                        <p>Descubre cómo mejorar tu capital migrante y acelerar tu integración:</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <Button
                            onClick={() => scrollToElement('inscripcion')}
                            className="bg-primary hover:bg-primary-dark"
                          >
                            Inscríbete al taller completo
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={reset}
                          >
                            Reiniciar diagnóstico
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-poppins font-semibold text-lg mb-4">
                        {currentQuestion?.order}. {currentQuestion?.category}
                      </h3>
                      <p className="mb-6">{currentQuestion?.question}</p>
                      
                      <RadioGroup 
                        value={currentQuestion ? responses[`q${currentQuestion.order}` as keyof typeof responses]?.toString() : undefined}
                        onValueChange={handleOptionChange}
                        className="space-y-3"
                      >
                        {QuizOptions.map((option) => (
                          <div 
                            key={option.value}
                            className="flex items-center space-x-2 p-3 border border-neutral-300 rounded-lg hover:border-primary hover:bg-neutral-50 cursor-pointer"
                          >
                            <RadioGroupItem value={option.value.toString()} id={`q${currentQuestion?.order}-${option.value}`} />
                            <Label htmlFor={`q${currentQuestion?.order}-${option.value}`}>{option.label}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  )}
                </ScrollArea>

                {!showResults && (
                  <div className="flex justify-between mt-8">
                    <Button
                      variant="outline"
                      className="px-6 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={goToPrevious}
                      disabled={currentStep === 0}
                    >
                      Anterior
                    </Button>
                    <Button
                      className="px-6 py-2 bg-[#D4AF37] hover:bg-[#C09F2F] text-white rounded-md transition"
                      onClick={handleNextClick}
                      disabled={isNextDisabled() || isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Procesando...
                        </div>
                      ) : isLastStep ? (
                        'Ver resultados'
                      ) : (
                        'Siguiente'
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiagnosticQuiz;
