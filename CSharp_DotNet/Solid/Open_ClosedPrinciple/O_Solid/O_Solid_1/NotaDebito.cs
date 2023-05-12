using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace O_Solid_1
{
    public class NotaDebito : DocumentoContable
    {
        public NotaDebito(int numero) : base(numero) { }

        public override string Descripcion()
        {
            return $"ND - {Numero}";
        }
    }
}
