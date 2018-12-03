from flask import Flask
import random
import json
from flask_cors import CORS, cross_origin
import time
from flask_pymongo import PyMongo
from flask import request

app = Flask(__name__)
CORS(app,expose_headers='Authorization')
app.config['MONGO_DBNAME'] = 'restdb'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/restdb'

mongo = PyMongo(app)

@app.route('/')
def getChart():
    millis = int(round(time.time() * 1000))
    size = 10
    currTime = 0
    lis = random.sample(range(1, 100), size)
    arr = [0] * 10
    for i in range (size):
    	arr[size-i-1] = [millis-currTime, lis[i]]
        currTime = currTime + 1000
    table1 = mongo.db.table1
    table1.insert({'metrics': arr})
    return json.dumps(arr)

@app.route('/savemetrics', methods=['POST'])
def addTable2():
    table2 = mongo.db.table2
    metrics = request.json['metrics']
    star_id = table2.insert({'metrics': metrics})
    return "rr"

@app.route('/getmetrics')
def getTable2():
    table2 = mongo.db.table2
    output = []
    for s in table2.find():
	for s1 in s['metrics']:
	    output.append(s1)
    if len(output) > 100:
	output = output[:100]
    return json.dumps(output)
    
if __name__ == '__main__':
    app.run(debug=True)
