# AnnBoard
A fully-fledged modern anonymous imageboard website.

![image1](https://i.ibb.co/NmDCB0J/1.png)
![image2](https://i.ibb.co/9rFjDN8/2.png)

## Features
- Uses Flask
- Frontend is handled by Flask and Nunjucks
- Redis caching
- Cloudflare caching and purging
- Backblaze storage
- Public API (but has no documentation, see javascript files)
- Rate-limiter with nginx
- Docker support
- Moderation
- Anti-spam
- Auto bundling with Flask-Assets

Sadly it has no localization module so if you want to translate it to another language, say English, you need to change all .html and source files by hand.
