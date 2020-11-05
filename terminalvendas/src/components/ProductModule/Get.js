import React, { useState, useEffect } from 'react';
import css from '../css/get.module.css';
import api from '../services/api';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Get() {
  const [products, setProducts] = useState([]);
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
  return (
    <div>
      <div className="container">
        <div>
          <h2>Cadastrar Produto</h2>
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
              <th>Quantida</th>
              <th>Valor de custo</th>
              <th>Valor de Venda</th>
              <th>Atualizar</th>
              <th>Deletar</th>
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
                    <Link to={`/alterarProduto/${id}`}>
                      <svg
                        id={css.update}
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        className="bi bi-tools"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M0 1l1-1 3.081 2.2a1 1 0 0 1 .419.815v.07a1 1 0 0 0 .293.708L10.5 9.5l.914-.305a1 1 0 0 1 1.023.242l3.356 3.356a1 1 0 0 1 0 1.414l-1.586 1.586a1 1 0 0 1-1.414 0l-3.356-3.356a1 1 0 0 1-.242-1.023L9.5 10.5 3.793 4.793a1 1 0 0 0-.707-.293h-.071a1 1 0 0 1-.814-.419L0 1zm11.354 9.646a.5.5 0 0 0-.708.708l3 3a.5.5 0 0 0 .708-.708l-3-3z"
                        />
                        <path
                          fillRule="evenodd"
                          d="M15.898 2.223a3.003 3.003 0 0 1-3.679 3.674L5.878 12.15a3 3 0 1 1-2.027-2.027l6.252-6.341A3 3 0 0 1 13.778.1l-2.142 2.142L12 4l1.757.364 2.141-2.141zm-13.37 9.019L3.001 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z"
                        />
                      </svg>
                    </Link>
                  </td>

                  <td>
                    <Link to={`/deletarProduto/${id}`}>
                      <svg
                        id={css.delete}
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        className="bi bi-trash-fill"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
                        />
                      </svg>
                    </Link>
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
