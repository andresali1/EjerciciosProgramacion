using System;

namespace S_Solid
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
        }
    }

    public class Student
    {
        public string Name { get; set; }
        public string Subject { get; set; }

        public Student(string name, string subject)
        {
            Name = name;
            Subject = subject;
        }
    }

    public class StudentDB
    {
        private Student _student;

        public StudentDB(Student student)
        {
            _student = student;
        }

        public void Save()
        {
            Console.WriteLine($"Student {_student.Name} registered in {_student.Subject}");
        }
    }

    public class StudentRequest
    {
        private Student _student;

        public StudentRequest(Student student)
        {
            _student = student;
        }

        public void Send()
        {
            Console.WriteLine($"Request sent, data in body: {_student.Name}, {_student.Subject}");
        }
    }
}
