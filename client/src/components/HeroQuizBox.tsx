import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { scrollToElement } from '@/lib/utils';
import { QuizQuestion } from '@/types/quiz';

interface HeroQuizBoxProps {
  onGetFullDiagnostic?: () => void;
}

const HeroQuizBox: React.FC<HeroQuizBoxProps> = ({ onGetFullDiagnostic }) => {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  // Fetch quiz questions
  const { data: questions, isLoading } = useQuery<QuizQuestion[]>({
    queryKey: ['/api/quiz-questions'],
  });

  const handleGetFullDiagnostic = () => {
    if (onGetFullDiagnostic) {
      onGetFullDiagnostic();
    } else {
      scrollToElement('diagnostico');
    }
  };

  const toggleQuestion = (id: number) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  return (
    <Card className="shadow-lg border-2 border-secondary w-full max-w-md bg-white">
      <CardHeader className="bg-accent text-white pb-4">
        <CardTitle className="text-xl text-center">
          Auto-Evaluación
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="p-4">
              <p className="mb-4 text-sm text-foreground font-medium">
                Explora las 11 áreas que componen tu capital migrante en Noruega:
              </p>
              <div className="space-y-2">
                {questions?.map((question) => (
                  <div 
                    key={question.id} 
                    className="border border-secondary/30 rounded-md overflow-hidden"
                  >
                    <div 
                      className="p-3 bg-secondary/10 flex justify-between items-center cursor-pointer hover:bg-secondary/20"
                      onClick={() => toggleQuestion(question.id)}
                    >
                      <div className="font-medium text-sm">{question.category}</div>
                      <div className="text-primary text-lg">
                        {expandedQuestion === question.id ? '−' : '+'}
                      </div>
                    </div>
                    {expandedQuestion === question.id && (
                      <div className="p-3 bg-white text-sm">
                        {question.question}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="my-4 p-3 bg-secondary/20 rounded-lg text-center text-sm">
                <p className="font-medium">Evalúa estas 11 áreas para descubrir y potenciar tu capital migrante</p>
              </div>
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex justify-center px-6 pt-2 pb-6">
        <Button 
          className="w-full" 
          onClick={handleGetFullDiagnostic}
        >
          Iniciar Diagnóstico Completo
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HeroQuizBox;