FROM node:14

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# Expose port 3000
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]