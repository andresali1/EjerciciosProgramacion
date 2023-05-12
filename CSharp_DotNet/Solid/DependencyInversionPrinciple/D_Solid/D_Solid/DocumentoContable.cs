using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace D_Solid
{
    public abstract class DocumentoContable : IImprimible
    {
        protected string _sigla;

        public DateTime Fecha { get; set; }
        public double Importe { get; set; }
        public int Numero { get; set; }

        public DocumentoContable(DateTime fecha, double importe, int numero)
        {
            Fecha = fecha;
            Importe = importe;
            Numero = numero;
        }

        public abstract double Total();

        public abstract void Imprimir();
    }
}
