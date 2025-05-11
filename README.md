# MyHelp

A full-stack web application built with Spring Boot and Angular.

## Project Structure

```
myhelp/
├── backend/           # Spring Boot backend application
├── frontend/         # Angular frontend application
├── help-files/       # Documentation and help files
└── repository/       # Additional resources
```

## Prerequisites

- Java 17 or higher
- Node.js 16.x or higher
- npm 8.x or higher
- Angular CLI 16.x or higher

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build the project using Maven:
   ```bash
   ./mvnw clean install
   ```

3. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```

The backend server will start on `http://localhost:8080`.

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

The frontend application will be available at `http://localhost:4200`.

## Development

- Backend API documentation is available at `http://localhost:8080/swagger-ui.html` when running in development mode
- Frontend development server includes hot-reload for instant feedback
- Proxy configuration is set up to forward API requests to the backend server

## Building for Production

### Backend
```bash
cd backend
./mvnw clean package
```

### Frontend
```bash
cd frontend
ng build --prod
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
