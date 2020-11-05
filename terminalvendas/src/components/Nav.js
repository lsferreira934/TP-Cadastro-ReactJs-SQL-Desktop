import React from 'react';
import css from './css/navbar.module.css';
import { Link } from 'react-router-dom';
import Jpg from './img/cap.jpg';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Nav() {
  return (
    <div style={{ marginBottom: '25px' }}>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div id={css.logo}>
          <img src={Jpg} style={{ width: '110px' }} />
          <Link to="/">
            <h1 id={css.logoText}>Terminal Vendas</h1>
          </Link>
        </div>
      </nav>
      <ul className="nav nav-tabs">
        <li className="nav-item"></li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab">
            <Link to="/" id={css.LinkStyle}>
              Pedidos
            </Link>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab">
            <Link to="/cliente" id={css.LinkStyle}>
              Clientes
            </Link>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab">
            <Link to="/produto" id={css.LinkStyle}>
              Produtos
            </Link>
          </a>
        </li>
      </ul>

      <div className="tab-content">
        <div className="tab-pane container active" id="home"></div>
        <div className="tab-pane container fade" id="menu1"></div>
        <div className="tab-pane container fade" id="menu2"></div>
      </div>
    </div>
  );
}
