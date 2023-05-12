using SolidApp.Models.Db;
using SolidApp.Models.ViewModel;
using SolidApp.Utils;

namespace SolidApp.Services
{
    public class StudentService
    {
        public void Create(StudentViewModel student)
        {
            var studentDB = new StudentDB();
            var log = new Log();

            studentDB.Save(student);
            log.Save("New student saved: " + student.GetInfo());
        }
    }
}
