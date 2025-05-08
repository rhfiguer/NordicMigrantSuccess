import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useQuizStore } from '@/hooks/use-quiz-store';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import {useToast} from '@/hooks/use-toast';


const formSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  email: z.string().email({ message: 'Por favor, introduce un email válido' }),
});

const QuizResultForm = ({ quizResults }: { quizResults: any }) => { // Added prop type for quizResults
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast(); //Re-added useToast

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const storedResults = localStorage.getItem('quizResults');
      let quizResults = null;
      
      if (storedResults) {
        try {
          const parsedResults = JSON.parse(storedResults);
          if (!parsedResults.categoryScores) {
            throw new Error('No se encontraron los scores por categoría');
          }
          quizResults = {
            score: parsedResults.score,
            categoryScores: parsedResults.categoryScores,
            recommendation: parsedResults.recommendation
          };
        } catch (error) {
          console.error('Error parsing quiz results:', error);
          throw new Error('Error al procesar los resultados del diagnóstico');
        }
      }

      if (!quizResults) {
        throw new Error('No se encontraron los resultados del diagnóstico');
      }

      const response = await apiRequest('POST', '/api/register', {
        ...data,
        quizResults
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el registro');
      }

      setIsSuccess(true);
      form.reset();
      toast({ //Re-added success toast
        title: '¡Resultados enviados! 🎉',
        description: 'Te hemos enviado un correo con tu diagnóstico completo.',
        variant: 'default',
        className: 'bg-green-100 border-green-400 text-green-900 font-medium',
      });
    } catch (error) {
      console.error('Error:', error);
      toast({ //Re-added error toast
        title: 'Error al enviar',
        description: 'Ha ocurrido un error. Por favor intenta nuevamente.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6 md:p-8 rounded-xl shadow-lg max-w-md mx-auto">
      <h3 className="font-poppins font-semibold text-xl mb-4 text-center">Recibe tu diagnóstico completo</h3>

      {isSuccess ? (
        <div className="p-4 bg-green-100 text-green-800 rounded-md text-center">
          <Check className="h-8 w-8 mx-auto mb-2" />
          <h4 className="font-bold mb-2">¡Gracias!</h4>
          <p>Te hemos enviado un correo con tu diagnóstico completo.</p>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre completo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Enviando...' : 'Recibir diagnóstico'}
            </Button>
          </form>
        </Form>
      )}
    </Card>
  );
};

export default QuizResultForm;