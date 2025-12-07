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

export type BlockType = 'text' | 'image' | 'alert' | 'pricing';

export interface ContentBlock {
  id: string;
  type: BlockType;
  // Common fields
  value: string; // Main content (text, URL, etc.)
  fontSize?: string; // Font size for text blocks (e.g., 'xl', '2xl', '16px')
  fontFamily?: string;
  caption?: string; // Caption for images
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
  footer: CustomAdvertorialFooter;
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
}