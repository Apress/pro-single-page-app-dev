using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TheAgency.Models
{
    public class Agent
    {       
        [JsonProperty(PropertyName = "agentID")]
        public int AgentID { get; set; }
        [JsonProperty(PropertyName = "codeName")]
        public string CodeName { get; set; }
        [JsonProperty(PropertyName = "firstName")]
        public string FirstName { get; set; }
        [JsonProperty(PropertyName = "lastName")]
        public string LastName { get; set; }
        [JsonProperty(PropertyName = "imagePath")]
        public string ImagePath { get; set; }
        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }
        [JsonProperty(PropertyName = "tasks")]
        public IList<Task> Tasks { get; set; }
    }
}