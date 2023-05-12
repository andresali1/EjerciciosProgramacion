using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace I_Solid_1
{
    public abstract class DocumentoContable : IImprimible
    {
        public DateTime Fecha { get; set; }
        public int Numero { get; set; }

        public DocumentoContable(int numero, DateTime fecha)
        {
            Numero = numero;
            Fecha = fecha;
        }

        public abstract void Imprimir();
    }
}
