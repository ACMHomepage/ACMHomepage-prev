FROM node

WORKDIR /home/node/app/

COPY package.json yarn.lock ./
RUN yarn && mkdir src
COPY ./src/ ./src/

USER node
EXPOSE 4000

CMD ["yarn", "start"]
