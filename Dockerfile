FROM aigc-portal-web-runtime:latest

WORKDIR /home/project

COPY . /home/project/

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' > /etc/timezone

CMD ["pm2-runtime", "start", "./bin/www", "--name", "aigc-portal-web", "--env", "production"]
