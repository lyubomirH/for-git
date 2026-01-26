using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalExam_1.DTOs
{
    public class DirectorImportDto
    {
        public string? FullName { get; set; }
        public string? Nationality { get; set; }

        public List<MovieImportDto> Movies { get; set; } = new();
    }
}