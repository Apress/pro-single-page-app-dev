using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using TheAgency.Models;

namespace TheAgency.Controllers
{
    [RoutePrefix("api/agents/{agentId}/tasks")]
    public class TasksController : ApiController
    {
        [Route("")]
        public IEnumerable<Task> Get(int agentId)
        {
            Agent agent = Database.Agents.SingleOrDefault(a => a.AgentID == agentId);

            // Verify the agent exists before continuing
            if (agent == null)
            {
                throw new HttpResponseException(
                    Request.CreateErrorResponse(HttpStatusCode.NotFound, "Agent not found"));
            }
            return agent.Tasks;
        }

        [Route("{taskId}", Name = "GetTask")]
        public Task Get(int agentId, int taskId)
        {
            Agent agent = Database.Agents.SingleOrDefault(a => a.AgentID == agentId);

            // Verify the agent exists before continuing
            if (agent == null)
            {
                throw new HttpResponseException(
                    Request.CreateErrorResponse(HttpStatusCode.NotFound, "Agent not found"));
            }

            // Verify the task exists (instead of retuning an empty response)
            Task task = agent.Tasks.Where(t => t.TaskID == taskId).SingleOrDefault();
            if (task == null)
            {
                throw new HttpResponseException(
                    Request.CreateErrorResponse(HttpStatusCode.NotFound, "Task not found"));
            }

            return task;
        }

        [HttpPost]
        [Route("")]
        public HttpResponseMessage NewTask(int agentId, Task newTask)
        {
            Agent agent = Database.Agents.SingleOrDefault(a => a.AgentID == agentId);

            // Verify the agent exists before continuing
            if (agent == null)
            {
                throw new HttpResponseException(
                    Request.CreateErrorResponse(HttpStatusCode.NotFound, "Agent not found"));
            }

            // Create the task and attach it to the agent entity
            newTask = Database.AddTask(newTask);
            agent.Tasks.Add(newTask);

            var response = Request.CreateResponse(HttpStatusCode.Created, newTask);
            // Create the Location http header
            string uri = Url.Link("GetTask", new { agentId = agentId, taskId = newTask.TaskID });
            response.Headers.Location = new Uri(uri);

            return response;
        }

        [Route("{taskId}")]
        public HttpResponseMessage Put(int agentId, int taskId, Task updatedTask)
        {
            Agent agent = Database.Agents.SingleOrDefault(a => a.AgentID == agentId);

            // Verify the agent exists before continuing
            if (agent == null)
            {
                throw new HttpResponseException(
                    Request.CreateErrorResponse(HttpStatusCode.NotFound, "Agent not found"));
            }

            // Verify the task exists (instead of retuning an empty response)
            Task task = agent.Tasks.Where(t => t.TaskID == taskId).SingleOrDefault();
            if (task == null)
            {
                throw new HttpResponseException(
                    Request.CreateErrorResponse(HttpStatusCode.NotFound, "Task not found"));
            }

            // Update the task from the database
            task.Description = updatedTask.Description;
            task.IsComplete = updatedTask.IsComplete;

            return Request.CreateResponse(HttpStatusCode.NoContent);
        }
    }
}