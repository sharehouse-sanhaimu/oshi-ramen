# UpdateDate：2021/01/27

import sys
from urllib import request, parse, error
from http import HTTPStatus
import base64
import json
from pprint import pprint

HOST = 'xxxx.xxxxx.xxx'       # You will receive it when the license is issued.
ACCEPT = 'application/json;charset=utf-8'

# --------------------------------------------------------------------------------
# 1. Authentication

AUTH_URI = 'https://' + HOST + '/api/1/printing/oauth2/auth/token?subject=printer'
CLIENT_ID = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
SECRET = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
DEVICE = 'xxxxxxxxxxxxxx@xxx.xxx.xxx'

auth = base64.b64encode((CLIENT_ID + ':' + SECRET).encode()).decode()

query_param = {
    'grant_type': 'password',
    'username': DEVICE,
    'password': ''
}
query_string = parse.urlencode(query_param)

headers = {
    'Authorization': 'Basic ' + auth,
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
}

req, res, body, err_str = '', '', '', '';
try:
    req = request.Request(AUTH_URI, data=query_string.encode('utf-8'), headers=headers, method='POST')
    with request.urlopen(req) as res:
        body = res.read()
except error.HTTPError as err:
    err_str = str(err.code) + ':' + err.reason + ':' + str(err.read())
except error.URLError as err:
    err_str = err.reason

pprint('1. Authentication: ---------------------------------')
pprint(AUTH_URI)
pprint(query_string)
if res == '':
    pprint(err_str)
else:
    pprint(str(res.status) + ':' + res.reason)
    pprint(json.loads(body))

if err_str != '' or res.status != HTTPStatus.OK:
    sys.exit(1)

# --------------------------------------------------------------------------------
# 2. Register scan destination
subject_id = json.loads(body).get('subject_id')
access_token = json.loads(body).get('access_token')

add_uri = 'https://' + HOST + '/api/1/scanning/scanners/' + subject_id + '/destinations'

data_param = {
    'alias_name': 'sample_alias_name',
    'type': 'url',
    'destination': 'http://xxxxxxxxxx.com/xxxxxxxx/'
}
data = json.dumps(data_param)

headers = {
    'Authorization': 'Bearer ' + access_token,
    'Content-Type': 'application/json;charset=utf-8'
}

req, res, body, err_str = '', '', '', '';
try:
    req = request.Request(add_uri, data=data.encode('utf-8'), headers=headers, method='POST')
    with request.urlopen(req) as res:
        body = res.read()
except error.HTTPError as err:
    err_str = str(err.code) + ':' + err.reason + ':' + str(err.read())
except error.URLError as err:
    err_str = err.reason

pprint('2. Register scan destination: ----------------------')
pprint(add_uri)
pprint(data)
if res == '':
    pprint(err_str)
else:
    pprint(str(res.status) + ':' + res.reason)
    pprint(json.loads(body))
