define(['jquery', 'underscore', 'backbone', 'models/agent', 'routers/router', 'components/dataService'],
    function ($, _, Backbone, Agent, Router, dataService) {
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

            var self = this,
                id;

            if(this.model.set(this.getCurrentFormValues(), {validate:true}))
            {
                id = ++app.agentID;
                this.model.set({ agentID: id, id: id});
                $.proxy(this.handleImageFile(function () {
                    app.agents.add(self.model);
                    dataService.saveData(app.agents);
                    Router.navigate('#/', {trigger: true});
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
