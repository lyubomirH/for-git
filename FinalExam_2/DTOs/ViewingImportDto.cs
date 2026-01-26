using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalExam_1.DTOs
{
    public class ViewingImportDto
    {
        public string? ViewerName { get; set; }
        public DateTime WatchedOn { get; set; }
        public int? Rating { get; set; }
    }
}