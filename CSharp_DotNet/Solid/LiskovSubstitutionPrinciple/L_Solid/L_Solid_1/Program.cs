using System;

namespace L_Solid_1
{
    class Program
    {
        static void Main(string[] args)
        {
            Impresora impresora = new Impresora();

            Remito remito = new Remito(5557, DateTime.Now, 5);
            impresora.ImprimirRemito(remito);

            DocumentoContable documento = new Factura(132, DateTime.Now);
            impresora.ImprimirDocumento(documento);

            documento = new NotaDebito(441, DateTime.Now);
            impresora.ImprimirDocumento(documento);

            documento = new NotaCredito(456987, DateTime.Now);
            impresora.ImprimirDocumento(documento);
        }
    }
}
