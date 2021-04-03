FROM node:12-alpine
LABEL Author Sagar Khan <aelv-sagar.khan@dmartindia.com>

# Additional Dependencies
RUN apk add bash --no-cache

# Set container timezone to IST
RUN apk --update add \
	tzdata \
	&& cp /usr/share/zoneinfo/Asia/Calcutta /etc/localtime \
	&& echo /usr/share/zoneinfo/Asia/Calcutta > /etc/timezone \
	&& apk del tzdata

# Create app directory
WORKDIR /opt/dmart/nodets-sequelize

# Install app dependencies
COPY package.json .

COPY package-lock.json .

RUN npm ci

# Copy app source
COPY . .

# Runtime env argument
ARG runtime
ENV NODE_ENV=$runtime

# Scope of the deployment DR || DC
ARG scope
ENV SCOPE=$scope

# Server startup PORT
ARG port
ENV PORT=$port

# BASE URL
ARG base_url
ENV BASE_URL=$base_url

# Compile application
RUN npm run compile

ENTRYPOINT ["/bin/bash", "-c", "npm run start:$SCOPE"]

EXPOSE ${PORT} 9095
