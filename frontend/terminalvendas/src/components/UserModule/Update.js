import React, { useEffect, useState } from 'react';
import { Form } from '@unform/web';
import Input from '../Form/Input';
import api from '../services/api';
import css from '../css/update.module.css';
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Update(props) {
  const [selectUser, setSelectUser] = useState([]);
  const [redirectCheck, setRedirecCheck] = useState(false);

  useEffect(() => {
    try {
      const apiAsync = async () => {
        const { id } = props.match.params;
        const { data } = await api.get(`cliente/${id}`);
        setSelectUser(data);
      };
      apiAsync();
    } catch (error) {
      console.log(error);
    }
  }, [props]);

  const initialData = {
    nome: selectUser.nome,
    end: selectUser.end,
    telefone: selectUser.telefone,
    email: selectUser.email,
    redirect: false,
  };

  const handleSubmit = async (data) => {
    try {
      const { id } = props.match.params;
      await api.put(`cliente/${id}`, data);
      setRedirecCheck(true);

      console.log(selectUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container center" align="center">
      <div id={css.form}>
        <Form initialData={initialData} onSubmit={handleSubmit}>
          <div className="form">
            <div className="form-group col-md-4">
              <label for="inputName">Nome</label>

              <Input
                type="text"
                className="form-control"
                id="inputName"
                name="nome"
              />
            </div>

            <div className="form-group col-md-4">
              <label for="inputAddress">Endereço</label>

              <Input
                name="end"
                type="text"
                className="form-control"
                id="inputAddress"
              />
            </div>

            <div className="form-group col-md-4">
              <label for="inputPhone">Telefone</label>
              <Input
                name="telefone"
                type="text"
                className="form-control"
                id="inputPhone"
              />
            </div>
            <div className="form-group col-md-4">
              <label for="inputEmail">Email</label>
              <Input
                type="email"
                name="email"
                className="form-control"
                id="inputEmail"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-warning">
            Alterar
          </button>

          {redirectCheck === true ? <Redirect to="/cliente" /> : redirectCheck}
        </Form>
      </div>
    </div>
  );
}
