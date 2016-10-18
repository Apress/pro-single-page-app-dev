define(['collections/agents', 'collections/tasks'],
    function (Agents, Tasks) {
        function adjustTasks(agents) {
            var tasks = [];
            agents.each(function (agent) {
                _.each(agent.get('tasks'), function (task) {
                    task.agentID = agent.get('agentID');
                    tasks.push(task);
                });
                agent.set('tasks', new Tasks(tasks));
                tasks.length = 0;
            });
        }
        var DataService = {
            getData: function () {
                var deferred = $.Deferred();
                var agents = new Agents();
                agents.fetch().then(function () {
                    adjustTasks(agents);
                    app.agents = agents;
                    deferred.resolve();
                });
                return deferred.promise();
            },
            addTask: function (task) {
                task.url = '/api/agents/' + task.get('agentID') + '/tasks'
                return task.save();
            },
            updateTask: function (task) {
                task.url = '/api/agents/' + task.get('agentID') + '/tasks/' + task.get('taskID');
                return Backbone.sync('update', task);
            },
            createAgent: function (agent) {
                agent.url = '/api/agents'
                return Backbone.sync('create', agent);
            },
            updateAgent: function (agent) {
                return Backbone.sync('update', agent);
            },
            deleteAgent: function (agent) {
                return agent.destroy();
            }
        };

        return DataService;
    });