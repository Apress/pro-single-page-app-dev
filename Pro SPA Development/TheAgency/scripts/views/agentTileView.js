define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    var agentTileView = Backbone.View.extend({
        template: _.template( $('#agent-tile-template').html() ),
        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
        }
    });

    return agentTileView;
});