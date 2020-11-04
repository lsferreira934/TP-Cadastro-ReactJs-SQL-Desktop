using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;



namespace TP_Cadastro___Desktop
{
   public static class DB_CONEXAO
    {
        public static MySqlConnection conexao;
        public static MySqlCommand comando;
       public static MySqlDataAdapter da;
       public static MySqlDataReader dr;
      //  static string strSQL;

        // método de abertura de conexão com a base de dados
        public static void OpenConnection()
        {
                conexao.Open();
        }

        // fechar/limpar armazenamento de comandos conexão com a base
        public static void CloseConnection()
        {
            conexao.Close();
            conexao = null;
            comando = null;
        }

        //String de conexão
        public static MySqlConnection ConnectionKey()
        {
            return conexao = new MySqlConnection("Server=localhost;Database=db_sistema_venda;Uid=root;Pwd=root");
        }

        
    }
}
