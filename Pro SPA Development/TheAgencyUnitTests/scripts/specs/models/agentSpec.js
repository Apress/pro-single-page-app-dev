/// <reference path="../../../jasmine/jasmine.js" />
define(['models/agent'], function (Agent) {
    return describe('Tests for agent model', function () {
        var agent;

        beforeEach(function () {
            agent = new Agent();
        })

        it('is initialize with default values.', function () {            
            expect(agent.get('codeName')).toBe('');
            expect(agent.get('firstName')).toBe('');
            expect(agent.get('lastName')).toBe('');
            expect(agent.get('imagePath')).toBe('');
            expect(agent.get('description')).toBe('');
            expect(agent.get('tasks')).toBeDefined();
        });


        it('is initialize with idAttribute', function () {
            expect(agent.idAttribute).toBe('agentID');
        });

        it('will trigger an invalid event on failed validation.', function () {
            var errorCallback = jasmine.createSpy('errorCallback');
            
            agent.on('invalid', errorCallback);

            agent.set({ firstName: '' }, { validate: true });

            var errorArgs = errorCallback.mostRecentCall.args;

            expect(errorArgs).toBeDefined();
            expect(errorArgs[0]).toBe(agent);
            expect(errorArgs[1]).toBe('Name must include first name and last name!');
        });
    });
});