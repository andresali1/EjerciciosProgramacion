using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace L_Solid_1
{
    public class Factura : DocumentoContable
    {
        public Factura(int numero, DateTime fecha) : base(numero, fecha)
        {
            _sigla = "FC";
        }
    }
}
