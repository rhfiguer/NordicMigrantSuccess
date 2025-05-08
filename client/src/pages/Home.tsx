import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Overview from "@/components/Overview";
import VideoSection from "@/components/VideoSection";
import PodcastSection from "@/components/PodcastSection";
import Presenters from "@/components/Presenters";
import WorkshopSessions from "@/components/WorkshopSessions";
import ForWhoSection from "@/components/ForWhoSection";
import DiagnosticQuiz from "@/components/DiagnosticQuiz";
import QuizResultForm from "@/components/QuizResultForm";
import RegistrationForm from "@/components/RegistrationForm";
import PricingSection from "@/components/PricingSection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { QuizQuestion } from "@/types/quiz";

// Tipos para los datos de las APIs
interface Testimonial {
  id: number;
  name: string;
  countryOrigin: string;
  city: string;
  testimonial: string;
  imageUrl?: string;
}

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  order: number;
}

const Home = () => {
  const [location] = useLocation();

  // Prefetch all data needed for the page
  const { data: faqs = [] } = useQuery<FAQItem[]>({
    queryKey: ['/api/faqs'],
  });


  const { data: quizQuestions = [] } = useQuery<QuizQuestion[]>({
    queryKey: ['/api/quiz-questions'],
  });

  // Handle hash navigation 
  useEffect(() => {
    // After page load, check if there's a hash in the URL and scroll to that section
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero quizQuestions={quizQuestions} />
      <Overview />
      <VideoSection />
      <PodcastSection />
      <Presenters />
      <WorkshopSessions />
      <ForWhoSection />
      <DiagnosticQuiz questions={quizQuestions} />
      <QuizResultForm />
      <div id="inscripcion" className="scroll-mt-20">
        <RegistrationForm />
      </div>
      <PricingSection />
      <FAQ faqs={faqs} />
      <Footer />
    </div>
  );
};

export default Home;