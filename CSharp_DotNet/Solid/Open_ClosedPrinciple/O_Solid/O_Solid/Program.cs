using System;
using System.Collections;
using System.Collections.Generic;

namespace O_Solid
{
    class Program
    {
        static void Main(string[] args)
        {

        }

        public interface IFood
        {
            public string Name { get; set; }
            public decimal Price { get; set; }
            public decimal Invoice { get; set; }
            public decimal GetPrice();
        }

        public class Fruit : IFood
        {
            public string Name { get; set; }
            public decimal Price { get; set; }
            public decimal Invoice { get; set; }
            public decimal GetPrice()
            {
                return Price * Invoice;
            }
        }

        public class Sugary : IFood
        {
            public string Name { get; set; }
            public decimal Price { get; set; }
            public decimal Invoice { get; set; }
            public decimal Expiration { get; set; }
            public decimal GetPrice()
            {
                return (Price * Invoice) - Expiration;
            }
        }

        public class Meat : IFood
        {
            public string Name { get; set; }
            public decimal Price { get; set; }
            public decimal Invoice { get; set; }
            public decimal Discount { get; set; }
            public decimal GetPrice()
            {
                return (Price * Invoice) - Discount;
            }
        }

        public class Invoice
        {
            public decimal GetTotal(IEnumerable<IFood> lstFood)
            {
                decimal total = 0;
                foreach(IFood food in lstFood)
                {
                    total += food.GetPrice();
                }
                return total;
            }
        }
    }
}
