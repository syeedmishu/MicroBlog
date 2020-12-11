using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using WebAPI.Models;
using WebAPI.Models.Service;

namespace WebAPI.Controllers
{
    [Authorize]
    public class PostController : ApiController
    {
        private DatabaseContext db = new DatabaseContext();
        PostService postServiec = new PostService();
    
        // GET: api/Post
        [HttpGet]
        [Route("api/Post")]
        public IHttpActionResult GetPosts()
        {
           
            List<Post> posts = postServiec.getPosts();

            if (posts == null)
            {
                return NotFound();
            }
            return Ok(posts);
        }
       
        [HttpPost]
        [Route("api/Post/Create")]
        public IHttpActionResult CreatePosts(Post post)
        {
            string error = postServiec.createPost(post);
            

            if (error == "")
            {
                return Ok("Saved Successfully");
            }
            else
            {
                return Ok(error);
            }
            
        }

      
        [HttpPost]
        [Route("api/Post/Upvote")]
        public IHttpActionResult Upvote(Vote vote)
        {
            string error = postServiec.upvote(vote);


            if (error == "")
            {
                return Ok("Saved Successfully");
            }
            else
            {
                return Ok(error);
            }

        }

    
        [HttpPost]
        [Route("api/Post/Downvote")]
        public IHttpActionResult Downvote(Vote vote)
        {
            string error = postServiec.downvote(vote);


            if (error == "")
            {
                return Ok("Saved Successfully");
            }
            else
            {
                return Ok(error);
            }

        }

    }
}
