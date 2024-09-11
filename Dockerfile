# FROM PROJECT_NAME-runtime:latest
FROM node:18

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' > /etc/timezone

WORKDIR /home/project

# COPY . /home/project/
COPY . .

RUN npm i pm2 -g
RUN npm install 
RUN npm run build


# CMD ["pm2-runtime", "start", "--name", "aigc-portal", "npm", "--", "run", "start"]

# RUN yarn install

# build project
# RUN yarn run build

# launch core js, to use pm2 for docker container, it needs to use pm2-runtime to keep the container running continued
CMD ["pm2-runtime", "start", "/home/project/dist/index.js"]
