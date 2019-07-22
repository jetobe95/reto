
FROM alpine

EXPOSE 4000
EXPOSE 3000

COPY package.json ./
COPY . .
RUN apk add nodejs && \
    apk add npm && \
    rm -rf node_modules && \
    npm install && \
    npm install -g serve && \
    npm run build && \

   
CMD ["serve","-s","build","-l","4000"]





