from flask import Flask, render_template, jsonify
from utils.jsonIO import *
import time
import logging
import subprocess
import traceback

# use this instead later https://github.com/twisted/klein
settings = read_json('settings.json')
reload_rate = min(settings['REFRESH_RATES'].values())
begin_time = time.perf_counter()
api_path = settings['API_PATH']
api_data = {}


app = Flask(__name__)

@app.route("/")
def index():
	return render_template('index.html')

@app.route("/api")
def api():
	global begin_time
	global api_data
	if time.perf_counter() - begin_time > reload_rate:
		begin_time = time.perf_counter()
		try:
			new_data = read_json(api_path)
		except Exception as e:
			logging.error("Error reading {} data: {}".format(api_path,e))
			traceback.print_exc()
		else:
			api_data = new_data
	return jsonify(**api_data)


if __name__ == "__main__":
	logging.info("starting worker")
	sub = subprocess.Popen(['python3', 'worker.py'])
	logging.info(str(sub))
	app.run(host="0.0.0.0", port=5000)
