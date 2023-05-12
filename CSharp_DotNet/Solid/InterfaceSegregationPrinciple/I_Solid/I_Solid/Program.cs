using System;
using System.Collections.Generic;
using System.Threading;

namespace I_Solid
{
    class Program
    {
        static void Main(string[] args)
        {

        }

        public class UserService : IBasicActions<User>
        {
            public void Add(User entity)
            {
                Console.WriteLine("Used added");
            }

            public User Get(int id)
            {
                Console.WriteLine("here is the user");
                return new User();
            }

            public List<User> GetList()
            {
                Console.WriteLine("There are the users");
                return new List<User>();
            }
        }

        public class Productervice : IBasicActions<Product>, IEditableActions<Product>
        {
            public void Add(Product entity)
            {
                Console.WriteLine("Product added");
            }

            public Product Get(int id)
            {
                Console.WriteLine("here is the product");
                return new Product();
            }

            public List<Product> GetList()
            {
                Console.WriteLine("There are the products");
                return new List<Product>();
            }

            public void Update(Product entity)
            {
                Console.WriteLine("Product updated");
            }

            public void Delete(Product entity)
            {
                Console.WriteLine("Product deleted");
            }
        }

        public interface IBasicActions<T>
        {
            public T Get(int id);
            public List<T> GetList();
            public void Add(T entity);
        }

        public interface IEditableActions<T>
        {
            public void Update(T entity);
            public void Delete(T entity);
        }

        public class User
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public int Age { get; set; }
        }

        public class Product
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public decimal price { get; set; }
        }
    }
}
