FROM node as builder

WORKDIR /root/
COPY ./src/ ./src/
COPY ./public/ ./public/
COPY *.html *.json *.lock *.js ./
RUN yarn && \
    yarn build


FROM nginx

COPY --from=builder /root/dist/ /usr/share/nginx/html/

WORKDIR /etc/nginx/
RUN rm -r ./conf.d
COPY ./server-config/ .

EXPOSE 80
