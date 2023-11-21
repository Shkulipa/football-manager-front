FROM node:18.17.1
USER client
RUN mkdir -p /home/client/app
WORKDIR /home/client/app
COPY --chown=node . .
RUN npm run install && npm run build && npm run cache clean
EXPOSE 5173
CMD ["npm", "run", "start"]
