using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using TheAgency.Models;

namespace TheAgency.Controllers
{
  [RoutePrefix("api/agents")]
  public class AgentsController : ApiController
  {
    [Route("")]
    public IEnumerable<Agent> Get()
    {
      //var agents = from a in Database.Agents
      //             select new Agent
      //             {
      //                 ID = a.ID,
      //                 AgentID = a.AgentID,
      //                 CodeName = a.CodeName,
      //                 FirstName = a.FirstName,
      //                 LastName = a.LastName,
      //                 ImagePath = a.ImagePath,
      //                 Description = a.Description
      //             };

      //return agents.ToArray();
      return Database.Agents;
    }

    [Route("{id}", Name = "GetAgent")]
    public Agent Get(int id)
    {
      Agent agent = Database.Agents.SingleOrDefault(a => a.AgentID == id);

      // Verify the agent exists before continuing
      if (agent == null)
      {
        throw new HttpResponseException(
            Request.CreateErrorResponse(HttpStatusCode.NotFound, "Agent not found"));
      }

      return agent;
    }

    [Route("")]
    public async Task<HttpResponseMessage> Post(Agent newAgent)
    {
      if (newAgent != null)
      {
        // Extract the image from the image string
        string regEx = "data:(.+);base64,(.+)";
        Match match = Regex.Match(newAgent.ImagePath, regEx);
        if (match.Success)
        {
          // Get the content-type of the file and the content
          string imageType = match.Groups[1].Value;
          string base64image = match.Groups[2].Value;

          if (imageType != null && base64image != null)
          {
            // Verify the content-type is an image
            string imageRegEx = "image/(.+)";
            match = Regex.Match(imageType, imageRegEx);
            if (match.Success)
            {
              // Get the file extension from the content-type
              string fileExtension = match.Groups[1].Value;
              // Get the byte-array of the file from the base64 string
              byte[] image = Convert.FromBase64String(base64image);

              string path = HttpContext.Current.Server.MapPath("~/images");
              string fileName = newAgent.FirstName + newAgent.LastName;

              // Generate a unique name for the file (add an index to it if it already exists)                                                        
              string targetFile = fileName + "." + fileExtension;
              int index = 0;
              while (File.Exists(Path.Combine(path, targetFile)))
              {
                index++;
                targetFile = fileName + index + "." + fileExtension;
              }

              // Write the image to the target file, and update the agent with the new image path
              File.WriteAllBytes(Path.Combine(path, targetFile), image);
              newAgent.ImagePath = "images/" + targetFile;

              newAgent = Database.AddAgent(newAgent);
              // Create the Location http header
              var response = Request.CreateResponse(HttpStatusCode.Created, newAgent);
              string uri = Url.Link("GetAgent", new { id = newAgent.AgentID });
              response.Headers.Location = new Uri(uri);

              return response;
            }
          }
        }
      }
      throw new HttpResponseException(Request.CreateErrorResponse(
          HttpStatusCode.BadRequest, "Could not deserialize agent"));
    }

    [Route("{id}")]
    public HttpResponseMessage Put(int id, Agent updatedAgent)
    {
      Agent agent = Database.Agents.SingleOrDefault(a => a.AgentID == id);

      // Verify the agent exists before continuing
      if (agent == null)
      {
        throw new HttpResponseException(
            Request.CreateErrorResponse(HttpStatusCode.NotFound, "Agent not found"));
      }

      // Update the task from the database
      agent.CodeName = updatedAgent.CodeName;
      agent.Description = updatedAgent.Description;
      agent.FirstName = updatedAgent.FirstName;
      agent.LastName = updatedAgent.LastName;

      return Request.CreateResponse(HttpStatusCode.NoContent);
    }

    [Route("{id}")]
    public HttpResponseMessage Delete(int id)
    {
      Agent agent = Database.Agents.SingleOrDefault(a => a.AgentID == id);

      // Verify the agent exists before continuing
      if (agent == null)
      {
        throw new HttpResponseException(
            Request.CreateErrorResponse(HttpStatusCode.NotFound, "Agent not found"));
      }

      // Update the task from the database
      Database.Agents.Remove(agent);

      return Request.CreateResponse(HttpStatusCode.NoContent);
    }

  }
}