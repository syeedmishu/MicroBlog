using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace WebAPI.Models
{
    [Table("Comments")]
   
    public class Comment
    {
        [Key]
        public int CommentID { get; set; }
        public string CommentDescription { get; set; }
        public DateTime CreationDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModificationDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool ActiveStatus { get; set; }
        public int PostID { get; set; }
        public virtual Post Post { get; set; }
        [NotMapped]
        public string UserName { get; set; }
        [NotMapped]
        public string FormattedDate { get; set; }
        [NotMapped]
        public string CommentDes { get; set; }
    }
}