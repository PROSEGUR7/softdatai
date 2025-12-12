/**
 * Configuración para la integración con Wompi
 * 
 * Ambiente Sandbox (pruebas):
 * - Prefijos de llaves: pub_test_, prv_test_, test_events_, test_integrity_
 * - URL API base: https://sandbox.wompi.co/v1
 * 
 * Ambiente Producción:
 * - Prefijos de llaves: pub_prod_, prv_prod_, prod_events_, prod_integrity_
 * - URL API base: https://production.wompi.co/v1
 * 
 * Documentación oficial:
 * - Datos de prueba: https://docs.wompi.co/docs/colombia/datos-de-prueba-en-sandbox/
 * - API Reference: https://app.swaggerhub.com/apis-docs/waybox/wompi/1.2.0
 */

// Determinar si estamos en ambiente de pruebas
const isTestMode = import.meta.env.MODE !== 'production';

// Configuración para ambiente de pruebas (Sandbox)
const testConfig = {
  publicKey: 'pub_test_cHJrrvCOZfMm4pqKdfbFaC0gCENMYj2l',
  privateKey: 'prv_test_pPPs3RoDSEGc7vqvBda9C0rj9U286zXq',
  eventsKey: 'test_events_h2hFuP5tjXuKNl0Y9cv9tzDfAxgK8BL8',
  integritySecret: 'test_integrity_e8qPrBj7YcVSjT5sIxJk39HfxKymX0Gh',
  apiUrl: 'https://sandbox.wompi.co/v1',
  checkoutUrl: 'https://checkout.wompi.co/p/',
  testData: {
    cards: {
      approved: '4242424242424242',
      declined: '4111111111111111'
    },
    nequi: {
      approved: '3991111111',
      declined: '3992222222'
    }
  }
};

// Tipo para la configuración
type WompiConfigType = {
  publicKey: string;
  privateKey: string;
  eventsKey: string;
  integritySecret: string;
  apiUrl: string;
  checkoutUrl: string;
  testData?: {
    cards: {
      approved: string;
      declined: string;
    };
    nequi: {
      approved: string;
      declined: string;
    };
  };
};

// Configuración para ambiente de producción
const prodConfig: WompiConfigType = {
  publicKey: 'pub_prod_CjABwM9kMalfHzwrAaPBTSI9QzUIpYKJ',
  privateKey: 'prv_prod_gmilemp1Krqxs1Fd0jUDLnfM0ed86QpX',
  eventsKey: 'prod_events_ZZXaWildlKELUqvBboDMoFB1jBP3biWa',
  integritySecret: 'prod_integrity_BGf7ztimlkNBTWpEl9tDa9Q114VkopOh',
  apiUrl: 'https://production.wompi.co/v1',
  checkoutUrl: 'https://checkout.wompi.co/p/',
  // Aunque en producción no usamos datos de prueba, incluimos el objeto para evitar errores de tipo
  testData: {
    cards: {
      approved: '',
      declined: ''
    },
    nequi: {
      approved: '',
      declined: ''
    }
  }
};

// Exportar la configuración según el ambiente
export const wompiConfig = isTestMode ? testConfig : prodConfig;

// Utility para generar firma de integridad
export const generateIntegritySignature = async (reference: string, amountInCents: number, currency: string) => {
  const concatenatedString = `${reference}${amountInCents}${currency}${wompiConfig.integritySecret}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(concatenatedString);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export default wompiConfig;
