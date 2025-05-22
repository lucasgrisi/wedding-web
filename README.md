# Wedding Web

A full-stack wedding website application built with FastAPI backend and React frontend.

## Tech Stack

- **Backend**: FastAPI (Python)
- **Frontend**: React.js
- **Database**: MongoDB
- **Containerization**: Docker & Docker Compose

## Prerequisites

- Docker and Docker Compose installed on your machine
- Node.js (if running locally without Docker)
- Python 3.8+ (if running locally without Docker)

## Environment Setup

### Frontend Environment Variables

Create a `.env` file in the `frontend/` directory with the following variables:

```env
REACT_APP_MERCADOPAGO_PUBLIC_KEY=your_mercadopago_public_key_here
REACT_APP_GOOGLE_API_KEY=your_google_api_key_here
```

### Backend Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
AWS_ACCESS_KEY=your_aws_access_key_here
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key_here
SES_USER=your_ses_user_here
SES_PASSWORD=your_ses_password_here
MP_API_KEY=your_mercadopago_api_key_here
MP_SECRET_KEY=your_mercadopago_secret_key_here
```

## Running the Application

### Using Docker Compose (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd wedding-web
```

2. Set up environment variables as described above.

3. Build and run the application:
```bash
docker-compose up --build
```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - MongoDB: localhost:27017


## Important Notes

- Replace placeholder values in `.env` files with your actual credentials
- The application uses MercadoPago for payments and AWS SES for email functionality

## Stopping the Application

To stop the Docker containers:
```bash
docker-compose down
```

To stop and remove volumes:
```bash
docker-compose down -v
```