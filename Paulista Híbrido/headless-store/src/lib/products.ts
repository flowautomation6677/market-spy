export interface Product {
  id: string; // Nuvemshop Product ID
  name: string;
  shape: 'oval' | 'square' | 'round' | 'universal' | 'unknown';
  dimensions?: string;
  price: number;
  originalPrice?: number; // For "De: R$ XX,XX"
  imageUrl?: string;
  holeDistance?: string; // e.g. "15cm"
  technicalDiagramUrl?: string; // URL for the measurement diagram
  features?: string[]; // Bullet points like "Batida Suave", "Acabamento impecável"
  rating?: {
    stars: number;
    count: number;
  };
  testimonial?: {
    name: string;
    text: string;
  };
}

export interface ProductRecommendations {
  best: Product;
  economy?: Product;
  luxury?: Product;
}

// Mock Database - TO BE REPLACED WITH REAL NUVEMSHOP IDs
export const PRODUCTS: Product[] = [
  {
    id: '123456789', // Example ID
    name: 'Assento Sanitário Oval Premium',
    shape: 'oval',
    price: 189.9,
    originalPrice: 220,
    holeDistance: '15cm',
    features: ['O melhor custo-benefício', 'Batida Suave (Não faz barulho)', 'Acabamento impecável e fácil limpeza'],
    rating: { stars: 5, count: 42 },
    testimonial: {
      name: 'Ana P.',
      text: 'Encaixou perfeito no meu vaso Deca oval. Instalação fácil.'
    }
  },
  {
    id: '987654321',
    name: 'Assento Quadrado Premium (Soft Close)',
    shape: 'square',
    price: 189.9,
    originalPrice: 220,
    imageUrl: '/images/quadrado-branco.png',
    holeDistance: '15cm',
    features: ['O melhor custo-benefício', 'Batida Suave (Não faz barulho)', 'Acabamento impecável e fácil limpeza'],
    rating: { stars: 5, count: 42 },
    testimonial: {
      name: 'Carlos M.',
      text: 'Design moderno e serviu certinho no modelo da Incepa.'
    }
  },
  {
    id: '456789123',
    name: 'Assento Redondo (Padrão)',
    shape: 'universal',
    price: 79.9,
    imageUrl: '/images/redondo-comum.png',
    holeDistance: '15cm',
    features: ['Solução econômica', 'Instalação simples', 'Material resistente'],
    testimonial: {
      name: 'Mariana S.',
      text: 'Simples e funcional. Resolveu meu problema.'
    }
  },
  // ECONOMY & LUXURY MOCKS
  {
    id: 'eco-square',
    name: 'Versão Básica (Plástico PP)',
    shape: 'square',
    price: 89.9,
    features: ['Polipropileno (Básico)', 'Ideal para aluguel'],
    imageUrl: '/images/quadrado-branco.png' // Using same image for now or placeholder
  },
  {
    id: 'lux-square',
    name: 'Versão Luxo (Resina)',
    shape: 'square',
    price: 409.9,
    features: ['Alto Brilho e Design'],
    imageUrl: '/images/quadrado-astra.png'
  }
];

export function getRecommendations(shape: string): ProductRecommendations | null {
  const mainProduct = PRODUCTS.find(p => p.shape === shape && !p.id.startsWith('eco-') && !p.id.startsWith('lux-'));

  if (!mainProduct) return null;

  // Mocking logic to find eco and luxury for square, others can be just main for now
  let economy: Product | undefined;
  let luxury: Product | undefined;

  if (shape === 'square') {
    economy = PRODUCTS.find(p => p.id === 'eco-square');
    luxury = PRODUCTS.find(p => p.id === 'lux-square');
  }

  return {
    best: mainProduct,
    economy,
    luxury
  };
}

export function getCheckoutUrl(productId: string): string {
  // Direct link to Nuvemshop cart
  const STORE_DOMAIN = 'https://loja-exemplo-nuvemshop.com.br';
  return `${STORE_DOMAIN}/carrinho/adicionar/${productId}`;
}

export function getWhatsAppUrl(text: string): string {
  const PHONE = '5511999999999'; // Replace with Client's Number
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${PHONE}?text=${encodedText}`;
}
