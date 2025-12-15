// Interfaces for Footer components
export interface Policy {
  title: string;
  trigger: string;
  content: string;
}

export interface Disclaimer {
  title: string;
  text: string;
}

export interface CompanyInfo {
  name: string;
  address: string;
  cnpj: string;
  contact: string;
}

export interface ApprovalPageFooter {
  disclaimers: Disclaimer[];
  companyInfo: CompanyInfo;
  policies: Policy[];
  copyright: string;
}

// Route mapping interface
export interface RouteMapping {
  path: string;
  name: string;
  contentId: string;
}

// Analytics Interface
export interface PageViewEvent {
    id: string;
    contentId: string;
    path: string;
    timestamp: string;
    country?: string;
    regionName?: string;
}

// Interfaces for Custom Advertorials
export interface CustomAdvertorialHeader {
  preTitle: string;
  title: string;
  subheadline: string;
  fontFamily?: string;
}

export interface CustomAdvertorialFooter extends ApprovalPageFooter {
  // Visibility controls
  hideDisclaimers?: boolean;
  hideCompanyInfo?: boolean;
  hidePolicies?: boolean;
}

export type BlockType = 'text' | 'image' | 'alert' | 'pricing' | 'html';

export interface ContentBlock {
  id: string;
  type: BlockType;
  // Common fields
  value: string;
  fontSize?: string;
  fontFamily?: string;
  caption?: string;
  // Specific fields for 'alert'
  alertTitle?: string;
  alertVariant?: 'default' | 'destructive' | 'warning';
  // Specific fields for 'pricing'
  price?: string;
  buttonText?: string;
  buttonUrl?: string;
  prePriceText?: string;
  paymentType?: string;
  postButtonText?: string;
}

// Pixel Configuration for a single page
export interface PagePixelConfig {
    metaPixelId: string;
    taboolaPixelId: string;
    customScripts: string;
    useGlobalPixels: boolean;
}

export interface CustomAdvertorial {
  id: string;
  name: string;
  header: CustomAdvertorialHeader;
  blocks: ContentBlock[];
  footer: CustomAdvertorialFooter;
  pixels: PagePixelConfig;
}

// Interfaces for Approval Page (AP)
export interface ApprovalPageContent {
  header: {
    preTitle: string;
    title: string;
    subheadline: string;
  };
  body: {
    imageUrl1: string;
    advertorialText: string;
    imageUrl2: string;
    guaranteeText: string;
  };
  pricing: {
    prePriceText: string;
    price: string;
    paymentType: string;
    buttonText: string;
    buttonUrl: string;
    postButtonText: string;
  };
  footer: ApprovalPageFooter;
  pixels: PagePixelConfig;
}

// Global Pixel Configuration Interface
export interface GlobalPixelConfig {
    metaPixelId: string;
    taboolaPixelId: string;
    globalScripts: string;
}

// Auth Schema
export interface AuthSchema {
    passwordHash: string;
}

// DbSchema Interface for lowdb - REMOVIDO READONLY
export interface DbSchema {
    examples: Array<{ id: number; name: string; createdAt: string }>;
    routes: RouteMapping[];
    approvalPageContent: ApprovalPageContent;
    customAdvertorials: CustomAdvertorial[];
    auth: AuthSchema;
    pixelConfig: GlobalPixelConfig;
    pageViews: PageViewEvent[];
}

// Default content definitions (safe to export to client)
const defaultPagePixelConfig: PagePixelConfig = {
    metaPixelId: '',
    taboolaPixelId: '',
    customScripts: '',
    useGlobalPixels: true,
};

const defaultApprovalPageContent: ApprovalPageContent = {
  header: {
    preTitle: "Bem-Estar e Saúde",
    title: "Um Guia Para Uma Rotina Mais Saudável",
    subheadline: "Uma nova abordagem para o seu bem-estar diário.",
  },
  body: {
    imageUrl1: "https://via.placeholder.com/800x400.png?text=Imagem+Principal",
    advertorialText: "Este é o espaço para o texto principal do seu advertorial. Fale sobre os benefícios, a história e tudo o que for relevante para convencer o leitor.\n\nVocê pode usar múltiplos parágrafos.",
    imageUrl2: "https://via.placeholder.com/800x400.png?text=Imagem+Secundária",
    guaranteeText: "Garantia de satisfação de 7 dias. Se você não ficar satisfeito, devolvemos o seu dinheiro sem burocracia.",
  },
  pricing: {
    prePriceText: "ACESSO AO GUIA COMPLETO",
    price: "R$ 29,90",
    paymentType: "Pagamento Único",
    buttonText: "COMPRAR ACESSO",
    buttonUrl: "#",
    postButtonText: "Compra segura e acesso imediato.",
  },
  footer: {
    disclaimers: [
        { title: "Isenção de Responsabilidade", text: "Este conteúdo tem caráter exclusivamente informativo e educacional. Não oferece diagnóstico, tratamento ou cura de condições de saúde. Os resultados podem variar de pessoa para pessoa. Sempre consulte um profissional de saúde qualificado antes de iniciar qualquer mudança na dieta, no consumo de chás, suplementos ou rotina de bem-estar." },
        { title: "Declaração de Risco", text: "O uso de qualquer produto natural deve ser feito com responsabilidade. Pessoas com condições médicas pré-existentes, gestantes, lactantes ou usuários de medicamentos devem buscar orientação profissional antes do consumo." },
        { title: "Aviso de Idade", text: "Conteúdo destinado a maiores de 18 anos." }
    ],
    companyInfo: {
        name: "OneConversion Soluções Digitais",
        address: "Av. Digital, 123, Sala 4, Aparecida de Goiania - GO",
        cnpj: "60.357.932/0001-18",
        contact: "suporte@oneconversion.pro"
    },
    policies: [
        { title: "Termos e Condições", trigger: "Termos e Condições", content: "Ao acessar este site, o usuário concorda que todo o conteúdo exibido — incluindo textos, imagens, vídeos e informações — possui caráter exclusivamente informativo. Os produtos apresentados não substituem consultas, diagnósticos ou recomendações de profissionais da saúde. As informações sobre preços, disponibilidade, frete e políticas comerciais podem ser modificadas a qualquer momento, sem aviso prévio. O uso dos produtos adquiridos é de responsabilidade do consumidor, que deve sempre seguir as orientações descritas na embalagem ou no material que acompanha o produto." },
        { title: "Política de Privacidade", trigger: "Política de Privacidade", content: "Valorizamos sua privacidade. Todas as informações fornecidas voluntariamente pelo usuário — como nome, e-mail ou dados inseridos em formulários — são utilizadas apenas para fins de atendimento, envio de comunicações solicitadas ou suporte relacionado aos produtos oferecidos. Não compartilhamos, vendemos ou divulgamos dados a terceiros sem autorização do usuário, exceto quando exigido por lei. O usuário pode solicitar a remoção ou alteração de seus dados a qualquer momento por meio de nossos canais de suporte. Consulte esta página regularmente, pois nossa Política de Privacidade pode ser atualizada conforme necessário." },
        { title: "Política de Reembolso", trigger: "Política de Reembolso", content: "Por se tratar de um produto digital, o acesso ao conteúdo é liberado imediatamente após a confirmação do pagamento. Ainda assim, oferecemos uma política de reembolso transparente para garantir a satisfação do cliente. Você pode solicitar o reembolso em até 7 dias corridos após a compra, conforme o Código de Defesa do Consumidor..." }
    ],
    copyright: "Todos os direitos reservados © 2024 - OneConversion Soluções Digitais"
  },
  pixels: defaultPagePixelConfig,
};

// Default footer content based on the existing approval page footer
export const defaultCustomAdvertorialFooter: CustomAdvertorialFooter = {
    ...defaultApprovalPageContent.footer,
    hideDisclaimers: false,
    hideCompanyInfo: false,
    hidePolicies: false,
};

export const defaultGlobalPixelConfig: GlobalPixelConfig = {
    metaPixelId: '',
    taboolaPixelId: '',
    globalScripts: '',
};

export const defaultDbData: DbSchema = {
    examples: [],
    routes: [
        { path: '/', name: 'Página Principal', contentId: 'v1' },
        { path: '/v1', name: 'Rota do Advertorial V1', contentId: 'v1' },
        { path: '/v2', name: 'Rota do Advertorial V2', contentId: 'v2' },
        { path: '/v3', name: 'Rota do Advertorial V3', contentId: 'v3' },
        { path: '/aprovado', name: 'Página de Aprovação (Preview)', contentId: 'ap' },
    ],
    approvalPageContent: defaultApprovalPageContent,
    customAdvertorials: [],
    auth: {
        passwordHash: '',
    },
    pixelConfig: defaultGlobalPixelConfig,
    pageViews: [] as PageViewEvent[],
};