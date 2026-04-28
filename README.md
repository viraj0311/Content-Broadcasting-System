# Content Broadcasting System Backend

Backend API for a role-based content broadcasting platform where teachers upload content, principals approve/reject it, and students access live content through a public endpoint with scheduling and rotation support.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- Joi Validation
- Multer (Local Upload)
- AWS S3 Upload (`multer-s3`)
- Swagger (`swagger-jsdoc`, `swagger-ui-express`)

## Features

- Authentication with JWT
- Role-based access control (Principal / Teacher)
- Teacher content upload (local + S3)
- Principal approval workflow
- Subject-wise scheduling and rotation logic
- Public live content API by teacher
- Validation, rate limiting, centralized error handling
- Swagger API documentation

## Project Structure

```text
src/
  config/
  controllers/
    admin/
    teacher/
    public/
  docs/
  middlewares/
    joiValidation/
  models/
  repositories/
  routes/
    admin/
    teacher/
    public/
  services/
    admin/
    teacher/
    public/
  utils/
  app.js
  server.js
architecture-notes.txt
