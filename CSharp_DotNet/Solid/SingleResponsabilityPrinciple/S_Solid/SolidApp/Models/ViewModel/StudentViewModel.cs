namespace SolidApp.Models.ViewModel
{
    public class StudentViewModel
    {
        public string Name { get; set; }
        public string Subject { get; set; }

        public string GetInfo() => Name + ", " + Subject;
    }
}
