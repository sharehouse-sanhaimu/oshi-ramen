<?php
// UpdateDateF2021/01/27

ini_set('xdebug.var_display_max_children', - 1);
ini_set('xdebug.var_display_max_data', - 1);
ini_set('xdebug.var_display_max_depth', - 1);


$host = 'xxxx.xxxxx.xxx'; // You will receive it when the license is issued.
$accept = 'application/json;charset=utf-8';
$protocol = '1.1';

//--------------------------------------------------------------------------------
// 1. Authentication

$auth_uri = 'https://' . $host . '/api/1/printing/oauth2/auth/token?subject=printer';
$client_id = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
$secret = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
$device = 'xxxxxxxxxxxxxx@xxx.xxx.xxx';

$auth = base64_encode("$client_id:$secret");

$query_param = array(
    'grant_type' => 'password',
    'username' => $device,
    'password' => ''
);
$query_string = http_build_query($query_param, '', '&');

$options = array(
    'http' => array(
        'method' => 'POST',
        'header' => 'Host: ' . $host . "\r\n" .
                    'Accept: ' . $accept . "\r\n" .
                    'Authorization: Basic ' . $auth . "\r\n" .
                    'Content-Length: ' . strlen($query_string) . "\r\n" .
                    'Content-Type: application/x-www-form-urlencoded; charset=utf-8' . "\r\n",
        'content' => $query_string,
        'request_fulluri' => true,
        'protocol_version' => $protocol,
        'ignore_errors' => true
    )
);

$http_response_header = null;
$response = @file_get_contents($auth_uri, false, stream_context_create($options));

$auth_result = array();
$auth_result['Response']['Header'] = $http_response_header;
$auth_result['Response']['Body'] = json_decode($response, true);

var_dump('1', $auth_uri, $query_string, $auth_result);

$matches = null;
preg_match('/HTTP\/1\.[0|1|x] ([0-9]{3})/', $auth_result['Response']['Header'][0], $matches);

if ($matches[1] !== '200') {
    exit(1);
}

//--------------------------------------------------------------------------------
// 2. Register scan destination

$subject_id = $auth_result['Response']['Body']['subject_id'];
$access_token = $auth_result['Response']['Body']['access_token'];

$add_uri = 'https://' . $host . '/api/1/scanning/scanners/' . $subject_id . '/destinations';

$data_param = array(
    'alias_name' => 'sample_alias_name',
    'type' => 'url',
    'destination' => 'http://xxxxxxxxxx.com/xxxxxxxx/'
);
$data = json_encode($data_param);

$options = array(
    'http' => array(
        'method' => 'POST',
        'header' => 'Host: ' . $host . "\r\n" .
        'Accept: ' . $accept . "\r\n" .
        'Authorization: Bearer ' . $access_token . "\r\n" .
        'Content-Length: ' . strlen($data) . "\r\n" .
        'Content-Type: application/json;charset=utf-8' . "\r\n",
        'content' => $data,
        'request_fulluri' => true,
        'protocol_version' => $protocol,
        'ignore_errors' => true
    )
);

$http_response_header = null;
$response = @file_get_contents($add_uri, false, stream_context_create($options));

$add_result = array();
$add_result['Response']['Header'] = $http_response_header;
$add_result['Response']['Body'] = json_decode($response, true);

var_dump('2', $add_uri, $data, $add_result);

