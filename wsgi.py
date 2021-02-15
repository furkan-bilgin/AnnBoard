from main import create_app, platform

app = create_app("config.py")

if __name__ == "__main__":
    if platform == "windows":
        app.run(host="0.0.0.0", debug=True)
    else:
        app.run(host='0.0.0.0')
else:
    application = app