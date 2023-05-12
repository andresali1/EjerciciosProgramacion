using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace D_Solid
{
    public class ReciboSueldo : IImprimible
    {
        public double Total { get; set; }
        public int Legajo { get; set; }

        public ReciboSueldo(double total, int legajo)
        {
            Total = total;
            Legajo = legajo;
        }

        public void Imprimir()
        {
            Console.WriteLine($"Imprimiendo recibo de sueldo del legajo {Legajo} por un total de {Total}");
        }
    }
}
