requirejs.config({
    //By default load any module IDs from scripts/lib
    baseUrl: 'scripts/lib',
    paths: {
        models: '../models',
        collections: '../collections',
        views: '../views',
        routers: '../routers',
        components: '../components',
        modalDialog: 'backbone.ModalDialog',
        templates: '../templates'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

var app = app || {};

require(['routers/router', 'components/dataService'], function (router, dataService) {
    $(document).ready(function (){
        dataService.getData();
        router.start();
    });
});