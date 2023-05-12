using SolidApp.Models.ViewModel;
using System;

namespace SolidApp.Models.Db
{
    public class StudentDB
    {
        public void Save(StudentViewModel student)
        {
            Console.WriteLine("Save in BD" + student.Name);
        }
    }
}
