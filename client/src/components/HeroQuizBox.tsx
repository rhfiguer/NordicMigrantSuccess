import { useState, useEffect } from 'react';
import { useQuiz } from '@/hooks/use-quiz';
import { useQuizStore } from '@/hooks/use-quiz-store';
import { QuizQuestion } from '@/types/quiz';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { scrollToElement } from '@/lib/utils';

interface HeroQuizBoxProps {
  questions: QuizQuestion[];
  onGetFullDiagnostic?: () => void;
}

const QuizOptions = [
  { value: 1, label: "Bajo" },
  { value: 2, label: "Básico" },
  { value: 3, label: "Medio" },
  { value: 4, label: "Alto" }
];

const HeroQuizBox: React.FC<HeroQuizBoxProps> = ({ questions, onGetFullDiagnostic }) => {
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

  const handleNextClick = async () => {
    if (isLastStep) {
      const result = await submitQuiz();
      if (result) {
        const quizResults = {
          score: result.score,
          categoryScores: result.categoryScores,
          recommendation: result.recommendation
        };
        console.log('Storing quiz results:', quizResults);
        localStorage.setItem('quizResults', JSON.stringify(quizResults));
        useQuizStore.getState().setQuizResults(quizResults);
        useQuizStore.getState().setShowForm(true); //Added this line
        const resultsElement = document.getElementById('quiz-results');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
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

  const handleCompleteQuiz = () => {
    if (onGetFullDiagnostic) {
      onGetFullDiagnostic();
    } else {
      scrollToElement('diagnostico');
    }
  };

  return (
    <Card className="shadow-lg border w-full max-w-lg bg-white rounded-xl overflow-hidden">
      <CardHeader className="bg-primary text-white pb-2">
        <CardTitle className="text-lg text-center font-bold">
          EVALUA TU CAPITAL DE MIGRANTE MAAS
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        {!isLoaded ? (
          <div className="flex justify-center items-center h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div id="hero-quiz-container">
            <div className="quiz-progress mb-3">
              <Progress value={progress} className="h-1.5 w-full bg-neutral-200 rounded-full overflow-hidden" />
              <div className="flex justify-between text-xs text-neutral-500 mt-1">
                <span>
                  {showResults ? 'Resultados' : `Pregunta ${currentStep + 1}/${totalSteps}`}
                </span>
                <span>{progress}% Completado</span>
              </div>
            </div>

            <ScrollArea className={`${showResults ? 'h-[360px]' : 'h-[280px]'}`}>
              {showResults ? (
                <div className="text-center py-4">
                  <h3 className="font-semibold text-lg mb-3 text-primary">
                    Resultados Preliminares
                  </h3>
                  <div className="mx-auto w-24 h-24 rounded-full border-4 border-secondary flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary">
                      {result?.score || 0}%
                    </span>
                  </div>
                  <div className="mb-3 p-3 bg-secondary/20 rounded-lg shadow-sm">
                    <p className="text-sm font-medium">¡Tu diagnóstico está listo!</p>
                    <p className="text-sm mt-1">Regístrate para recibir:</p>
                    <ul className="text-sm mt-1 text-left list-disc list-inside">
                      <li>Tu diagnóstico completo</li>
                      <li>Recomendaciones personalizadas</li>
                      <li>Plan de acción sugerido</li>
                    </ul>
                  </div>

                  <Button
                    onClick={() => {
                      if (result) {
                        const quizResults = {
                          score: result.score,
                          categoryScores: {
                            economic: result.categoryScores.economic,
                            cultural: result.categoryScores.cultural,
                            social: result.categoryScores.social,
                            erotic: result.categoryScores.erotic
                          },
                          recommendation: result.recommendation
                        };
                        console.log('Storing quiz results:', quizResults);
                        localStorage.setItem('quizResults', JSON.stringify(quizResults));
                        useQuizStore.getState().setQuizResults(quizResults);
                        useQuizStore.getState().setShowForm(true);
                      }
                    }}
                    className="w-full rounded-lg shadow-sm bg-[#D4AF37] hover:bg-[#C09F2F] text-white font-semibold"
                  >
                    Obtener mi diagnóstico completo
                  </Button>
                </div>
              ) : (
                <div>
                  <h3 className="font-semibold text-xs mb-1">
                    {currentQuestion?.category}
                  </h3>
                  <p className="mb-2 text-sm leading-snug">{currentQuestion?.question}</p>

                  <RadioGroup 
                    key={currentQuestion?.order}
                    value={currentQuestion ? responses[`q${currentQuestion.order}` as keyof typeof responses]?.toString() : undefined}
                    onValueChange={handleOptionChange}
                    className="space-y-1.5"
                  >
                    {QuizOptions.map((option) => (
                      <div 
                        key={option.value}
                        className="flex items-center space-x-2 py-2 px-3 border border-neutral-300 rounded-lg hover:border-primary hover:bg-neutral-50 cursor-pointer shadow-sm"
                      >
                        <RadioGroupItem value={option.value.toString()} id={`hero-q${currentQuestion?.order}-${option.value}`} />
                        <Label className="text-sm" htmlFor={`hero-q${currentQuestion?.order}-${option.value}`}>{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
            </ScrollArea>

            {!showResults && (
              <div className="flex justify-between mt-4">
                <Button
                  variant="outline"
                  className="px-4 py-1 text-sm border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  onClick={goToPrevious}
                  disabled={currentStep === 0}
                >
                  Anterior
                </Button>
                <Button
                  className="px-4 py-1 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition shadow-sm"
                  onClick={handleNextClick}
                  disabled={isNextDisabled() || isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
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
      </CardContent>
    </Card>
  );
};

export default HeroQuizBox;