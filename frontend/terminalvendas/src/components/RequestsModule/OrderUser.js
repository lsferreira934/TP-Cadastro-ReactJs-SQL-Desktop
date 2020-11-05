import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form } from '@unform/web';
import Input from '../Form/Input';
import api from '../services/api';

import 'bootstrap/dist/css/bootstrap.min.css';
import css from '../css/get.module.css';

export default function OrderUser({
  children,
  numberOrder,
  handleClick,
  handleIdProduct,
}) {
  const [orderAll, setOrderAll] = useState([]);
  const [valueTotal, setValueTotal] = useState();

  const handleValueTotal = () => {
    handleClick(valueTotal);
  };

  const handleClickProduct = (data) => {
    console.log(data);
    handleIdProduct(data);
  };

  useEffect(() => {
    try {
      const apiAsync = async () => {
        const { data } = await api.get(`relatorio/${160}`);
        console.log(data);
        setOrderAll(data);
        if (data.length > 0) {
          const totalOrder = data
            .map((item) => item.valor_total)
            .reduce((total, produto) => total + produto);
          setValueTotal(totalOrder);
        }

        handleValueTotal();
      };
      apiAsync();
    } catch (error) {}
  }, [valueTotal]);
  return (
    <>
      <div>
        <Link to="/adicionarproduto">
          <button
            numberIdProduct={handleClickProduct}
            type="button"
            className="btn btn-primary"
            style={{ marginTop: '10px', marginBottom: '10px' }}
          >
            Adicionar produto
          </button>
        </Link>
      </div>

      <table className="table table-hover table-dark">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>valor Unidade</th>
            <th>Valor Total</th>

            <th>Alterar</th>
            <th>Deletar</th>
          </tr>
        </thead>
        <tbody>
          {orderAll.map((order) => {
            const {
              id,
              id_produto,
              quantidade,
              valor_unidade,
              valor_total,
            } = order;
            return (
              <tr key={id}>
                <td>{id_produto}</td>
                <td>{quantidade}</td>
                <td>{valor_unidade}</td>
                <td>{valor_total}</td>

                <td>
                  <Link to={`/alterarCliente/${id}`}>
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
                  <Link to={`/deletarCliente/${id}`}>
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
    </>
  );
}
