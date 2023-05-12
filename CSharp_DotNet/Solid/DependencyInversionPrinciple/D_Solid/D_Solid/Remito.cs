using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace D_Solid
{
    public class Remito :IImprimible
    {
        public int Numero { get; set; }
        public DateTime Fecha { get; set; }
        public int CantBultos { get; set; }

        public Remito(int numero, DateTime fecha, int cantBultos)
        {
            Numero = numero;
            Fecha = fecha;
            CantBultos = cantBultos;
        }

        public void Imprimir()
        {
            Console.WriteLine($"Imprimiendo recibo número {Numero} de fecha {Fecha.ToShortDateString()} con un total de {CantBultos} bultos");
        }
    }
}
