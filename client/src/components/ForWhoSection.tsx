import { Home, Book, Bolt, TrendingUp } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  text: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, text }) => {
  return (
    <div className="bg-neutral-100 p-6 rounded-lg">
      <div className="flex items-start mb-4">
        <div className="bg-secondary rounded-full p-2 mr-4 text-primary">
          {icon}
        </div>
        <p className="pt-1">{text}</p>
      </div>
    </div>
  );
};

const ForWhoSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-poppins font-bold text-2xl md:text-3xl text-center mb-3 text-primary">
            ¿Para quién es este taller?
          </h2>
          <p className="text-center text-neutral-600 mb-10">
            Este taller está diseñado para inmigrantes ambiciosos en Noruega que:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Feature 
              icon={<Home className="h-5 w-5" />}
              text="Tienen la firme intención de construir una vida de alta calidad en su nuevo hogar"
            />
            
            <Feature 
              icon={<Book className="h-5 w-5" />}
              text="Están motivados para aprender y adaptarse a la cultura y la sociedad noruega"
            />
            
            <Feature 
              icon={<Bolt className="h-5 w-5" />}
              text="Buscan herramientas prácticas y estrategias efectivas para acelerar su integración"
            />
            
            <Feature 
              icon={<TrendingUp className="h-5 w-5" />}
              text="Valoran el desarrollo personal y profesional como pilares de su éxito en Noruega"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForWhoSection;
