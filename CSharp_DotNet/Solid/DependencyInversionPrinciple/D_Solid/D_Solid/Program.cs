using System;
using System.Collections.Generic;

namespace D_Solid
{
    class Program
    {
        static void Main(string[] args)
        {
            Impresora impresora = new Impresora();

            Factura factura = new Factura(DateTime.Now, 50, 123);
            NotaCredito credito = new NotaCredito(DateTime.Now, 250, 64800);
            FacturaLuz facturaLuz = new FacturaLuz(80, "LZ-5564");
            Municipal municipal = new Municipal(125, "ML-254");
            ReciboSueldo sueldo = new ReciboSueldo(1200, 10);
            Remito remito = new Remito(951753, DateTime.Now, 8);

            List<IImprimible> lista = new List<IImprimible>();

            lista.Add(factura);
            lista.Add(credito);
            lista.Add(facturaLuz);
            lista.Add(municipal);
            lista.Add(sueldo);
            lista.Add(remito);

            foreach(var elemento in lista)
            {
                impresora.Imprimir(elemento);
            }
        }
    }
}
