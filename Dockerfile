FROM PROJECT_NAME-runtime:latest

WORKDIR /home/project

COPY . /home/project/

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' > /etc/timezone

RUN npm run dev

CMD ["pm2-runtime", "start", "--name", "aigc-portal-web", "npm", "--", "run", "start"]
