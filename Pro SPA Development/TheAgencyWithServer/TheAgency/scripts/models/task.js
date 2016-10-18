define(['backbone'], function (Backbone) {
    var task = Backbone.Model.extend({        
        defaults: {            
            description: '',
            isComplete: false,
            agentID: 0
        },
        idAttribute: 'taskID',
        validate: function(attrs, options) {
            if (attrs.description.length == 0) {
                return "You must add a description!";
            }
        },
        toggleComplete: function() {
            this.set("isComplete", !this.get('isComplete'));
        }
    });

    return task;
});