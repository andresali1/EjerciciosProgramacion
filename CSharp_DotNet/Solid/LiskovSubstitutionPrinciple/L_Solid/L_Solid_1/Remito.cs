using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace L_Solid_1
{
    public class Remito
    {
        public int Numero { get; set; }
        public DateTime Fecha { get; set; }
        public int CantBultos { get; set; }

        public Remito(int numero, DateTime fecha, int bultos)
        {
            Numero = numero;
            Fecha = fecha;
            CantBultos = bultos;
        }

        public string Descripcion()
        {
            return $"Remito N° {Numero} de fecha {Fecha.ToShortDateString()} con {CantBultos} bultos";
        }

        public string Imprimir()
        {
            return $"Imprimiendo {Descripcion()}";
        }
    }
}
