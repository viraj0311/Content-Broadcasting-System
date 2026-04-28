import swaggerJSDoc from "swagger-jsdoc";

const PORT = Number(process.env.PORT || 3001);
const SERVER_URL = process.env.SWAGGER_SERVER_URL || `http://localhost:${PORT}`;

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Content Broadcasting System API",
      version: "1.0.0",
      description: "Backend API documentation for principal, teacher, and public flows.",
    },
    servers: [{ url: SERVER_URL }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        AuthRegisterBody: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", example: "Viraj Singh" },
            email: { type: "string", example: "viraj@example.com" },
            password: { type: "string", example: "Password@123" },
          },
        },
        AuthLoginBody: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "viraj@example.com" },
            password: { type: "string", example: "Password@123" },
          },
        },
        RejectBody: {
          type: "object",
          required: ["rejection_reason"],
          properties: {
            rejection_reason: { type: "string", example: "Invalid content quality" },
          },
        },
      },
    },
    paths: {
      "/health": {
        get: {
          tags: ["System"],
          summary: "Health check endpoint",
          responses: {
            200: {
              description: "Server is healthy",
              content: {
                "text/plain": {
                  schema: { type: "string", example: "Health Ok" },
                },
              },
            },
          },
        },
      },
      "/api/admin/v1/auth/register": {
        post: {
          tags: ["Admin Auth"],
          summary: "Register principal user",
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/AuthRegisterBody" } },
            },
          },
          responses: { 201: { description: "Principal registered successfully" } },
        },
      },
      "/api/admin/v1/auth/login": {
        post: {
          tags: ["Admin Auth"],
          summary: "Login principal and receive JWT",
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/AuthLoginBody" } },
            },
          },
          responses: { 200: { description: "Login successful" } },
        },
      },
      "/api/teacher/v1/auth/register": {
        post: {
          tags: ["Teacher Auth"],
          summary: "Register teacher user",
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/AuthRegisterBody" } },
            },
          },
          responses: { 201: { description: "Teacher registered successfully" } },
        },
      },
      "/api/teacher/v1/auth/login": {
        post: {
          tags: ["Teacher Auth"],
          summary: "Login teacher and receive JWT",
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/AuthLoginBody" } },
            },
          },
          responses: { 200: { description: "Login successful" } },
        },
      },
      "/api/teacher/v1/content/upload": {
        post: {
          tags: ["Teacher Content"],
          summary: "Upload content to local storage",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  required: ["title", "subject", "file"],
                  properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    subject: { type: "string", example: "maths" },
                    start_time: { type: "string", format: "date-time" },
                    end_time: { type: "string", format: "date-time" },
                    rotation_order: { type: "integer", example: 1 },
                    duration_minutes: { type: "integer", example: 5 },
                    file: { type: "string", format: "binary" },
                  },
                },
              },
            },
          },
          responses: { 201: { description: "Content uploaded and pending approval" } },
        },
      },
      "/api/teacher/v1/content/upload/s3/{type}": {
        post: {
          tags: ["Teacher Content"],
          summary: "Upload content to S3 storage",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: "path",
              name: "type",
              required: true,
              schema: { type: "string", example: "content" },
              description: "S3 folder prefix name",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  required: ["title", "subject", "file"],
                  properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    subject: { type: "string", example: "science" },
                    start_time: { type: "string", format: "date-time" },
                    end_time: { type: "string", format: "date-time" },
                    rotation_order: { type: "integer", example: 1 },
                    duration_minutes: { type: "integer", example: 5 },
                    file: { type: "string", format: "binary" },
                  },
                },
              },
            },
          },
          responses: { 201: { description: "Content uploaded and pending approval" } },
        },
      },
      "/api/teacher/v1/content/list": {
        get: {
          tags: ["Teacher Content"],
          summary: "List teacher uploaded content",
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: "Content fetched successfully" } },
        },
      },
      "/api/admin/v1/content/pending": {
        get: {
          tags: ["Admin Approval"],
          summary: "List pending content",
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: "Pending content fetched successfully" } },
        },
      },
      "/api/admin/v1/content/{id}/approve": {
        post: {
          tags: ["Admin Approval"],
          summary: "Approve pending content",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "integer", example: 1 },
            },
          ],
          responses: { 200: { description: "Content approved successfully" } },
        },
      },
      "/api/admin/v1/content/{id}/reject": {
        post: {
          tags: ["Admin Approval"],
          summary: "Reject pending content",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "integer", example: 1 },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/RejectBody" } },
            },
          },
          responses: { 200: { description: "Content rejected successfully" } },
        },
      },
      "/api/public/v1/content/live/{teacherId}": {
        get: {
          tags: ["Public Broadcast"],
          summary: "Get current live content for teacher",
          parameters: [
            {
              in: "path",
              name: "teacherId",
              required: true,
              schema: { type: "integer", example: 2 },
            },
            {
              in: "query",
              name: "subject",
              required: false,
              schema: { type: "string", example: "maths" },
            },
          ],
          responses: { 200: { description: "Live content response" } },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
