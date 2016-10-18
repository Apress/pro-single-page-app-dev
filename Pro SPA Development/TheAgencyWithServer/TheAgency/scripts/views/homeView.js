define(['jquery', 'underscore', 'backbone', 'views/agentTileView', "routers/router"],
    function ($, _, Backbone, agentTileView, Router) {
    var homeView = Backbone.View.extend({
        tagName: 'div',
        initialize: function() {
            this.collection = app.agents;
        },
        render: function() {
            this.$el.empty();
            this.$el.append(this.addCreateAgentButton());
            this.collection.each(function(item) {
                this.addOne(item);
            }, this);
            return this;
        },
        addCreateAgentButton: function() {
            var btn = document.createElement('input');
            btn.type = 'button';
            btn.value = 'Create Agent';
            btn.className = 'default';
            btn.id = 'btnCreateAgent';
            btn.addEventListener('click', function() {
                Router.navigate('#/createAgent', {trigger: true});
            }, false);
            return btn;
        },
        addOne: function(agent) {
            var view = new agentTileView({ model: agent });
            this.$el.append(view.render().el);
        }
    });

    return homeView;
});