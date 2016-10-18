/// <reference path="../../../jasmine/jasmine.js" />
define(['models/task', 'views/taskView'], function (Task, TaskView) {
    return describe('Tests for task view', function () {
        beforeEach(function () {
            this.table = document.createElement('table');
            this.table.id = 'taskTable';
            document.querySelector('body').appendChild(this.table);

            this.model = new Task();
            this.view = new TaskView({ model: this.model });            
        });

        afterEach(function () {
            this.view.remove();
            document.querySelector('body').removeChild(this.table);
        });

        it('is initialize with tr as tag name.', function () {
            expect(this.view.tagName).toBe('tr');
        });

        describe('Rendering', function () {
            beforeEach(function () {
                window.app = { 
                    agents: jasmine.createSpyObj("agents", ["toJSON"])
                };                
            });

            afterEach(function () {
                window.app = undefined;
            });

            it('returns the view object', function () {
                expect(this.view.render()).toEqual(this.view);
            });

            it('is rendering the template with not complete when the task is not complete', function () {
                this.view.render();
                expect(this.view.$el.html()).toContain('<img src="images/NotCompleted.png" alt="in progress">');
            });

            it('is rendering the template with complete when the task is complete', function () {
                this.model.set('isComplete', true);
                this.view.render();
                expect(this.view.$el.html()).toContain('<img src="images/Completed.png" alt="completed">');
            });

            it('is toggling a task', function () {
                var isComplete = this.model.get('isComplete');
                this.view.render();
                this.table.appendChild(this.view.el);

                var event = new MouseEvent('click', {
                    'view': window,
                    'bubbles': true,
                    'cancelable': true
                });
                this.view.el.querySelector('td').dispatchEvent(event);

                expect(isComplete).toNotEqual(this.model.get('isComplete'));
                expect(window.app.agents.toJSON).toHaveBeenCalled();
                expect(this.model.get('isComplete')).toBe(true);
            })
        });
    });
});