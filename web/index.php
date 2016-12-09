<?php

require_once __DIR__.'/../vendor/autoload.php';

//Silex
$app = new Silex\Application();

//Config
$app['debug'] = true;

// $app->get('/', function () {
//     return 'Hello world';
// });

$app->get('/hello', function () {
    return 'Hello!';
});

// Url Generator
$app->register(new Silex\Provider\UrlGeneratorServiceProvider());

$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/../views',
));


// Routes
$app->get('/',function() use ($app)
{
    $data = array();
    return $app['twig']->render('pages/home.twig',$data);
})
->bind('home');

$app->get('/page/{number}', function ($number) {
    return 'Page number : '.$number;
});


// Error
$app->error(function () use ($app)
{
    if($app['debug'])
        return;

    $data = array(
        'title' => 'Error'
    );

    return $app['twig']->render('pages/error.twig',$data);
});

//Toto
$app->get('/',function()
{
    global $app;

    $data = array(
        'value' => 'Toto'
    );

    return $app['twig']->render('example.twig',$data);
});

$app->run();

