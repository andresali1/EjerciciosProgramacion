using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace D_Solid
{
    public abstract class Impuesto : IImprimible
    {
        public double Importe { get; set; }

        public Impuesto(double importe)
        {
            Importe = importe;
        }

        public abstract void Imprimir();
    }
}
