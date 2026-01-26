using FinalExam_2.Data.Config;
using FinalExam_2.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalExam_2.Data
{
    public class FinalExamDbContext : DbContext
    {
        public FinalExamDbContext()
        {
            Database.EnsureDeleted();
            Database.EnsureCreated();
        }
        public virtual DbSet<Director> Director { get; set; }
        public virtual DbSet<Movie> Movie { get; set; }
        public virtual DbSet<Viewing> Viewing { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder
                    .UseSqlServer(Connection.ConnectionString);
            }
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {

        }
    }
}
