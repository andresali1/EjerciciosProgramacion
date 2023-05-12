using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace D_Solid
{
    public class Municipal : Impuesto
    {
        public string Partida { get; set; }

        public Municipal(double importe, string partida) : base(importe)
        {
            Partida = partida;
        }

        public override void Imprimir()
        {
            Console.WriteLine($"Imprimiendo impuesto municipal de partida {Partida} por un importe de {Importe}");
        }
    }
}
