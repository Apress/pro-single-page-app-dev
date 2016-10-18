define(['jquery', 'underscore', 'backbone', 'models/agent', 'collections/tasks', 'routers/router', 'components/dataService'], function ($, _, Backbone, Agent, Tasks, Router, dataService) {
    var createView = Backbone.View.extend({
        template: _.template($('#create-template').html()),
        tagName: 'div',
        initialize: function () {
          this.model = new Agent();
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        events: {
            'click #saveEditButton': 'createAgent',
            'click #btnBack': 'back'
        },
        createAgent: function (event) {
            event.preventDefault();

            var self = this;            

            if(this.model.set(this.getCurrentFormValues(), {validate:true}))
            {                
                $.proxy(this.handleImageFile(function () {                    
                    dataService.createAgent(self.model).then(function (newAgent) {
                        app.agents.add(newAgent);
                        app.agents.get(newAgent.agentID).set('tasks', new Tasks());
                        Router.navigate('#/', { trigger: true });
                    });                    
                }), this);
            }
            else {
                $('#validationError').text(this.model.validationError);
            }
        },
        handleImageFile: function (callback) {
            var file = document.getElementById('txtImage').files[0],
                reader  = new FileReader(),
                self = this;

            if (file) {
                reader.onloadend = function () {
                    self.model.set({ imagePath: reader.result });
                    callback();
                }
                reader.readAsDataURL(file);
            }
            else {
                callback();
            }
        },
        back: function() {
            Router.navigate('#/', {trigger: true});
        },
        getCurrentFormValues: function() {
            return {
                firstName: $('#txtFirstName').val(),
                lastName: $('#txtLastName').val(),
                codeName: $('#txtCodeName').val(),
                description: $('#txtDescription').val()                
            };
        }
    });

    return createView;
});
