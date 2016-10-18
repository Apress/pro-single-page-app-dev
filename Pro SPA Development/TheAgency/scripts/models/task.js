define(['backbone'], function (Backbone) {
    var task = Backbone.Model.extend({
        defaults: {
            taskID: 0,
            description: '',
            isComplete: false
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

