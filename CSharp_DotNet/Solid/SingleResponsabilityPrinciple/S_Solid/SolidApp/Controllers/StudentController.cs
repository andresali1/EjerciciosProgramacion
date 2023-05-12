using Microsoft.AspNetCore.Mvc;
using SolidApp.Models.ViewModel;
using SolidApp.Services;

namespace SolidApp.Controllers
{
    public class StudentController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Add(StudentViewModel student)
        {
            if(!ModelState.IsValid)
            {
                return View(student);
            }

            var studentService = new StudentService();
            studentService.Create(student);

            return Ok(); 
        }
    }
}
