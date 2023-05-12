using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace I_Solid_1
{
    public class FacturaElectronica : DocumentoContable, IEmaileable
    {
        public string CAE { get; set; }

        public FacturaElectronica(int numero, DateTime fecha) : base(numero, fecha) { }

        public void EnviarPorEmail()
        {
            Console.WriteLine($"Enviando por Email la factura electrónica {Numero} del dia {Fecha.ToShortDateString()}");
        }

        public override void Imprimir()
        {
            Console.WriteLine($"Imprimiendo la factura electrónica {Numero} del dia {Fecha.ToShortDateString()}");
        }
    }
}
