<?php

require_once __DIR__.'/../vendor/autoload.php';

//Silex
$app = new Silex\Application();

//Config
$app['debug'] = true;

//Services

$app->register(new Silex\Provider\UrlGeneratorServiceProvider());

$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/../views',
));

$app->run();