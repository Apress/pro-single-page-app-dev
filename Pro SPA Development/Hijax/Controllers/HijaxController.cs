using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;
using Hijax.Models;

namespace Hijax.Controllers
{
    public class HijaxController : ApiController
    {
        // POST api/hijax
        public User Post(FormDataCollection collection)
        {          
          return Hijax.Models.User.CreateUser(collection.Get("username"), 
            collection.Get("password"));
        }
    }
}
