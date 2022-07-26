# https://www.freecodecamp.org/news/how-to-build-a-web-application-using-flask-and-deploy-it-to-the-cloud-3551c985e492/

# https://www.youtube.com/watch?v=KgAtZ1LlNiQ&t=347s

# https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04

from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route("/") # webpage_url/...
def home():
	return render_template("index.html")

if __name__ == "__main__":
	app.run(debug=True)
