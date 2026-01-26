using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalExam_2.Data.Models
{
    public class Movie
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MinLength(2)]
        [MaxLength(80)]
        public string Title { get; set; }
        [Required]
        [MinLength(1900)]
        [MaxLength(2026)]
        public int ReleseYear { get; set; }
        [Required]
        [MinLength(40)]
        [MaxLength(300)]
        public int DuretionMinutes { get; set; }
        [Required]
        [MaxLength(30)]
        public string Genre { get; set; }
        public int DirectorId { get; set; }
        [ForeignKey("DirectorId")]
        public Director Director { get; set; }
        public ICollection<Viewing> Viewings { get; set; }

    }
}
