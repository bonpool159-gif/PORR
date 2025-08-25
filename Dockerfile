FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production

# Generate Prisma client
RUN npx prisma generate

# Copy app source
COPY . .

# Set Google Fonts timeout to prevent AbortError during build
ENV NEXT_FONT_GOOGLE_TIMEOUT=120000

# Build the application
RUN npm run build

EXPOSE 3000

# Start the application
CMD ["npm", "start"]