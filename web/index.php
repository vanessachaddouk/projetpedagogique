<?php

require_once __DIR__.'/../vendor/autoload.php';

//Silex
$app = new Silex\Application();

//Config
$app['debug'] = true;

$app->get('/', function () {
    return 'Hello world';
});

$app->run();

