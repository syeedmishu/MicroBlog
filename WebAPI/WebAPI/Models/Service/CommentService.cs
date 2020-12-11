using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models.Service
{
    public class CommentService
    {
        private DatabaseContext db = new DatabaseContext();
        public string createComment(Comment cmt)
        {
            if (cmt != null)
            {
                try
                {
                    Comment c = new Comment();
                    c.CommentDescription = cmt.CommentDescription;
                    c.CreatedBy = db.getUserId();
                    c.PostID = cmt.PostID;
                    c.CreationDate = DateTime.Now;
                    c.ActiveStatus = true;

                    db.Comments.Add(c);
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