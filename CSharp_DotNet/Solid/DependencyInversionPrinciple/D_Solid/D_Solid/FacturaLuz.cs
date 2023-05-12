using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace D_Solid
{
    public class FacturaLuz : Impuesto
    {
        public string CodigoPago { get; set; }

        public FacturaLuz(double importe, string codigoPago) : base(importe)
        {
            CodigoPago = codigoPago;
        }

        public override void Imprimir()
        {
            Console.WriteLine($"Imprimiendo factura de luz con código de pago N° {CodigoPago} por un importe de {Importe}");
        }
    }
}
