using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalExam_2.Data.Models
{
    public class Director
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(60)]
        public string FullName { get; set; }
        [Required]
        [MaxLength(40)]
        public string Nationality { get; set; }
        public ICollection<Movie> Movies { get; set; }
    }
}
