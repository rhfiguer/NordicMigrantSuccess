import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { scrollToElement } from '@/lib/utils';

const QuizOptions = [
  { value: 1, label: "Bajo" },
  { value: 2, label: "Básico" },
  { value: 3, label: "Medio" },
  { value: 4, label: "Alto" }
];

interface HeroQuizBoxProps {
  onGetFullDiagnostic?: () => void;
}

const HeroQuizBox: React.FC<HeroQuizBoxProps> = ({ onGetFullDiagnostic }) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedValue) {
      setSubmitted(true);
    }
  };

  const handleGetFullDiagnostic = () => {
    if (onGetFullDiagnostic) {
      onGetFullDiagnostic();
    } else {
      scrollToElement('diagnostico');
    }
  };

  return (
    <Card className="shadow-lg border-2 border-secondary w-full max-w-md bg-white">
      <CardHeader className="bg-accent text-white pb-4">
        <CardTitle className="text-xl text-center">
          {submitted ? "Tu Respuesta" : "Evaluación Rápida"}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pb-4">
        {!submitted ? (
          <>
            <p className="mb-4 text-foreground font-medium">
              ¿Qué tan seguro/a te sientes con tu nivel de noruego para desenvolverte en situaciones cotidianas?
            </p>
            <RadioGroup 
              value={selectedValue} 
              onValueChange={setSelectedValue}
              className="space-y-2 mt-4"
            >
              {QuizOptions.map((option) => (
                <div 
                  key={option.value}
                  className="flex items-center space-x-2 p-2 border border-secondary/30 rounded-md hover:border-primary hover:bg-neutral-50 cursor-pointer"
                >
                  <RadioGroupItem value={option.value.toString()} id={`quick-q-${option.value}`} />
                  <Label htmlFor={`quick-q-${option.value}`}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </>
        ) : (
          <div className="text-center">
            <div className="mb-4">
              <p className="text-lg mb-1 font-semibold">
                Este es sólo el comienzo
              </p>
              <p className="text-sm text-muted-foreground">
                Completa el diagnóstico completo para descubrir tu potencial migrante en todas las áreas clave.
              </p>
            </div>
            
            <div className="my-6 p-4 bg-secondary/20 rounded-lg text-center">
              <p className="font-medium">El dominio del idioma es sólo una de las 11 áreas que componen tu capital migrante</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center px-6 pt-2 pb-6">
        {!submitted ? (
          <Button 
            className="w-full" 
            onClick={handleSubmit}
            disabled={!selectedValue}
          >
            Ver resultado
          </Button>
        ) : (
          <Button 
            className="w-full" 
            onClick={handleGetFullDiagnostic}
          >
            Diagnóstico completo
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default HeroQuizBox;