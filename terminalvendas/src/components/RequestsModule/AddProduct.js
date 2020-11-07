import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link, Redirect } from 'react-router-dom';
import { FaRegPlusSquare } from 'react-icons/fa';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function AddProduct(props) {
  const [products, setProducts] = useState([]);
  const [redirectCheck, setRedirecCheck] = useState(false);
  const [valueInput, setValueInput] = useState({
    id: 0,
    qtd: 0 + 1,
  });

  useEffect(() => {
    const apiAsync = async () => {
      try {
        const { data } = await api.get(`/produto`);

        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    apiAsync();
  }, []);

  const handleAddProduct = async (event) => {
    try {
      const { id, num } = props.match.params;

      const newData = Number(event.target.textContent);

      const { data } = await api.get(`produto/${newData}`);
      console.log(data);
      const productSelect = {
        id_cliente: Number(id),
        id_pedido: Number(num),
        id_produto: Number(data.id),
        quantidade: 1,
      };

      console.log(productSelect);
      await api
        .post(`/pedidoproduto`, productSelect)
        .catch((error) => console.log(error.response.request._response));

      newData !== 0 ? setRedirecCheck(true) : setRedirecCheck(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuant = (value, id) => {
    setValueInput({ id: id, qtd: value });
    console.log(valueInput);
  };
  return (
    <div>
      <div className="container">
        <div>
          <h2>Selecione o Produto </h2>
        </div>
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Qtd-Estoque</th>
              <th>Vl-custo</th>
              <th>Vl-Venda</th>
              <th>Adicionar</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const {
                id,
                nome,
                qtd_estoque,
                valor_custo,
                valor_venda,
              } = product;

              return qtd_estoque <= 0 ? (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{nome}</td>
                  <td>{qtd_estoque}</td>
                  <td>{valor_custo}</td>
                  <td>{valor_venda}</td>

                  <td>
                    <button
                      disabled
                      onClick={handleAddProduct}
                      type="button"
                      class="btn btn-danger"
                      style={{
                        color: 'transparent',
                      }}
                    >
                      {id}
                    </button>
                    {redirectCheck === true ? (
                      <Redirect to="/novopedido" />
                    ) : (
                      redirectCheck
                    )}
                  </td>
                </tr>
              ) : (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{nome}</td>
                  <td>{qtd_estoque}</td>
                  <td>{valor_custo}</td>
                  <td>{valor_venda}</td>
                  <td>
                    <input
                      value={valueInput.id === id ? valueInput.qtd : 1}
                      type="number"
                      min="0"
                      max={qtd_estoque}
                      step="1"
                      style={{
                        color: 'black',
                        width: '60px',
                        fontSize: '10pt',
                      }}
                      onChangeCapture={(e) => {
                        let value = Number(e.target.value);
                        handleQuant(value, id);
                      }}
                    />
                  </td>
                  <td>
                    <button
                      onClick={handleAddProduct}
                      type="button"
                      class="btn btn-success"
                      style={{
                        color: 'transparent',
                      }}
                    >
                      {id}
                    </button>
                    {redirectCheck === true ? (
                      <Redirect to="/novopedido" />
                    ) : (
                      redirectCheck
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
