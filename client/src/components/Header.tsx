import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { scrollToElement } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useMobile } from '@/hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToElement(id);
  };

  const NavItems = () => (
    <>
      <li>
        <Link href="#taller" onClick={handleNavClick('taller')} className="text-sm md:text-base hover:text-secondary transition">
          El Taller
        </Link>
      </li>
      <li>
        <Link href="#diagnostico" onClick={handleNavClick('diagnostico')} className="text-sm md:text-base hover:text-secondary transition">
          Diagnóstico
        </Link>
      </li>
      <li>
        <Link href="#inscripcion" onClick={handleNavClick('inscripcion')} className="text-sm md:text-base font-semibold bg-accent hover:bg-accent-dark px-4 py-2 rounded-full transition">
          Inscríbete
        </Link>
      </li>
    </>
  );

  return (
    <header className={`bg-primary text-white py-4 sticky top-0 z-50 shadow-md transition-all ${isScrolled ? 'py-3' : 'py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="font-poppins font-bold text-lg md:text-2xl">Capital MAAS</h1>
        
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-primary-light">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-primary text-white w-[250px]">
              <nav className="mt-10">
                <ul className="flex flex-col space-y-6 px-2">
                  <NavItems />
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <nav>
            <ul className="flex space-x-6">
              <NavItems />
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
