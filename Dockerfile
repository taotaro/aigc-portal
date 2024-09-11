FROM node:18

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' > /etc/timezone

WORKDIR /home/project

# COPY . /home/project/
COPY . .


RUN npm install 
RUN npm run build

CMD ["pm2-runtime", "start", "--name", "aigc-portal", "npm", "--", "run", "start"]