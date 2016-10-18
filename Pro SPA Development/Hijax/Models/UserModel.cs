using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Hijax.Models
{
  public class User
  {
    public string Username { get; set; }
    public string Password { get; set; }

    public static User CreateUser(string username, string password)
    {
      return new User
      {
        Username = username,
        Password = password
      };
    }
  }
}