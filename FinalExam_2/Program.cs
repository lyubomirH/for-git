using FinalExam_1.DTOs;
using FinalExam_2.Data;
using FinalExam_2.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Newtonsoft.Json;
using System.Text;

namespace FinalExam_2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var context = new FinalExamDbContext();
            string solutionRoot = Directory.GetParent(Directory.GetCurrentDirectory()).Parent.Parent.FullName; //
            string path = Path.Combine(solutionRoot, "Dataset", "cinema-import.json");                         // път към файла 

            string json = File.ReadAllText(path);  // четене 

            var directorImports = JsonConvert.DeserializeObject<List<DirectorImportDto>>(json);  //Тук се изпълнява десирелазацията на дините за да може да работиш с DTO

            foreach (var directorImport in directorImports)
            {
                if (directorImport.FullName == null){}
                else if (directorImport.FullName.Length <= 3 || directorImport.FullName.Length >= 60){}
                else if (directorImport.Nationality != null && directorImport.Nationality.Length >= 40){}
                else
                {
                    var director = new Director //мапинг => сочис на даните към кое трябва да сочат
                    {
                        FullName = directorImport.FullName,
                        Nationality = directorImport.Nationality
                    };

                    context.Director.Add(director);
                    context.SaveChanges();

                    if (directorImport.Movies != null)
                    {
                        foreach (var movieDto in directorImport.Movies)
                        {
                            if (movieDto.Title == null){}
                            else if (movieDto.Title.Length <= 2 || movieDto.Title.Length >= 80){}
                            else if (movieDto.ReleaseYear <= 1900 || movieDto.ReleaseYear >= 2026){}
                            else if (movieDto.DurationMinutes <= 40 || movieDto.DurationMinutes >= 300){}
                            else if (movieDto.Genre != null && movieDto.Genre.Length >= 80){}
                            else
                            {
                                var movie = new Movie                         //мапинг => сочис на даните към кое трябва да сочат
                                {
                                    Title = movieDto.Title,
                                    ReleseYear = movieDto.ReleaseYear,
                                    DuretionMinutes = movieDto.DurationMinutes,
                                    Genre = movieDto.Genre,
                                    DirectorId = director.Id
                                };

                                context.Movie.Add(movie);
                                context.SaveChanges();

                                if (movieDto.Viewings != null)
                                {
                                    foreach (var viewingDto in movieDto.Viewings)
                                    {
                                        if (viewingDto.ViewerName == null){}
                                        else if (viewingDto.ViewerName.Length <= 2 || viewingDto.ViewerName.Length >= 50){}
                                        else if (viewingDto.Rating <= 1 || viewingDto.Rating >= 10){}
                                        else
                                        {
                                            var viewing = new Viewing           //мапинг => сочис на даните към кое трябва да сочат
                                            {
                                                ViewerName = viewingDto.ViewerName,
                                                WatchedOn = viewingDto.WatchedOn,
                                                Rating = viewingDto.Rating,
                                                MovieId = movie.Id
                                            };

                                            context.Viewing.Add(viewing);
                                        }
                                    }
                                }
                            }
                        }
                        context.SaveChanges();
                    }
                }
            }

            // заявка (не е напрално еднаква с тази от задачата)

            var result = context.Director
                .Include(d => d.Movies)
                .ThenInclude(m => m.Viewings)
                .Select(d => new
                {
                    d.FullName,
                    d.Nationality,
                    Movies = d.Movies.Select(m => new
                    {
                        m.Title,
                        countOfViewings = m.Viewings.Count
                    }).OrderBy(m => m.countOfViewings).ToList()
                })
                .Take(5)
                .ToList();

            var sb = new StringBuilder();
            foreach (var d in result)
            {
                int viewingsCount = 0;
                foreach (var m in d.Movies)
                {
                    viewingsCount += m.countOfViewings;
                }
                sb.AppendLine($"Director: {d.FullName} ({d.Nationality}) - TotalViewings:{viewingsCount}");
                if (d.Movies.Count > 0)
                {
                    sb.AppendLine($"-TopMovie: {d.Movies[0].Title} => {d.Movies[0].countOfViewings} viewings");
                }
            }
            Console.WriteLine(sb.ToString());
        }
    }
}