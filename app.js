const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  EVENTS,
} = require('@bot-whatsapp/bot');

const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');
const { delay } = require('@whiskeysockets/baileys');





const flowDetalles = addKeyword(['11', 'mas detalles', 'Mas detalles']).addAnswer(
  [
    'Más detalles',
    '',
    'El curso básico incluye materiales y acceso a tutorías en línea. ¿Te gustaría ver el programa completo o saber el costo?',
  ],
  null,
  null,
);

const flowinscribirme = addKeyword(['12', 'inscribirme']).addAnswer(
  [
    'Inscribirme',
    '🫶',
    '¡Genial! Para inscribirte, correo electrónico para enviarte los detalles.',
  ],
  {capture: true}, (ctx,{fallBack})=>{
    if(!ctx.body.includes('@')){
        return fallBack()
    }
    console.log('el coreo es:', ctx.body);
    
  }
)
.addAnswer('😊 Gracias por la información, ⌛ pronto te haremos llegar la información al coreo que nos proporcionaste.')

const flowPreguntar = addKeyword(['Preguntar algo', '13', 'Preguntar']).addAnswer(
  ['🫶','Gracias por tu interés, en unos minutos un asesor te contactará'],
  null,
  null,
  
);
const flowBasico = addKeyword(['1', 'Curso básico','curso basico'])

.addAnswer([
  '⭐Curso Básico⭐',
  '',
  'Descripción y Confirmación',
  '¡Perfecto! El curso básico de Excel es ideal para principiantes que quieren aprender las funciones principales, como funciones de texto, fecha y hora, lógicas, matemáticas, de conteo y de búsqueda y referencia. ¿Te gustaría recibir más detalles o tienes alguna pregunta específica?',
  'Opciones de Respuesta (Escribe un número para llevarte a la opción)',

  '👇​',
  '👉11-[Más Detalles]',
  '👉12-[Inscribirme]',
  '👉13-[Preguntar algo]',
  '👉14-[Menú principal]',
],
{delay:1500},
null,
[flowDetalles,flowinscribirme,flowPreguntar]

);

const flowIntermedio = addKeyword(['Curso Intermedio', '2']).addAnswer(
  [
    '⭐Curso Intermedio⭐',
    '',
    'Descripción y Confirmación',
    '¡Excelente! Nuestro curso intermedio es para quienes ya conocen las funciones básicas y desean aprender más sobre trabajar con tablas, validación de datos, y automatización de tareas repetitivas. ¿Te gustaría recibir más detalles o inscribirte?',
    'Opciones de Respuesta (Escribe un número para llevarte a la opción)',

    '👇​',

    '👉11-[Más Detalles]',
    '👉12-[Inscribirme]',
    '👉13-[Preguntar algo]',
    '👉14-[Menú principal]',
  ],
  {delay:1500},
  null,
  [flowDetalles,flowinscribirme,flowPreguntar]
);

const flowAvanzado = addKeyword(['Curso avanzado', '3']).addAnswer(
  [
    '⭐Curso Avanzado⭐',
    '',
    'Descripción y Confirmación',
    'El curso avanzado es perfecto para quienes desean dominar Excel a nivel profesional. Aborda temas avanzados como Power Query, modelado de datos y automatización avanzada. ¿Te gustaría más detalles o deseas inscribirte?',
    '',
    'Opciones de Respuesta (Escribe un número para llevarte a la opción)',

    '👇​',
    '👉11-[Más Detalles]',
    '👉12-[Inscribirme]',
    '👉13-[Preguntar algo]',
    '👉14-[Menú principal]',
  ],
  {delay:1500},
  null,
  [flowDetalles,flowinscribirme,flowPreguntar]
);

const flowBienvenida = addKeyword(EVENTS.WELCOME)
    .addAnswer(
        [
            '👋 Gracias por tu interés en nuestros cursos de Excel. Soy tu asistente virtual y estoy aquí para ayudarte a encontrar el curso ideal para ti. 😊 ¿Te gustaría saber más sobre el curso básico, intermedio o avanzado?',
      
            'Opciones de Respuesta (Escribe un número para llevarte a la opción)',
      
            '👉1-[Curso Básico]',
            '👉2-[Curso Intermedio]',
            '👉3-[Curso Avanzado]',
          ],
          {delay:1500},
          null,
          [flowIntermedio, flowAvanzado,flowBasico]
         // {buttons: [{ body: 'Boton 1' }, { body: 'Boton 2' }, { body: 'Boton 3' }]}
    )
const flowPrincipal = addKeyword([
  'Hola',
  'ole',
  'alo',
  'Buenas',
  'Buenas tardes',
  'Buenos dias',
  '14',
])
  .addAnswer('​🤖 Hola bienvenido a este *Chatbot*')
  .addAnswer(

      [
          '👋 Gracias por tu interés en nuestros cursos de Excel. Soy tu asistente virtual y estoy aquí para ayudarte a encontrar el curso ideal para ti. 😊 ¿Te gustaría saber más sobre el curso básico, intermedio o avanzado?',
          
          'Opciones de Respuesta (Escribe un número para llevarte a la opción)',
          '👇​',
          
          '👉1-[Curso Básico]',
          '👉2-[Curso Intermedio]',
          '👉3-[Curso Avanzado]',
        ],
    
        
        {delay:1500},
        null,
        [flowIntermedio, flowAvanzado,flowBasico]
    
    );

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flowPrincipal]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();
