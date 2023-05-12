using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace D_Solid
{
    public class NotaCredito : DocumentoContable
    {
        public NotaCredito(DateTime fecha, double importe, int numero) : base(fecha, importe, numero)
        {
            _sigla = "NC";
        }

        public override double Total()
        {
            return Importe * 1.19 * -1;
        }

        public override void Imprimir()
        {
            Console.WriteLine($"Imprimiendo nota de crédito {Numero} del {Fecha.ToShortDateString()} por un importe de {Importe}");
        }
    }
}
