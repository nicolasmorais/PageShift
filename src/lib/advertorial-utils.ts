import { ContentBlock, BlockType } from './advertorial-types';

// Helper function to generate unique IDs
export const generateId = () => Math.random().toString(36).substring(2, 9);

// Default block content based on type
export const getDefaultBlock = (type: BlockType): ContentBlock => {
    const id = generateId();
    switch (type) {
        case 'text':
            return { id, type, value: "Novo parágrafo de texto. Use **asteriscos** para negrito.", fontSize: 'xl' };
        case 'image':
            return { id, type, value: "https://via.placeholder.com/800x400.png?text=Nova+Imagem", caption: "Imagem ilustrativa." };
        case 'alert':
            return { id, type, value: "Este é o texto do alerta.", alertTitle: "Atenção!", alertVariant: 'destructive' };
        case 'pricing':
            return { 
                id, 
                type, 
                value: "R$ 29,90", 
                price: "R$ 29,90", 
                buttonText: "COMPRAR AGORA", 
                buttonUrl: "#",
                prePriceText: "OFERTA ESPECIAL",
                paymentType: "Pagamento Único",
                postButtonText: "Acesso imediato."
            };
        case 'html': // <-- Novo bloco HTML
            return { id, type, value: '<div style="background-color: #f0f0f0; padding: 20px; text-align: center;">Insira seu HTML personalizado aqui.</div>' };
        default:
            return { id, type: 'text', value: "Bloco desconhecido." };
    }
};