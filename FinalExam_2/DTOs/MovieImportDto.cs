using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalExam_1.DTOs
{
    public class MovieImportDto
    {
        public string? Title { get; set; }
        public int ReleaseYear { get; set; }
        public int DurationMinutes { get; set; }
        public string? Genre { get; set; }

        public List<ViewingImportDto> Viewings { get; set; } = new();
    }
}