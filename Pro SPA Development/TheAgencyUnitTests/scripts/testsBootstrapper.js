require.config({
    baseUrl: "scripts/lib",
    paths: {
        jquery: 'jquery',
        underscore: 'underscore',
        backbone: 'backbone',
        jasmine: '../../jasmine/jasmine',
        'jasmine-html': '../../jasmine/jasmine-html',
        spec: '../test/jasmine/spec/',
        models: '../models',
        collections: '../collections',
        views: '../views',
        components: '../components'
    },
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        jasmine: {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        }
    }
});

require(['underscore', 'jquery', 'jasmine-html'], function (_, $, jasmine) {
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();
    jasmineEnv.addReporter(htmlReporter);
    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };

    var specs = [];
    specs.push('../specs/models/agentSpec');
    specs.push('../specs/collections/agentsSpec');
    specs.push('../specs/views/taskViewSpec');

    $(function () {
        require(specs, function () {
            jasmineEnv.execute();
        });
    });
});

