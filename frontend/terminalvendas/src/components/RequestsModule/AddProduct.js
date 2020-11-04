import React, { useState, useEffect } from 'react';

import api from '../services/api';
import { Link, Redirect } from 'react-router-dom';

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
          <Link to="/cadastrarProduto">
            <button type="button" className="btn btn-primary">
              Adicionar
            </button>
          </Link>
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
                    {/* <Link to={`/novopedido`}> */}
                    <button type="button" class="btn btn-outline-success">
                      <svg
                        value={id}
                        onClick={handleAddProduct}
                        style={{ color: 'green' }}
                        width="2em"
                        height="2em"
                        viewBox="0 0 16 16"
                        class="bi bi-plus-circle"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {id}
                        <path
                          value={id}
                          fill-rule="evenodd"
                          d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                        />

                        <path
                          value={id}
                          fill-rule="evenodd"
                          d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                        />
                      </svg>
                    </button>
                    {redirectCheck === true ? (
                      <Redirect to="/novopedido" />
                    ) : (
                      redirectCheck
                    )}
                    {/* </Link> */}
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
