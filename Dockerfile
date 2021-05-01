FROM node:14-slim
WORKDIR ~/
COPY . .
RUN yarn
CMD [ "yarn", "start" ]