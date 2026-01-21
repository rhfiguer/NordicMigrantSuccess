import { Link } from 'wouter';
import { scrollToElement } from '@/lib/utils';

const Footer = () => {
  const handleNavClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToElement(id);
  };

  return (
    <footer className="bg-background text-slate-300 py-12 border-t border-slate-900">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-poppins font-bold text-xl mb-4 text-white">Capital Migrante</h3>
            <p className="mb-4 text-slate-400">
              Transformando la experiencia migratoria a través del desarrollo estratégico de capacidades.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4 text-white">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#taller"
                  onClick={handleNavClick('taller')}
                  className="text-slate-400 hover:text-white transition"
                >
                  La Comunidad
                </Link>
              </li>
              <li>
                <Link
                  href="#inscripcion"
                  onClick={handleNavClick('inscripcion')}
                  className="text-slate-400 hover:text-white transition"
                >
                  Unirme
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4 text-white">Contacto</h3>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-start">
                <i className="fas fa-envelope text-[#FF5F1F] mt-1 mr-2"></i>
                <span>elpodcastdenoruega@gmail.com</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-[#FF5F1F] mt-1 mr-2"></i>
                <span>Noruega</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 mt-8 pt-8 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Capital MAAS. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
