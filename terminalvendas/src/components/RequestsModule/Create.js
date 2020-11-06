import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form } from '@unform/web';
import Input from '../Form/Input';
import api from '../services/api';
import OrderUser from '../RequestsModule/OrderUser';

import 'bootstrap/dist/css/bootstrap.min.css';
import css from '../css/get.module.css';

export default function Create() {
  const [allRequests, setAllRequests] = useState([]);
  const [numberOrder, setNumberOrder] = useState();
  const [redirectCheck, setRedirecCheck] = useState(false);
  const [selectUser, setSelectUser] = useState([]);
  const [valueTotal, setValueTotal] = useState();
  const [userId, setUserId] = useState();
  const [activation, setActivation] = useState(false);
  const [getOrderId, setGetOrderId] = useState([]);

  // Campo Numero do pedido
  useEffect(() => {
    try {
      const apiAsync = async () => {
        const { data } = await api.get(`/todospedidos`);
        setAllRequests(data);

        const mapPedido = data.map((pedido) => pedido.id_pedido);
        let number = Math.max.apply(null, mapPedido);
        if (number === -Infinity) number = 1;
        setNumberOrder(number);
      };
      apiAsync();
    } catch (error) {
      console.log(error);
    }
  }, [numberOrder, activation]);

  useEffect(() => {
    try {
      const apiAsync = async () => {
        const { data } = await api.get(`relatorio/${numberOrder}`);
        setGetOrderId(data);
        console.log(data);
        const findItem = data.map((item) => {
          return item.id_cliente;
        });
        setUserId(findItem[0]);

        if (data.length > 0) {
          const totalOrder = data
            .map((item) => item.valor_total)
            .reduce((total, produto) => total + produto);
          setValueTotal(totalOrder);
        }
      };
      apiAsync();
    } catch (error) {}
  }, [numberOrder]);

  // Selecionar o Cliente
  useEffect(() => {
    try {
      const apiAsync = async () => {
        const { data } = await api.get(`/cliente`);
        setSelectUser(data);
      };
      apiAsync();
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  // Criar um novo pedido
  const handleSubmit = async (data) => {
    try {
      const newData = {
        obs: data.obs,
      };
      await api.post(`/novopedido`, { ...newData });

      setRedirecCheck(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectOption = (select) => {
    const selectedUser = select.target.value;
    setUserId(Number(selectedUser.split('-')[0]));
  };

  const handleValueTotal = (value) => {
    console.log(value);
    setValueTotal(value);
  };
  return (
    <>
      <div className="container">
        <Form onSubmit={handleSubmit}>
          <div className="row  ">
            <div className="col-2  col-sm-5 col-md-6 col-lg-7">
              <label for="select">PEDIDO Nº </label>
              <input
                type="text"
                value={numberOrder}
                disabled
                style={{ width: '30px' }}
              />
            </div>
            <div className=" col col-sm-auto">
              <label for="select">VALOR DA COMPRA</label>
              <input
                type="text"
                style={{ width: '110px' }}
                value={valueTotal}
                disabled
              />
            </div>
          </div>

          <div
            className="row"
            style={{
              alignItems: 'center',
              display: 'flex',
              placeItems: 'flex-end',
            }}
          >
            {!userId ? (
              <div className=" col-10 col-sm-10 center">
                <br />
                <label for="select">ADICIONAR CLIENTE</label>
                <select
                  onChange={handleSelectOption}
                  className="custom-select"
                  id="select"
                  value={userId}
                >
                  <option>Selecione um cliente</option>
                  {selectUser.map((user) => {
                    const { id, nome } = user;
                    return (
                      <option key={id}>
                        {id} - {nome}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : (
              <div className=" col-10 col-sm-10 center">
                <br />
                <label for="select">ADICIONAR CLIENTE</label>
                <select
                  onChange={handleSelectOption}
                  className="custom-select"
                  id="select"
                >
                  <option>Selecione um cliente</option>
                  {selectUser.map((user) => {
                    const { id, nome } = user;
                    return (
                      <option key={id}>
                        {id} - {nome}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
          </div>

          <div className="row">
            <div className=" col-10 col-sm-10">
              <label for="Textarea">OBSERVAÇÃO</label>
              <Input
                multiline
                name="obs"
                className="form-control"
                id="Textarea"
                placeholder="Ex: Cartão de crédito "
              />
            </div>
          </div>

          <div className="row" style={{ marginTop: '10px' }}>
            <div className="col-6">
              <Link to={`/adicionarproduto/${userId}/${numberOrder}`}>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ marginRight: '10px' }}
                >
                  Adicionar produto
                </button>
              </Link>

              <button
                type="submit"
                className="btn btn-warning"
                style={{ marginRight: '10px' }}
              >
                Finalizar pedido
              </button>

              <Link to="/novocliente">
                <button
                  className="btn btn-success"
                  style={{ marginRight: '10px' }}
                >
                  Cadastrar cliente
                </button>
              </Link>

              <Link to="/">
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ marginRight: '10px' }}
                >
                  Voltar
                </button>
              </Link>
            </div>
          </div>
          <div className="row" style={{ marginTop: '10px' }}>
            <div className="col-10">
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
                  {getOrderId.map((order) => {
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
                        <td>
                          <input
                            type="number"
                            min="1"
                            max={quantidade}
                            step="1"
                            style={{
                              color: 'black',
                              width: '60px',
                              fontSize: '10pt',
                            }}
                          />
                        </td>
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
            </div>
          </div>
          {redirectCheck === true ? <Redirect to="/" /> : redirectCheck}
        </Form>
      </div>
    </>
  );
}
