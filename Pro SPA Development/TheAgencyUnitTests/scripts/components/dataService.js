define(['collections/agents', 'collections/tasks'], function (Agents, Tasks) {
    // Get the maximum agent id to use later in the application
    function setMaxAgentID(agents) {
        app.agentId = _.max(agents,function (agent) {
            return agent.agentID;
        }).agentID;
    }

    // Get the maximum task id to use later in the application
    function setMaxTaskID(tasks) {
        app.taskID = _.max(tasks,function (task) {
            return task.taskID;
        }).taskID;
    }

    function getAgentsFromCache() {
        var agentsString = localStorage.getItem("agents");
        if (!agentsString) {
            generateInitialData();
            agentsString = localStorage.getItem("agents");
        }
        return JSON.parse(agentsString);
    }

    function generateInitialData() {
        var agents = [
            { id: 1, agentID: 1, codeName: '007', firstName: 'James', lastName: 'Bond', imagePath: 'images/JamesBondImage.png', description: 'Killer', tasks: [{ id: 1, taskID: 1, description: "Kill Goldfinger", isComplete: true }, { id: 2, taskID: 2, description: "Kill Renard", isComplete: true }]},
            { id: 2, agentID: 2, codeName: 'Q', firstName: 'Desmond', lastName: 'Llewelyn', imagePath: 'images/LDesmond.png', description: 'Master of Gadgets', tasks: [{ id: 3, taskID: 3, description: "Create a new James Bond car", isComplete: false }, { id: 4, taskID: 4, description: "Create a missle launcher pen", isComplete: false }]},
            { id: 3, agentID: 3, codeName: 'Ive', firstName: 'Vesper', lastName: 'Lynd', imagePath: 'images/VesperLynd.png', description: 'Seducer', tasks: [{ id: 5, taskID: 5, description: "Seduce James Bond", isComplete: true }]},
            { id: 4, agentID: 4, codeName: 'King', firstName: 'Chuck', lastName: 'Noris', imagePath: 'images/ChuckNoris.png', description: 'Facts Collector', tasks: [{ id: 6, taskID: 6, description: "Rule the world", isComplete: true }]}
        ];
        localStorage.setItem("agents", JSON.stringify(agents));
    }

    var DataService = {
        getData: function () {
            var agents = getAgentsFromCache(),
                tasks = [];

            _.each(agents, function (agent) {
                _.each(agent.tasks, function (task) {
                    tasks.push(task);
                });
                agent.tasks = new Tasks(agent.tasks);
            });

            // will be used as our client side models storage
            app.agents = new Agents(agents);
            setMaxAgentID(agents);
            setMaxTaskID(tasks);
        },
        saveData: function (agents) {
            localStorage.setItem("agents", JSON.stringify(agents.toJSON()));
        }
    };

    return DataService;
});