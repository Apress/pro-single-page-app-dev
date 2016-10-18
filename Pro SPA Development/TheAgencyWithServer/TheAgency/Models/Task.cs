using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TheAgency.Models
{
    public class Task
    {
        [JsonProperty(PropertyName="taskID")]
        public int TaskID { get; set; }
        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }
        [JsonProperty(PropertyName = "isComplete")]
        public bool IsComplete { get; set; }
    }
}