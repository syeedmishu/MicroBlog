using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;
using WebAPI.Models.Service;

namespace WebAPI.Controllers
{
    [Authorize]
    public class CommentController : ApiController
    {
        CommentService commentService = new CommentService();
        [HttpPost]
        [Route("api/comment/Create")]
        public IHttpActionResult CreatePosts(Comment comment)
        {
             
            string error = commentService.createComment(comment);


            if (error == "")
            {
                return Ok("Created");
            }
            else
            {
                return Ok(error);
            }

        }
    }
}
