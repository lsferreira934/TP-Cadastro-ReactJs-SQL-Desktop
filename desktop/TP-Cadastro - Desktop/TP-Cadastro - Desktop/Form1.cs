using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using MySql.Data.MySqlClient;

namespace TP_Cadastro___Desktop
{
    public partial class Form1 : Form
    {
        //string que será utilizada em mais de um método
        string pesquisaNome;

        // Método para limpar todos textboxs
        public void ClearAll()
        {
            txtId.Clear();
            txtNome.Clear();
            txtEnd.Clear();
            txtEmail.Clear();
            txtTelefone.Clear();
            ckbNovo.Checked = false;
            ckbConsulta.Checked = false;
        }

        private void CarregarGrid()
        {
            string select = "Select id, nome, end, email, telefone from cliente";

            DB_CONEXAO.da = new MySqlDataAdapter(select, DB_CONEXAO.ConnectionKey());
            DataTable dt = new DataTable();
            DB_CONEXAO.da.Fill(dt);
            dgvClientes.DataSource = dt;
    
            DB_CONEXAO.CloseConnection();
        }

        // Inicializando form...
        public Form1()
        {
            InitializeComponent();

            //String de conexão, puxando da classe DB_CONEXÃO
            DB_CONEXAO.ConnectionKey();
            CarregarGrid();
        }

      

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void ckbNovo_CheckedChanged(object sender, EventArgs e)
        {
            //Desabilitando/habilitando button Cadastrar
            if(ckbNovo.Checked)
            {
                btnCadastrar.Enabled = true;
                txtEmail.Clear();

                try
                {
                    DB_CONEXAO.ConnectionKey();

                   //Capturando o próximo id que será adicionado
                    string nextId = " select max(id)+1 as 'next id' from cliente;";
                    DB_CONEXAO.comando = new MySqlCommand(nextId, DB_CONEXAO.ConnectionKey());
                    DB_CONEXAO.OpenConnection();
                    DB_CONEXAO.dr = DB_CONEXAO.comando.ExecuteReader();

                    while (DB_CONEXAO.dr.Read())
                    {
                        // Obtendo através o textbox id
                        txtId.Text = Convert.ToString(DB_CONEXAO.dr["next id"]);
                    }

                }
                catch(Exception ex)
                {
                    // MessageBox.Show(ex.Message);
                     MessageBox.Show("Erro ao incluir" + ex.Message + MessageBoxIcon.Error);

                }
                finally
                {
                    //Fechando conexões
                    DB_CONEXAO.CloseConnection();
             
                }
            }

            else
            {
                btnCadastrar.Enabled = false;
                txtId.Clear();
            }
        }

        private void ckbConsulta_CheckedChanged(object sender, EventArgs e)
        {
            //Desabilitando/habilitando button Pesquisar
            if (ckbConsulta.Checked == true)
            {
                btnPesquisar.Enabled = true;
                txtEmail.Clear();
            }
            else
            {
                btnPesquisar.Enabled = false;
            }
        }

        private void btnCadastrar_Click(object sender, EventArgs e)
        {
            try
            {
                // Instanciando objeto Cliente e populando através do construtor
                Cliente c = new Cliente(txtNome.Text, txtEnd.Text, txtEmail.Text, txtTelefone.Text);

                //Insert
                string insert = "INSERT INTO cliente (nome, end, email, telefone, createdAt, updatedAt) VALUES (@nome, @end, @email, @telefone, @DTcreate, @DTupdate)";
                DB_CONEXAO.comando = new MySqlCommand(insert, DB_CONEXAO.ConnectionKey());
                DB_CONEXAO.comando.Parameters.AddWithValue("@nome", c.getNome());
                DB_CONEXAO.comando.Parameters.AddWithValue("@end", c.getEnd());
                DB_CONEXAO.comando.Parameters.AddWithValue("@email", c.getEmail());
                DB_CONEXAO.comando.Parameters.AddWithValue("@telefone", c.getTelefone());
                DB_CONEXAO.comando.Parameters.AddWithValue("@DTcreate", DateTime.Now);
                DB_CONEXAO.comando.Parameters.AddWithValue("@DTupdate", DateTime.Now); ;

                DB_CONEXAO.OpenConnection();
                DB_CONEXAO.comando.ExecuteNonQuery();
                
            }catch(Exception ex)
            {
                MessageBox.Show("O sistema apresentou o seguinte erro: " + ex.Message);
            }
            finally
            {
                MessageBox.Show("Cadastrado com sucesso!");

                // Apresentando no DatagridView
                CarregarGrid();
                ClearAll();
                
            }
            
               
        }

        private void btnPesquisar_Click(object sender, EventArgs e)
        {
            try
            {
                DB_CONEXAO.ConnectionKey();
                pesquisaNome = "Select id, nome, end, email, telefone from cliente where nome = @nome";
                DB_CONEXAO.comando = new MySqlCommand(pesquisaNome, DB_CONEXAO.ConnectionKey());
                DB_CONEXAO.comando.Parameters.AddWithValue("@nome", txtNome.Text);
                DB_CONEXAO.OpenConnection();
                DB_CONEXAO.dr = DB_CONEXAO.comando.ExecuteReader();

                
                while(DB_CONEXAO.dr.Read())
                {
                    txtId.Text = Convert.ToString(DB_CONEXAO.dr["id"]);
                    txtEnd.Text = Convert.ToString(DB_CONEXAO.dr["end"]);
                    txtEmail.Text = Convert.ToString(DB_CONEXAO.dr["email"]);
                    txtTelefone.Text = Convert.ToString(DB_CONEXAO.dr["telefone"]);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Erro na pesquisa: " + ex.Message, "Ops", MessageBoxButtons.OKCancel, MessageBoxIcon.Error);

            }
            finally
            {
                DB_CONEXAO.CloseConnection();
            }

        }

        private void dgvClientes_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            
        }

        private void btnAlterar_Click(object sender, EventArgs e)
        {
            try
            {
                string update = "UPDATE cliente SET nome = @nome, end =  @end, email = @email, telefone = @telefone, updatedAt = @datetime where id = @id";
                DB_CONEXAO.comando = new MySqlCommand(update, DB_CONEXAO.ConnectionKey());
                DB_CONEXAO.comando.Parameters.AddWithValue("@id", txtId.Text);
                DB_CONEXAO.comando.Parameters.AddWithValue("@nome", txtNome.Text);
                DB_CONEXAO.comando.Parameters.AddWithValue("@end", txtEnd.Text);
                DB_CONEXAO.comando.Parameters.AddWithValue("@email", txtEmail.Text);
                DB_CONEXAO.comando.Parameters.AddWithValue("@telefone", txtTelefone.Text);
                DB_CONEXAO.comando.Parameters.AddWithValue("@datetime", DateTime.Now);
                DB_CONEXAO.OpenConnection();
                DB_CONEXAO.comando.ExecuteNonQuery();

            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            finally
            {
                MessageBox.Show("Cliente: " + txtNome.Text + " atualizado com sucesso");
                ClearAll();

                CarregarGrid();
            }
        }

        private void btnLimpar_Click(object sender, EventArgs e)
        {
            // Fazendo a limpeza de todos os campos
            ClearAll();
        }

        private void btnExcluir_Click(object sender, EventArgs e)
        {
            try
            {

                string delete = "DELETE FROM cliente WHERE ID = @id";
                DB_CONEXAO.comando = new MySqlCommand(delete, DB_CONEXAO.ConnectionKey());
                DB_CONEXAO.comando.Parameters.AddWithValue("@id", txtId.Text);

                DB_CONEXAO.OpenConnection();
                DB_CONEXAO.comando.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Mensagem de erro: " + ex.Message, "Falha ao tentar excluir cliente");
            }
            finally
            {
                if (MessageBox.Show("Tem certeza que quer excluir o cliente: " + txtNome.Text + " ?", "Confirmação de exclusão", MessageBoxButtons.OKCancel) == DialogResult.OK)
                {
                    MessageBox.Show("Cliente: " + txtNome.Text + " excluído com sucesso");
                    ClearAll();

                    //Populando o dgvClientes já atualizado
                    CarregarGrid();
                }
                else
                {
                    MessageBox.Show("Operação cancelada!");
                }
                

                
            }
        }

        private void btnAtualizarDados_Click(object sender, EventArgs e)
        {
            // Carregando todo o DataGrid através do select
            CarregarGrid();
        }
    }
}
