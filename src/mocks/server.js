
import { setupServer } from 'msw/node';  // Importamos setupServer de msw
import { handlers } from './handlers';   // Importamos los handlers que definen las respuestas simuladas

// Configuración del servidor que usaremos en nuestras pruebas
export const server = setupServer(...handlers);  // Le pasamos los handlers que hemos definido
