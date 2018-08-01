FROM ubuntu:16.04
LABEL maintainer "soccer"

RUN apt-get update && apt-get install -y --no-install-recommends \
        build-essential \
        libglib2.0-0 \
        libsm6 \
        libxrender1 \
        libxext6 \
        python3 \
        python3-setuptools \
        python3-pip \
        python3-dev \
        nginx \
        vim \
        net-tools \
        ffmpeg \
        locales && \
    rm -rf /var/lib/apt/lists/*


RUN mkdir -p /usr/local/share/man /home/videoeditor && locale-gen zh_CN.utf8 && \
    pip3 install --upgrade pip && \ 
    pip install --no-cache-dir django==1.11.6 && \
    pip install --no-cache-dir uwsgi && \ 
    pip install --no-cache-dir django-background-tasks 
RUN rm -f /usr/bin/python && ln -s /usr/bin/python3 /usr/bin/python && rm -f /etc/nginx/sites-enabled/default

EXPOSE 80 443
WORKDIR /home/videoeditor/
CMD (uwsgi --chdir /home/videoeditor --master --workers 3 --socket 127.0.0.1:4242 --module videoeditor.wsgi)& sleep 5 && nginx -g 'daemon off;'
