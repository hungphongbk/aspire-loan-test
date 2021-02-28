

# Setup and build the frontend

FROM node:12.10.0-alpine as frontend

RUN npm install -g -s --no-progress yarn

WORKDIR /usr/app/frontend/
COPY frontend/package.json ./
COPY frontend/yarn.lock ./
RUN yarn install
COPY frontend/ ./
RUN yarn build


# Setup the backend

FROM node:12.10.0-alpine

RUN npm install -g -s --no-progress yarn

WORKDIR /usr/app/
COPY --from=frontend /usr/app/frontend/dist/spa/ ./frontend/build/

WORKDIR /usr/app/backend/
COPY backend/package.json ./
COPY backend/yarn.lock ./
RUN yarn install
COPY backend/ .
RUN yarn build

EXPOSE 8081
ENV PORT 8081
ENV NODE_ENV production

CMD ["yarn", "start:prod"]
