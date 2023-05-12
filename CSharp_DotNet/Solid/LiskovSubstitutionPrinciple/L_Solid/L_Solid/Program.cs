using System;

namespace L_Solid
{
    class Program
    {
        static void Main(string[] args)
        {
            AbstractSale sale = new LocalSale(5, "Nick", 19);
            sale.Generate();

            sale = new ForeignSale(2, "Sam");
            sale.Generate();
        }
        

        public abstract class AbstractSale
        {
            protected decimal amount;
            protected string customer;            

            public abstract void Generate();            
        }

        public abstract class SaleWithTaxes : AbstractSale
        {
            protected decimal taxes;
            public abstract void CalculateTaxes();
        }

        public class LocalSale : SaleWithTaxes
        {
            public LocalSale(decimal amount, string customer, decimal taxes)
            {
                this.amount = amount;
                this.customer = customer;
                this.taxes = taxes;
            }

            public override void Generate()
            {
                Console.WriteLine("Sale was generated locally");
            }

            public override void CalculateTaxes()
            {
                Console.WriteLine("Taxes were calculated");
            }
        }

        public class ForeignSale : AbstractSale
        {
            public ForeignSale(decimal amount, string customer)
            {
                this.amount = amount;
                this.customer = customer;
            }

            public override void Generate()
            {
                Console.WriteLine("Sale was generated internationally");
            }
        }
    }
}
