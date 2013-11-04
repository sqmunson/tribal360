<?php

$uri = str_replace(' ', '%20', $_GET["feed"]);

$xml = file_get_contents($uri);

header('Content-type: text/xml');
header('Access-Control-Allow-Origin: *');
echo $xml;

