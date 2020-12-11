using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models.Service
{
    public class PostService
    {
        
        private DatabaseContext db = new DatabaseContext();
        public List<Post> getPosts()
        {
            var current_user = db.getUserId();
            List<Post> Posts = db.Posts.OrderByDescending(x => x.CreationDate).ToList();
            if(Posts.Count > 0)
            {
                for(int i = 0; i < Posts.Count; i++)
                {
                    var postid = Posts[i].PostID;
                    var userid = Posts[i].CreatedBy;
                    Posts[i].UserName = db.Users.FirstOrDefault(x => x.Id == userid).UserName.ToString();
                    var totalcomment = db.Comments.Where(x => x.PostID == postid).ToList().Count;
                    Posts[i].TotalComment = totalcomment.ToString();
                    Posts[i].CommentList = db.Comments.Where(x => x.PostID == postid).ToList();
                    Posts[i].IsUpvote = db.Votes.Where(x => x.UPVote == true && x.PostID == postid && x.CreatedBy == current_user).ToList().Count > 0 ? true : false;
                    Posts[i].IsDownvote = db.Votes.Where(x => x.DownVote == true && x.PostID == postid && x.CreatedBy == current_user).ToList().Count > 0 ? true : false;
                    Posts[i].TotalUPVote = db.Votes.Where(x => x.PostID == postid && x.UPVote).ToList().Count;
                    Posts[i].TotalDownVote = db.Votes.Where(x => x.PostID == postid && x.DownVote).ToList().Count;
                    var comment = Posts[i].CommentList;
                    if (comment.Count > 0)
                    {
                        
                        for (int j = 0; j < comment.Count; j++)
                        {
                            var ct = comment[j].CreatedBy;
                            comment[j].UserName  = db.Users.FirstOrDefault(x => x.Id == ct).UserName.ToString();

                        }
                    }
                }
            }


            return Posts;
        }

        public string createPost(Post post)
        {
            
            if (post != null)
            {
                try { 
                Post p = new Post();
                p.PostDescription = post.PostDescription;
                p.CreatedBy = db.getUserId();
                p.CreationDate = DateTime.Now;
                p.ActiveStatus = true;

                    db.Posts.Add(p);
                    db.SaveChanges();
                    return "";

                }catch(Exception e)
                {
                    return e.Message;
                }
            }
            else
            {
                return "Data not found";
            }
            
        }
        public string upvote(Vote vote)
        {

            if (vote != null)
            {
                try
                {
                    var userid = db.getUserId();
                    var data = db.Votes.Where(x => x.PostID == vote.PostID && x.CreatedBy == userid).ToList();
                    
                    if(data.Count > 0)
                    {
                        var updatedData = data.FirstOrDefault();
                        updatedData.UPVote = true;
                        updatedData.DownVote = false;
                        updatedData.PostID = vote.PostID;
                        updatedData.CreatedBy = userid;
                        updatedData.CreationDate = DateTime.Now;
                        db.Entry(updatedData).State = System.Data.Entity.EntityState.Modified;
                    }
                    else
                    {
                        Vote v = new Vote();
                        v.UPVote = true;
                        v.DownVote = false;
                        v.PostID = vote.PostID;
                        v.CreatedBy = userid;
                        v.CreationDate = DateTime.Now;
                        db.Votes.Add(v);
                    }
                   
                    db.SaveChanges();
                    return "";

                }
                catch (Exception e)
                {
                    return e.Message;
                }
            }
            else
            {
                return "Data not found";
            }

        }
        public string downvote(Vote vote)
        {

            if (vote != null)
            {
                try
                {
                    var userid = db.getUserId();
                    var data = db.Votes.Where(x => x.PostID == vote.PostID && x.CreatedBy == userid).ToList();

                    if (data.Count > 0)
                    {
                        var updatedData = data.FirstOrDefault();
                        updatedData.UPVote = false;
                        updatedData.DownVote = true;
                        updatedData.PostID = vote.PostID;
                        updatedData.CreatedBy = userid;
                        updatedData.CreationDate = DateTime.Now;
                        db.Entry(updatedData).State = System.Data.Entity.EntityState.Modified;
                    }
                    else
                    {
                        Vote v = new Vote();
                        v.UPVote = false;
                        v.DownVote = true;
                        v.PostID = vote.PostID;
                        v.CreatedBy = userid;
                        v.CreationDate = DateTime.Now;
                        db.Votes.Add(v);
                    }

                    db.SaveChanges();
                    return "";

                }
                catch (Exception e)
                {
                    return e.Message;
                }
            }
            else
            {
                return "Data not found";
            }

        }
    }
}