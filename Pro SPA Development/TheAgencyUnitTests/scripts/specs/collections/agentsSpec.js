/// <reference path="../../../jasmine/jasmine.js" />
define(['models/agent', 'collections/agents'], function (Agent, Agents) {
    return describe('Tests for agent collection', function () {
        var agents;

        beforeEach(function () {
            agents = new Agents();
        });

        it('is initialize for agent model.', function () {           
            expect(agents.model).toBe(Agent);            
        });

        it('Can create a new agent when provided an options object.', function () {
            expect(agents.length).toBe(0);
            agents.create(new Agent());
            expect(agents.length).toBe(1);
        });
    });
});