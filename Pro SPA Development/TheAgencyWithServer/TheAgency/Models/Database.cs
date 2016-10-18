using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TheAgency.Models
{
    public class Database
    {
        public static List<Task> Tasks = new List<Task> {
            new Task{TaskID=1, Description="Kill Goldfinger", IsComplete=true},
            new Task{TaskID=2, Description="Kill Renard", IsComplete=true},
            new Task{TaskID=3, Description="Create a new James Bond car", IsComplete=false},
            new Task{TaskID=4, Description="Create a missle launcher pen", IsComplete=false},
            new Task{TaskID=5, Description="Seduce James Bond", IsComplete=true}           ,
            new Task{TaskID=6, Description="Rule the world", IsComplete=true}    
        };


        public static List<Agent> Agents = new List<Agent> {
            new Agent{AgentID=1, CodeName="007", FirstName="James", LastName="Bond", ImagePath="images/JamesBondImage.png", Description="Killer"            },            
            new Agent{AgentID=2, CodeName="Q", FirstName="Desmond", LastName="Llewelyn", ImagePath="images/LDesmond.png", Description="Master of Gadgets"            },            
            new Agent{AgentID=3, CodeName="Ive", FirstName="Vesper", LastName="Lynd", ImagePath="images/VesperLynd.png", Description="Seducer"            },            
            new Agent{AgentID=4, CodeName="King", FirstName="Chuck", LastName="Noris", ImagePath="images/ChuckNoris.png", Description="Facts Collector"            },            
        };

        static Database()
        {
            Agents[0].Tasks = new List<Task> { Tasks[0], Tasks[1] };
            Agents[1].Tasks = new List<Task> { Tasks[2], Tasks[3] };
            Agents[2].Tasks = new List<Task> { Tasks[4] };
            Agents[3].Tasks = new List<Task> { Tasks[5] };
        }

        public static Task AddTask(Task newTask)
        {
            int newId = Tasks.Max(t => t.TaskID) + 1;
            newTask.TaskID = newId;
            Tasks.Add(newTask);
            return newTask;
        }

        public static Agent AddAgent(Agent newAgent)
        {
            int newId = Agents.Max(a => a.AgentID) + 1;
            newAgent.AgentID = newId;
            Agents.Add(newAgent);
            return newAgent;
        }
    }
}