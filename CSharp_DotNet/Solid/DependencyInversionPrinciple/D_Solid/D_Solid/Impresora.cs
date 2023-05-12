using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace D_Solid
{
    public class Impresora
    {
        public void Imprimir(IImprimible objeto)
        {
            objeto.Imprimir();
        }
    }
}
