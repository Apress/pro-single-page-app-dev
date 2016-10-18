define(['backbone', 'models/agent'], function (Backbone, Agent) {
    var Agents = Backbone.Collection.extend({
        model: Agent,        
        create: function(options) {
            this.push(new Agent(options));
        }
    });

    return Agents;
});