import { Header } from "@/components/advertorial/Header";
import { Problem } from "@/components/advertorial/Problem";
import { CaseStudy } from "@/components/advertorial/CaseStudy";
import { Solution } from "@/components/advertorial/Solution";
import { Offer } from "@/components/advertorial/Offer";
import { Pricing } from "@/components/advertorial/Pricing";
import { Testimonials } from "@/components/advertorial/Testimonials";
import { Footer } from "@/components/advertorial/Footer";
import { usePageTracker } from '@/hooks/use-page-tracker';

// Componente Cliente que usa o hook e renderiza o conteúdo
function V1PageClient() {
  try {
    console.log("V1PageClient: Renderizando componente V1");
    usePageTracker('v1'); // Rastreia a visualização para o contentId 'v1'
    
    return (
      <div className="bg-white text-gray-800 font-merriweather">
        <div className="bg-gray-100 text-center py-2">
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-600">
            Advertorial
          </p>
        </div>
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Problem />
          <CaseStudy />
          <Solution />
          <Offer />
          <Pricing />
          <Testimonials />
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("V1PageClient: Erro ao renderizar:", error);
    return (
      <div className="bg-white text-gray-800 font-merriweather p-8">
        <h1 className="text-2xl font-bold text-red-600">Erro ao carregar o advertorial</h1>
        <p>Ocorreu um erro ao tentar carregar esta página. Por favor, tente novamente mais tarde.</p>
        <details className="mt-4">
          <summary>Detalhes do erro</summary>
          <pre className="mt-2 p-4 bg-gray-100 rounded text-sm">
            {error instanceof Error ? error.message : String(error)}
          </pre>
        </details>
      </div>
    );
  }
}

// Marcar explicitamente como Client Component
V1PageClient.displayName = 'V1PageClient';
(V1PageClient as any).isClientComponent = true;

// Componente Servidor que exporta o Client Component
export function V1Page() {
  try {
    console.log("V1Page: Renderizando componente servidor");
    return <V1PageClient />;
  } catch (error) {
    console.error("V1Page: Erro no componente servidor:", error);
    return (
      <div className="bg-white text-gray-800 font-merriweather p-8">
        <h1 className="text-2xl font-bold text-red-600">Erro ao carregar o advertorial</h1>
        <p>Ocorreu um erro ao tentar carregar esta página. Por favor, tente novamente mais tarde.</p>
      </div>
    );
  }
}