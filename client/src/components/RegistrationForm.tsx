import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { apiRequest } from '@/lib/queryClient';
import { Check, Calendar, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  email: z.string().email({ message: 'Por favor, introduce un email válido' }),
  phone: z.string().optional(),
  countryOrigin: z.string().optional(),
  timeInNorway: z.string().optional(),
  acceptedPrivacy: z.boolean().refine(val => val === true, {
    message: 'Debes aceptar la política de privacidad',
  }),
  quizResults: z.any().optional(), // Added quizResults field
});

type FormData = z.infer<typeof formSchema>;

const RegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      countryOrigin: '',
      timeInNorway: '',
      acceptedPrivacy: false,
      quizResults: null, // Added default value
    },
  });

  const [showPaymentSelector, setShowPaymentSelector] = useState(false);
  const [registrationData, setRegistrationData] = useState<FormData | null>(null);

  const handlePaymentMethodSelect = (method: 'stripe' | 'transfer') => {
    // Aquí manejaremos la selección del método de pago
    if (method === 'stripe') {
      // Implementaremos Stripe más adelante
      console.log('Stripe selected');
    } else {
      // Enviar email con datos de transferencia
      handleTransferPayment();
    }
  };

  const handleTransferPayment = async () => {
    if (!registrationData) return;
    
    try {
      const storedResults = localStorage.getItem('quizResults');
      let quizResults = null;
      
      if (storedResults) {
        try {
          const parsedResults = JSON.parse(storedResults);
          quizResults = {
            score: parsedResults.score,
            categoryScores: parsedResults.categoryScores,
            recommendation: parsedResults.recommendation
          };
          console.log('Sending quiz results:', quizResults); // Para debug
        } catch (error) {
          console.error('Error parsing quiz results:', error);
        }
      }

      const response = await apiRequest('POST', '/api/register', {
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        countryOrigin: data.countryOrigin || undefined,
        timeInNorway: data.timeInNorway || undefined,
        acceptedPrivacy: data.acceptedPrivacy,
        quizResults: quizResults,
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          form.setError('email', { 
            type: 'manual',
            message: 'Este email ya está registrado'
          });
          form.setFocus('email');
          toast({
            title: 'Email ya registrado',
            description: 'Por favor utiliza otro email para registrarte',
            variant: 'destructive',
          });
          setIsSubmitting(false);
          return;
        }
        throw new Error(result.message || 'Error en el registro');
      }

      setIsSuccess(true);
      form.reset();
      toast({
        title: '¡Registro exitoso! 🎉',
        description: 'Te hemos enviado un correo con más información sobre el taller.\n⚠️ IMPORTANTE: Si no lo recibes en unos segundos, por favor revisa tu carpeta de spam.',
        variant: 'default',
        className: 'bg-green-100 border-green-400 text-green-900 font-medium',
      });
    } catch (error) {
      console.error('Error registering:', error);
      toast({
        title: 'Error en el registro',
        description: 'Ha ocurrido un error. Por favor intenta nuevamente o contáctanos directamente.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-poppins font-bold text-2xl md:text-3xl mb-3 text-primary">
                ¡Invierte en tu futuro MAAS en Noruega!
              </h2>
              <p className="text-lg text-neutral-700 mb-6">
                Únete al taller "Despliega tu Capital Migrante MAAS" y comienza a construir la vida que siempre has soñado.
              </p>

              <div className="bg-neutral-100 p-6 rounded-lg mb-8">
                <h3 className="font-poppins font-semibold text-lg mb-4">¿Qué te llevarás de este taller?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="text-secondary mt-1 mr-2 h-5 w-5" />
                    <span>Una comprensión profunda de los factores clave para la integración</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-secondary mt-1 mr-2 h-5 w-5" />
                    <span>Un autodiagnóstico personalizado de tu capital actual</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-secondary mt-1 mr-2 h-5 w-5" />
                    <span>Estrategias prácticas para fortalecer tu capital económico, social y cultural</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-secondary mt-1 mr-2 h-5 w-5" />
                    <span>Mayor confianza para navegar las normas sociales y culturales</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-secondary mt-1 mr-2 h-5 w-5" />
                    <span>Una red de apoyo junto a otros inmigrantes con aspiraciones similares</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-secondary mt-1 mr-2 h-5 w-5" />
                    <span>Un plan de acción personalizado para tu integración exitosa</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center p-6 bg-blue-600 rounded-lg">
                <Calendar className="text-2xl text-white mr-4 h-8 w-8" />
                <div>
                  <p className="font-semibold text-white text-lg">Próximas fechas:</p>
                  <p className="text-white text-base">Inicia el Jueves 5 de junio. 4 sesiones totales (una por semana, los jueves)</p>
                </div>
              </div>
            </div>

            <Card className="bg-neutral-100 p-6 md:p-8 rounded-xl shadow-lg">
              <h3 className="font-poppins font-semibold text-xl mb-4 text-center">Regístrate y recibe información completa</h3>
              <p className="text-sm text-neutral-600 mb-6 text-center">
                Tus datos serán tratados con confidencialidad y únicamente para gestionar tu inscripción al taller.
              </p>

              {isSuccess ? (
                <div className="p-4 bg-green-100 text-green-800 rounded-md text-center">
                  <Check className="h-8 w-8 mx-auto mb-2" />
                  <h4 className="font-bold mb-2">¡Gracias por tu registro!</h4>
                  <p>Te hemos enviado un correo con más información sobre el taller.</p>
                  <p className="text-sm mt-2">⚠️ Si no lo recibes en unos segundos, por favor revisa tu carpeta de spam.</p>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-neutral-700">
                            Nombre completo*
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            />
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
                          <FormLabel className="text-sm font-medium text-neutral-700">
                            Correo electrónico*
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              {...field}
                              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-neutral-700">
                            Teléfono
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              {...field}
                              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="countryOrigin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-neutral-700">
                            País de origen
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary">
                                <SelectValue placeholder="Selecciona tu país" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="AR">Argentina</SelectItem>
                              <SelectItem value="BO">Bolivia</SelectItem>
                              <SelectItem value="CL">Chile</SelectItem>
                              <SelectItem value="CO">Colombia</SelectItem>
                              <SelectItem value="CR">Costa Rica</SelectItem>
                              <SelectItem value="CU">Cuba</SelectItem>
                              <SelectItem value="EC">Ecuador</SelectItem>
                              <SelectItem value="SV">El Salvador</SelectItem>
                              <SelectItem value="GT">Guatemala</SelectItem>
                              <SelectItem value="HN">Honduras</SelectItem>
                              <SelectItem value="MX">México</SelectItem>
                              <SelectItem value="NI">Nicaragua</SelectItem>
                              <SelectItem value="PA">Panamá</SelectItem>
                              <SelectItem value="PY">Paraguay</SelectItem>
                              <SelectItem value="PE">Perú</SelectItem>
                              <SelectItem value="PR">Puerto Rico</SelectItem>
                              <SelectItem value="DO">República Dominicana</SelectItem>
                              <SelectItem value="UY">Uruguay</SelectItem>
                              <SelectItem value="VE">Venezuela</SelectItem>
                              <SelectItem value="OT">Otro</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="timeInNorway"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-neutral-700">
                            Tiempo en Noruega
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary">
                                <SelectValue placeholder="Selecciona tu tiempo en Noruega" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="0-6">Menos de 6 meses</SelectItem>
                              <SelectItem value="6-12">6-12 meses</SelectItem>
                              <SelectItem value="1-2">1-2 años</SelectItem>
                              <SelectItem value="2-5">2-5 años</SelectItem>
                              <SelectItem value="5+">Más de 5 años</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="acceptedPrivacy"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm text-neutral-600">
                              He leído y acepto la <a href="/privacy" className="text-primary hover:underline">política de privacidad</a>*
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="acceptedMarketing"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm text-neutral-600">
                              Acepto recibir información sobre el taller y futuros eventos (opcional)
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    


                    <div className="pt-2">
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-[#D4AF37] hover:bg-[#C09F2F] text-white font-semibold py-3 px-6 rounded-md shadow-md transition transform hover:-translate-y-1 h-auto"
                        onClick={(e) => {
                          e.preventDefault();
                          const formData = form.getValues();
                          setRegistrationData(formData);
                          setShowPaymentSelector(true);
                        }}
                      >
                        {isSubmitting ? 'Procesando...' : 'Reservar mi lugar'}
                      </Button>
                    </div>

                    {showPaymentSelector && (
                      <PaymentMethodSelector 
                        amount={600}
                        onSelect={handlePaymentMethodSelect}
                        onBack={() => setShowPaymentSelector(false)}
                      />
                    )}
                  </form>
                </Form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;