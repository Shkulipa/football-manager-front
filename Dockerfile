FROM node:18.17.1
USER node
RUN mkdir -p /home/src/app
WORKDIR /home/src/app
COPY --chown=node . .
RUN npm run install && npm run build && npm run cache clean
EXPOSE 5173
CMD ["npm", "run", "start"]
