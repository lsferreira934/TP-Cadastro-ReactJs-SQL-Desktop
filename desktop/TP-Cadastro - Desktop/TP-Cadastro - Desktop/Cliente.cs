using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace TP_Cadastro___Desktop
{
    class Cliente
    {
        // criação dos atributos
        private int id { get; set; }
        private string nome { get; set; }
        private string end { get; set; }
        private string email { get; set; }
        private string telefone { get; set; }

        public Cliente(string pNome, string pEnd, string pEmail, string pTelefone)
        {
            this.nome = pNome;
            this.end = pEnd;
            this.email = pEmail;
            this.telefone = pTelefone;
        }

        public string getNome()
        {
            return this.nome;
        }

        public string getEnd()
        {
            return this.end;
        }

        public string getEmail()
        {
            return this.email;
        }

        public string getTelefone()
        {
            return this.telefone;
        }


    }
}
