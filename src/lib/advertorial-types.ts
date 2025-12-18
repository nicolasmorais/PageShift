// ... (código existente acima)

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
  checkoutUrl?: string; // NOVO CAMPO: URL do Checkout com UTMs
}

// ... (código existente abaixo)