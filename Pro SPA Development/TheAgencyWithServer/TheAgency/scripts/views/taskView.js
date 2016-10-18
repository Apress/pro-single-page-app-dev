define(['jquery', 'underscore', 'backbone', 'components/dataService'],
    function ($, _, Backbone, dataService) {
    var taskView = Backbone.View.extend({
        template: _.template($('#task-template').html()),
        tagName: 'tr',
        events: {
            'click td': 'toggleTask'
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        toggleTask: function (event) {
            var self = this;
            this.model.toggleComplete();
            dataService.updateTask(this.model).then(function () {
                self.render();
            });            
        }
    });

    return taskView;
});