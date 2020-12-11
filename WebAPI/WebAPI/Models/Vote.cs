using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    [Table("Votes")]
    public class Vote
    {
        [Key]
        public int ID { get; set; }
        public bool UPVote { get; set; }
        public bool DownVote { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreationDate { get; set; }
        public int PostID { get; set; }
        public virtual Comment Comment { get; set; }
    }
}