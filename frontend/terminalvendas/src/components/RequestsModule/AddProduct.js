import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link, Redirect } from 'react-router-dom';
import { FaRegPlusSquare } from 'react-icons/fa';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function AddProduct() {
  const [products, setProducts] = useState([]);
  const [redirectCheck, setRedirecCheck] = useState(false);
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

  const handleAddProduct = (data) => {
    console.log(Number(data.target.textContent));
    console.log(data);

    const newData = Number(data.target.textContent);

    newData !== 0 ? setRedirecCheck(true) : setRedirecCheck(false);
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
              <th>Quantidade</th>
              <th>Valor de custo</th>
              <th>Valor de Venda</th>
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
