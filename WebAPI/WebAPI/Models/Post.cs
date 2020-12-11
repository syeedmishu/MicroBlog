using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace WebAPI.Models
{
    [Table("Posts")]
    
    public class Post
    {
        [Key]
        public int PostID { get; set; }
        public string PostDescription { get; set; }
        public DateTime CreationDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModificationDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool ActiveStatus { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public List<Comment> CommentList { get; set; }
        [NotMapped]
        public string UserName { get; set; }
        [NotMapped]
        public string TotalComment { get; set; }
        public virtual ICollection<Vote> Votes { get; set; }
        [NotMapped]
        public int TotalUPVote { get; set; }
        [NotMapped]
        public int TotalDownVote { get; set; }
        [NotMapped]
        public bool IsUpvote { get; set; }
        [NotMapped]
        public bool IsDownvote { get; set; }

    }
}