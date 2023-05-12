using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace I_Solid_1
{
    public class Factura : DocumentoContable
    {
        public string CAI { get; set; }

        public Factura(int numero, DateTime fecha) : base(numero, fecha) { }

        public override void Imprimir()
        {
            Console.WriteLine($"Imprimiendo la factura {Numero} del dia {Fecha.ToShortDateString()}");
        }
    }
}
