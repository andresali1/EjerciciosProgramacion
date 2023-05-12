using System;

namespace S_Solid_1
{
    class Program
    {
        static void Main(string[] args)
        {
            Cliente c = new Cliente();
            c.Nombre = "Julio";
            c.Apellido = "Pérez";

            Factura f = new Factura(12345, c);

            Item i1 = new Item(new Producto("Manzana", 5), 10);
            Item i2 = new Item(new Producto("Pera", 8), 3);
            Item i3 = new Item(new Producto("Sandia", 12), 1);

            f.Items.Add(i1);
            f.Items.Add(i2);
            f.Items.Add(i3);

            Console.WriteLine(f.Total());
        }
    }
}
