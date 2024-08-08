FROM PROJECT_NAME-runtime:latest

WORKDIR /home/project

COPY . /home/project/

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' > /etc/timezone

# RUN npm install 
RUN npm run build

CMD ["pm2-runtime", "start", "--name", "aigc-portal", "npm", "--", "run", "start"]
