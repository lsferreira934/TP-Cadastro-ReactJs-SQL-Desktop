import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link, Redirect } from 'react-router-dom';
import { FaRegPlusSquare } from 'react-icons/fa';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function AddProduct() {
  const [products, setProducts] = useState([]);
  const [redirectCheck, setRedirecCheck] = useState(false);
  const [valueInput, setValueInput] = useState();

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
      const newData = Number(event.target.textContent);
      const { data } = await api.get(`produto/${newData}`);
      console.log(data);
      const product = {
        id_cliente: 0,
        id_pedido: 0,
        id_produto: data.id,
        quantidade: 1,
      };

      // await api
      //   .post(`/cliente`, newData)
      //   .then((response) => {})
      //   .catch((error) => {
      //     console.log(error.message);
      //   });
      newData !== 0 ? setRedirecCheck(true) : setRedirecCheck(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputClick = ({ target }) => {
    console.log(target.value);
    setValueInput(target.value);
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
              <th>Qtd-adcionar</th>
              <th>Selecionar</th>
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
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{nome}</td>
                  <td>{qtd_estoque}</td>
                  <td>{valor_custo}</td>
                  <td>{valor_venda}</td>
                  <td>
                    <input
                      onChange={
                        qtd_estoque !== handleInputClick
                          ? handleInputClick
                          : qtd_estoque
                      }
                      type="number"
                      min="1"
                      max={qtd_estoque}
                      step="1"
                      style={{
                        color: 'black',
                        width: '60px',
                        fontSize: '10pt',
                      }}
                    />
                  </td>
                  <td>
                    <button
                      onClick={handleAddProduct}
                      value={id}
                      type="button"
                      class="btn btn-outline-success"
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
