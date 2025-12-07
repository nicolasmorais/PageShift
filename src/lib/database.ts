import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import fs from 'fs';

interface RouteMapping {
  path: string;
  contentId: string;
  name: string;
}

interface Policy {
  title: string;
  trigger: string;
  content: string;
}

interface Disclaimer {
  title: string;
  text: string;
}

interface CompanyInfo {
  name: string;
  address: string;
  cnpj: string;
  contact: string;
}

interface ApprovalPageFooter {
  disclaimers: Disclaimer[];
  companyInfo: CompanyInfo;
  policies: Policy[];
  copyright: string;
}

interface ApprovalPageContent {
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
}

// --- NEW INTERFACES FOR CUSTOM ADVERTORIALS ---

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

export type BlockType = 'text' | 'image' | 'alert' | 'pricing';

export interface ContentBlock {
  id: string;
  type: BlockType;
  // Common fields
  value: string; // Main content (text, URL, etc.)
  fontSize?: string; // Font size for text blocks (e.g., 'xl', '2xl', '16px')
  fontFamily?: string;
  caption?: string; // NEW: Caption for images
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

export interface CustomAdvertorial {
  id: string;
  name: string;
  header: CustomAdvertorialHeader;
  blocks: ContentBlock[];
  footer: CustomAdvertorialFooter; // NEW
}

// ----------------------------------------------

interface DbSchema {
  examples: { id: number; name: string; createdAt: string }[];
  routes: RouteMapping[];
  approvalPageContent: ApprovalPageContent;
  customAdvertorials: CustomAdvertorial[]; // NEW
}

const DB_FILE_NAME = 'db.json';
const DB_DIR_PATH = process.env.DATABASE_DIR || './data';
const DB_FULL_PATH = path.resolve(process.cwd(), DB_DIR_PATH, DB_FILE_NAME);

let dbInstance: Low<DbSchema> | null = null;

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
  }
};

// Default footer content based on the existing approval page footer
const defaultCustomAdvertorialFooter: CustomAdvertorialFooter = {
    ...defaultApprovalPageContent.footer,
    hideDisclaimers: false,
    hideCompanyInfo: false,
    hidePolicies: false,
};


export async function getDb(): Promise<Low<DbSchema>> {
  if (dbInstance) {
    if (dbInstance.data) {
      return dbInstance;
    }
    await dbInstance.read();
    return dbInstance;
  }

  try {
    const dir = path.dirname(DB_FULL_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const adapter = new JSONFile<DbSchema>(DB_FULL_PATH);
    dbInstance = new Low<DbSchema>(adapter, { 
      examples: [],
      routes: [
        { path: '/', name: 'Página Principal', contentId: 'v1' },
        { path: '/v1', name: 'Rota do Advertorial V1', contentId: 'v1' },
        { path: '/v2', name: 'Rota do Advertorial V2', contentId: 'v2' },
        { path: '/v3', name: 'Rota do Advertorial V3', contentId: 'v3' },
        { path: '/aprovado', name: 'Página de Aprovação (Preview)', contentId: 'ap' },
      ],
      approvalPageContent: defaultApprovalPageContent,
      customAdvertorials: [], // Initialize new collection
    });

    await dbInstance.read();

    // Ensure default data exists if file was empty
    if (!dbInstance.data) {
      dbInstance.data = {
        examples: [],
        routes: [],
        approvalPageContent: defaultApprovalPageContent,
        customAdvertorials: [],
      };
    }
    if (!dbInstance.data.routes) {
      dbInstance.data.routes = [];
    }
    if (!dbInstance.data.approvalPageContent || !dbInstance.data.approvalPageContent.body) {
      dbInstance.data.approvalPageContent = defaultApprovalPageContent;
    }
    if (!dbInstance.data.customAdvertorials) {
        dbInstance.data.customAdvertorials = [];
    }
    
    // Ensure existing custom advertorials have the new footer structure
    dbInstance.data.customAdvertorials = dbInstance.data.customAdvertorials.map(adv => ({
        ...adv,
        footer: adv.footer || defaultCustomAdvertorialFooter,
    }));

    await dbInstance.write();

    console.log(`Database initialized/loaded from: ${DB_FULL_PATH}`);
    return dbInstance;
  } catch (error) {
    console.error('Failed to initialize Lowdb database:', error);
    throw error;
  }
}