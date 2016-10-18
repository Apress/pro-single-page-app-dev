define(['jquery', 'underscore', 'backbone', 'components/appController'], function ($, _, Backbone, AppController) {
    var router = Backbone.Router.extend({
        routes: {
            '': 'home',
            'details/:id': 'details',
            'createAgent': 'createAgent'
        },

        initialize: function() {
            var routeName;
            for (var route in this.routes) {
                routeName = this.routes[route];
                this.route(route, routeName, $.proxy(AppController[routeName], AppController));
            }
        },

        start: function () {
            Backbone.history.start();
        }
    });

    return new router();
});