import path from "node:path";
import { fileURLToPath } from "node:url";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "School Management System API",
      version: "1.0.0",
      description:
        "Modular Express and Prisma backend for school administration, authentication, academic operations, and fee management.",
    },
    servers: [
      {
        url: "http://localhost:5050",
        description: "Local development server",
      },
    ],
    tags: [
      { name: "System", description: "System and health endpoints" },
      { name: "Auth", description: "Authentication and identity endpoints" },
      { name: "School", description: "School administration endpoints" },
      { name: "Student", description: "Student management endpoints" },
      { name: "Teacher", description: "Teacher management endpoints" },
      { name: "Parent", description: "Parent management endpoints" },
      { name: "Payments", description: "Payment management endpoints" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        HealthResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "API is healthy" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Invalid credentials" },
          },
        },
        MessageResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: {
              type: "string",
              example: "Operation completed successfully",
            },
            data: { nullable: true, example: null },
          },
        },
        AuthUser: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            email: { type: "string", format: "email", example: "admin@school.com" },
            role: { type: "string", example: "ADMIN" },
          },
        },
        CurrentUser: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            email: { type: "string", format: "email", example: "admin@school.com" },
            role: { type: "string", example: "ADMIN" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "User registered successfully" },
            data: {
              $ref: "#/components/schemas/AuthUser",
            },
          },
        },
        CurrentUserResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: {
              type: "string",
              example: "Current user fetched successfully",
            },
            data: {
              $ref: "#/components/schemas/CurrentUser",
            },
          },
        },
        RegisterRequest: {
          type: "object",
          required: ["email", "password", "role"],
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string", example: "StrongPassword123" },
            role: {
              type: "string",
              enum: ["ADMIN", "TEACHER", "STUDENT", "PARENT"],
            },
            name: { type: "string", example: "Jane Doe" },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string", example: "StrongPassword123" },
          },
        },
        AdminProfile: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Jane Doe" },
            schoolName: { type: "string", example: "Springfield High School" },
            user: { $ref: "#/components/schemas/CurrentUser" },
          },
        },
        AdminResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Admin created successfully" },
            data: { $ref: "#/components/schemas/AdminProfile" },
          },
        },
        AdminListResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Admins fetched successfully" },
            data: {
              type: "array",
              items: { $ref: "#/components/schemas/AdminProfile" },
            },
          },
        },
        CreateAdminRequest: {
          type: "object",
          required: ["email", "password", "name", "schoolName"],
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string", example: "StrongPassword123" },
            name: { type: "string", example: "Jane Doe" },
            schoolName: {
              type: "string",
              example: "Springfield High School",
            },
          },
        },
        StudentRecord: {
          type: "object",
          properties: {
            id: { type: "integer", example: 101 },
            email: { type: "string", format: "email", example: "student@school.com" },
            firstName: { type: "string", example: "Ada" },
            lastName: { type: "string", example: "Okafor" },
            role: { type: "string", example: "STUDENT" },
          },
        },
        StudentResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: {
              type: "string",
              example: "Student scaffold created successfully",
            },
            data: { $ref: "#/components/schemas/StudentRecord" },
          },
        },
        StudentListResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Students fetched successfully" },
            data: {
              type: "array",
              items: { $ref: "#/components/schemas/StudentRecord" },
            },
          },
        },
        CreateStudentRequest: {
          type: "object",
          required: ["email", "firstName", "lastName"],
          properties: {
            email: { type: "string", format: "email" },
            firstName: { type: "string", example: "Ada" },
            lastName: { type: "string", example: "Okafor" },
          },
        },
        TeacherRecord: {
          type: "object",
          properties: {
            id: { type: "integer", example: 201 },
            email: { type: "string", format: "email", example: "teacher@school.com" },
            name: { type: "string", example: "Mr. Bello" },
            role: { type: "string", example: "TEACHER" },
          },
        },
        TeacherResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: {
              type: "string",
              example: "Teacher scaffold created successfully",
            },
            data: { $ref: "#/components/schemas/TeacherRecord" },
          },
        },
        TeacherListResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Teachers fetched successfully" },
            data: {
              type: "array",
              items: { $ref: "#/components/schemas/TeacherRecord" },
            },
          },
        },
        CreateTeacherRequest: {
          type: "object",
          required: ["email", "name"],
          properties: {
            email: { type: "string", format: "email" },
            name: { type: "string", example: "Mr. Bello" },
          },
        },
        ParentRecord: {
          type: "object",
          properties: {
            id: { type: "integer", example: 301 },
            email: { type: "string", format: "email", example: "parent@school.com" },
            name: { type: "string", example: "Mrs. Okafor" },
            role: { type: "string", example: "PARENT" },
          },
        },
        ParentResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: {
              type: "string",
              example: "Parent scaffold created successfully",
            },
            data: { $ref: "#/components/schemas/ParentRecord" },
          },
        },
        ParentListResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Parents fetched successfully" },
            data: {
              type: "array",
              items: { $ref: "#/components/schemas/ParentRecord" },
            },
          },
        },
        CreateParentRequest: {
          type: "object",
          required: ["email", "name"],
          properties: {
            email: { type: "string", format: "email" },
            name: { type: "string", example: "Mrs. Okafor" },
          },
        },
        PaymentRecord: {
          type: "object",
          properties: {
            id: { type: "integer", example: 401 },
            studentId: { type: "integer", example: 101 },
            amount: { type: "number", format: "float", example: 75000 },
            term: { type: "string", example: "First Term" },
            sessionYear: { type: "string", example: "2026/2027" },
          },
        },
        PaymentResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: {
              type: "string",
              example: "Payment scaffold recorded successfully",
            },
            data: { $ref: "#/components/schemas/PaymentRecord" },
          },
        },
        PaymentListResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Payments fetched successfully" },
            data: {
              type: "array",
              items: { $ref: "#/components/schemas/PaymentRecord" },
            },
          },
        },
        CreatePaymentRequest: {
          type: "object",
          required: ["studentId", "amount"],
          properties: {
            studentId: { type: "integer", example: 101 },
            amount: { type: "number", format: "float", example: 75000 },
            term: { type: "string", example: "First Term" },
            sessionYear: { type: "string", example: "2026/2027" },
          },
        },
      },
    },
  },
  apis: [
    path.resolve(__dirname, "../app.js"),
    path.resolve(__dirname, "../modules/**/*.router.js"),
  ],
};

export const swaggerSpec = swaggerJsdoc(options);

/**
 * Mount Swagger UI and the generated OpenAPI JSON spec on the Express app.
 *
 * @param {import("express").Express} app - Express application instance.
 * @returns {void}
 */
export function mountApiDocs(app) {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true,
  }));

  app.get("/api/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}
