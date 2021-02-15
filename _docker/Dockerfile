FROM tiangolo/uwsgi-nginx-flask:python3.8

#ENV VALUES

ENV ann_file_upload_url "https://cdn.anonimce.com/uc"
ENV ann_use_safer_proxy "yes"

ENV ann_is_windows "no"

ENV FLASK_APP "main.py"

RUN apt-get install -y unzip \
    && apt-get install -y wget

#Import source 

COPY ./app/ /app
COPY ./app/confd.nginx.conf /etc/nginx/conf.d/nginx.conf

RUN rm /app/Jenkinsfile

RUN pip install -r requirements.txt \
    && pip install mysqlclient

RUN apt-get update \
    && apt-get install -y nodejs \
    && apt-get install -y nginx \
    && apt-get install -y npm \
    && npm install -g uglify-es \
    && apt-get install -y screen
