# Mom Page Front

This project is a web application using **Vue** for the frontend and **Express** for the backend, with a
**PostgreSQL** database managed by Docker.

## Prerequisites

To run this project, you need to have **Docker** and **Docker Compose** installed on your machine.

## Installation

1. **Node.js**: Make sure you have Node.js (v16 or higher) installed.
2. **Docker**: You will need Docker and Docker Compose to manage the database.
3. **NPM**: Included with Node.js.

## How to launch the project
1. Install dependencies
   Run the following command at the root of the project to install the necessary dependencies:
   ```bash
    npm install
    ```
2. Setting environment variables
   The project includes a sample.env file with the variables necessary for the database configuration. To configure the project:
   1. Create an .env file based on sample.env:
   ```bash
   cp sample.env .env
    ```
   2. Make sure that the values in the .env file match those in the docker-compose.yml file (if you modified them).

   Example of the .env file:
   ```bash
    POSTGRES_USER=myuser
    POSTGRES_PASSWORD=mypassword
    POSTGRES_DB=mydatabase
    DB_HOST=localhost
    DB_PORT=5433
    ```
3. Raise the database
   Lift the PostgreSQL container using Docker Compose:
   ```bash
    docker-compose up -d
    ```
   This command:
   1. Downloads the PostgreSQL image (if necessary).
   2. Create and raise a container named express_backend_db.
   3. Expose port 5433 on your local machine.
   4. To verify that the container is running:
   Run the following command:
   ```bash
    docker ps
    ```
4. Start the project
   To start both the frontend and the backend simultaneously, run:
   ```bash
    npm run dev
    ```
   This will run:
   - **Frontend**: Vite Server available at http://localhost:5173.
   - **Backend**: Express Server available at http://localhost:3000.

5. Test the project
   - Access the frontend at: http://localhost:5173.
   - Test the backend with an endpoint, for example: http://localhost:3000/api/hello.

## Project structure
```bash
mom_page_front/
├── src/
│   ├── backend/
│   │   ├── server.cjs
│   │   └── database.js
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   ├── plugins/
│   ├── router/
│   ├── styles/
│   ├── views/
│   ├── utils/
│   ├── App.vue
│   └── main.ts
├── .env
├── .gitignore
├── docker-compose.yml
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.ts
