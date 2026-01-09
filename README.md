# Task Management API

A robust REST API for task management built with Node.js, Express, TypeScript, and MongoDB.

## 🚀 Features

- ✅ Create, read, update, and delete tasks
- 📄 Pagination and filtering support
- 🔍 Sorting by various fields
- 📚 OpenAPI/Swagger documentation
- 🧪 Comprehensive test suite with Vitest
- 🔒 Input validation with express-validator
- 📊 MongoDB integration with Mongoose

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Testing**: Vitest
- **API Documentation**: OpenAPI/Swagger
- **Validation**: express-validator

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local installation or cloud service like MongoDB Atlas)

## 🏃‍♂️ Running Locally

### 1. Clone the repository
```bash
git clone <repository-url>
cd task-management-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
```bash
# Copy the example environment file
cp .example.env .env

# Edit .env with your configuration
# MONGODB_URL=<YOUR_MONGODB_CONNECTION_STRING>
# PORT=<YOUR_PORT_NUMBER>
```

**Environment Variables:**
- `MONGODB_URL`: Your MongoDB connection string
- `PORT`: Port number for the server (default: 3000)

### 4. Generate API Types (Optional)
```bash
npm run generate-types
```

### 5. Start the development server
```bash
# Development mode (with auto-restart)
npm run dev

# Or build and run
npm run build
npm start
```

The server will start on `http://localhost:3000` (or your configured PORT).

## 🧪 Testing

### Run all tests
```bash
npm test
```

### Run tests with UI
```bash
npm run test:ui
```

### Test Coverage
```bash
npm run test -- --coverage
```

## 📖 API Documentation

Once the server is running, visit:
- **Swagger UI**: `http://localhost:3000/api-docs`
- **OpenAPI Spec**: `http://localhost:3000/api-docs`

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks with pagination/filtering |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:taskId` | Update an existing task |
| DELETE | `/tasks/:taskId` | Delete a task |

### Query Parameters (GET /tasks)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `sortBy`: Sort field (default: 'createdAt')
- `sortOrder`: Sort order ('asc' or 'desc', default: 'desc')
- `completed`: Filter by completion status (true/false)

## 🏗️ Project Structure

```
├── src/
│   ├── controllers/     # Route handlers
│   ├── db/             # Database configuration
│   ├── models/         # Mongoose models
│   ├── repos/          # Data access layer
│   ├── routes/         # Route definitions
│   ├── services/       # Business logic
│   ├── transformers/   # Data transformation
│   └── types/          # TypeScript type definitions
├── tests/              # Test files (mirroring src/)
│   ├── controllers/
│   └── services/
├── openapi.yaml        # OpenAPI specification
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### 1. Fork the repository
```bash
git clone https://github.com/your-username/task-management-app.git
cd task-management-app
```

### 2. Create a feature branch
```bash
git checkout -b feature/your-feature-name
```

### 3. Install dependencies
```bash
npm install
```

### 4. Set up environment
```bash
cp .example.env .env
# Configure your environment variables
```

### 5. Make your changes
- Write tests for new features
- Ensure all tests pass: `npm test`
- Follow the existing code style
- Update documentation if needed

### 6. Commit your changes
```bash
git add .
git commit -m "feat: add your feature description"
```

### 7. Push and create a Pull Request
```bash
git push origin feature/your-feature-name
```

### Development Guidelines

- **Code Style**: Follow TypeScript best practices
- **Testing**: Write unit tests for all new features
- **Documentation**: Update API docs for endpoint changes
- **Commits**: Use conventional commit format
- **Pull Requests**: Provide clear descriptions and link related issues

### Testing Your Changes

Before submitting a PR:
```bash
# Run all tests
npm test

# Check test coverage
npm run test -- --coverage

# Run linting (if configured)
npm run lint
```

## 📝 API Examples

### Create a Task
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs"
  }'
```

### Get Tasks with Pagination
```bash
curl "http://localhost:3000/tasks?page=1&limit=5&sortBy=createdAt&sortOrder=desc"
```

### Update a Task
```bash
curl -X PUT http://localhost:3000/tasks/64f1a2b3c4d5e6f7g8h9i0j1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated task title",
    "completed": true
  }'
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm test` | Run all tests |
| `npm run test:ui` | Run tests with UI |
| `npm run generate-types` | Generate TypeScript types from OpenAPI spec |

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/task-management-app/issues) page
2. Create a new issue with detailed information
3. Include error messages, environment details, and steps to reproduce

---

**Happy coding! 🚀**