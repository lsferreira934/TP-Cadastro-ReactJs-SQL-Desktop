import React, { useState, useEffect } from 'react';
import { Form } from '@unform/web';
import Input from '../Form/Input';
import api from '../services/api';
import css from '../css/update.module.css';
import { Redirect, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Delete(props) {
  const [selectProduct, setSelectProduct] = useState([]);
  const [redirectCheck, setRedirecCheck] = useState(false);

  useEffect(() => {
    try {
      const apiAsync = async () => {
        const { id } = props.match.params;
        const { data } = await api.get(`produto/${id}`);

        setSelectProduct(data);
      };
      apiAsync();
    } catch (error) {
      console.log(error);
    }
  }, [props]);

  const initialData = {
    nome: selectProduct.nome,
    valor_custo: selectProduct.valor_custo,
    valor_venda: selectProduct.valor_venda,
    qtd_estoque: selectProduct.qtd_estoque,
    redirect: false,
  };

  const handleSubmit = async (data) => {
    try {
      const { id } = props.match.params;
      await api.delete(`produto/${id}`);
      setRedirecCheck(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container center" align="center">
      <h2>Deseja apagar o seguinte cadastro?</h2>

      <div id={css.form}>
        <Form initialData={initialData} onSubmit={handleSubmit}>
          <div className="form">
            <div className="form-group col-sm-4 col-md-4 col-lg-4 col-lg-4">
              <label for="inputName">Nome</label>

              <Input
                disabled
                type="text"
                className="form-control"
                id="inputName"
                name="nome"
              />

              <label for="inputQuantidade">Quantida</label>

              <Input
                disabled
                name="qtd_estoque"
                type="number"
                className="form-control"
                id="inputQuantidade"
              />

              <label for="inputCompra">Valor de custo</label>
              <Input
                disabled
                name="valor_custo"
                type="number"
                className="form-control"
                id="inputCompra"
              />

              <label for="inputVenda">Valor de Venda</label>
              <Input
                disabled
                type="number"
                name="valor_venda"
                className="form-control"
                id="inputVenda"
              />
            </div>

            <button type="submit" className="btn btn-danger">
              Apagar
            </button>

            <Link to="/produto">
              <button type="submit" className="btn btn-warning">
                Voltar
              </button>
            </Link>
          </div>

          {redirectCheck === true ? <Redirect to="/produto" /> : redirectCheck}
        </Form>
      </div>
    </div>
  );
}
