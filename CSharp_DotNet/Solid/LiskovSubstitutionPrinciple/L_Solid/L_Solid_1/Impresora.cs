using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace L_Solid_1
{
    public class Impresora
    {
        public void ImprimirRemito(Remito remito)
        {
            Console.WriteLine(remito.Imprimir());
        }

        public void ImprimirDocumento(DocumentoContable factura)
        {
            Console.WriteLine(factura.Imprimir());
        }
    }
}
