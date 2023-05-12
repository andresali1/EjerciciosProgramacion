using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace L_Solid_1
{
    public abstract class DocumentoContable
    {
        protected string _sigla;

        public int Numero { get; set; }
        public DateTime Fecha { get; set; }

        public DocumentoContable(int numero, DateTime fecha)
        {
            Numero = numero;
            Fecha = fecha;
        }

        public string Imprimir()
        {
            return $"Imprimiendo {Descripcion()}";
        }

        public virtual string Descripcion()
        {
            return $"{_sigla} - N° {Numero} de fecha {Fecha.ToShortDateString()}";
        }
    }
}
