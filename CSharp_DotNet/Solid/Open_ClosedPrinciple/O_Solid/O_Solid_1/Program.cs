using System;

namespace O_Solid_1
{
    class Program
    {
        static void Main(string[] args)
        {
            DocumentoContable factura = new Factura(123);
            Console.WriteLine(factura.Descripcion());

            DocumentoContable credito = new NotaCredito(12587496);
            Console.WriteLine(credito.Descripcion());

            DocumentoContable debito = new NotaDebito(12300);
            Console.WriteLine(debito.Descripcion());
        }
    }
}
