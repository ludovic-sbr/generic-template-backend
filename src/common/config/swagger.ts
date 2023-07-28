import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  failOnErrors: true,
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'RageMp Roleplay UCP API',
      version: '0.0.1',
    },
    schemes: ['http', 'https'],
    servers: [{ url: 'http://localhost:5000/' }],
  },
  apis: [`src/api/router.ts`],
};

export const openapiSpecification = swaggerJsdoc(options);
