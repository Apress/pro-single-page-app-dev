define(['backbone', 'collections/tasks'], function (Backbone, Tasks) {
    var agent = Backbone.Model.extend({
        defaults: {
            agentID: 0,
            codeName: '',
            firstName: '',
            lastName: '',
            imagePath: '',
            description: '',
            tasks: new Tasks()
        },
        idAttribute: 'agentID',
        validate: function(attrs, options) {
            if (attrs.firstName.length == 0 || attrs.lastName.length == 0) {
                return "Name must include first name and last name!";
            }
        }
    });

    return agent;
});
