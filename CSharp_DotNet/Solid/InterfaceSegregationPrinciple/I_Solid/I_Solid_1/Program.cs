using System;

namespace I_Solid_1
{
    class Program
    {
        static void Main(string[] args)
        {
            Factura factura = new Factura(123456, DateTime.Now);
            factura.CAI = "COL-123456";

            FacturaElectronica facturaElectronica = new FacturaElectronica(123456987, DateTime.Now);
            facturaElectronica.CAE = "E_COL-123456987";

            facturaElectronica.Imprimir();
            facturaElectronica.EnviarPorEmail();
            Console.WriteLine();

            factura.Imprimir();
        }
    }
}
