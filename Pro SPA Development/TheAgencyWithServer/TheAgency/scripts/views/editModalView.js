define(['jquery', 'underscore', 'backbone', 'modalDialog', 'components/dataService'],
    function ($, _, Backbone, ModalView, dataService) {
    var editModalView = Backbone.ModalView.extend({
        name: 'editAgentView',
        template: _.template($('#edit-template').html()),
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        events: {
            'click #saveEditButton': 'updateAgent'
        },
        updateAgent: function (event) {
            event.preventDefault();
            var self = this;

            if(this.model.set(this.getCurrentFormValues(), {validate:true}))
            {
                dataService.updateAgent(this.model).then(function () {
                    self.hideModal();
                });                       
            }
            else {
                $('#validationError').text(this.model.validationError);
            }
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

    return editModalView;
});