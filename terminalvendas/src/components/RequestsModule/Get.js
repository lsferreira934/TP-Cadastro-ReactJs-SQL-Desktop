import React, { useState, useEffect } from 'react';
import css from '../css/get.module.css';
import api from '../services/api';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Requests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const apiAsync = async () => {
      try {
        const { data } = await api.get(`/compras`);
        setRequests(data);

        // const vetor = [];
        // requests.filter((filter) => {
        //   if (filter.Codigo_Pedido === 1)
        //     vetor.push({
        //       Produto: filter.Produto,
        //       Quantidade: filter.Quantidade,
        //       Valor_Unitário: filter.Valor_Unitário,
        //       Valor_Total: filter.Valor_Total,
        //     });
        // });

        // console.log(vetor);
      } catch (error) {
        console.log(error);
      }
    };
    apiAsync();
  }, []);
  return (
    <>
      <div className="container">
        <h2>Pedidos</h2>
        <Link to="/novopedido">
          <button type="button" className="btn btn-success">
            Novo pedido
          </button>
        </Link>
        <div className="row">
          {requests.map((order) => {
            const {
              Cliente,
              Codigo_Pedido,
              Data_Pedido,
              Observação,
              Produto,
              Quantidade,
              Valor_Total,
              Valor_Unitário,
            } = order;

            return (
              <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                  <div>Pedido Nº:{Codigo_Pedido}</div>
                  <h5 className="card-title">Nome: {Cliente}</h5>
                  <div>
                    <p className="card-text">
                      {Quantidade} - {Produto}
                    </p>
                  </div>

                  <button className="btn btn-warning">Alterar</button>
                  <button className="btn btn-danger">Deletar</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
