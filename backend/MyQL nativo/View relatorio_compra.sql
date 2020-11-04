-- Teste de Join
use db_sistema_venda;

CREATE VIEW vw_relatorioCompra
as
	SELECT
		PE.id_pedido as 'Codigo_Pedido',
		C.nome as 'Cliente',
		PE.data_venda as 'Data_Pedido',
		PR.nome as 'Produto',
		PP.quantidade as 'Quantidade',
		PP.valor_unidade as 'Valor_Unitário',
		PP.valor_total as 'Valor_Total',
		PE.obs as 'Observação'
	FROM pedidoproduto as PP JOIN pedido as PE
		ON PP.id_pedido = PE.id
		JOIN produto as PR
		ON PP.id_produto = PR.id
		JOIN cliente as C
		ON PP.id_cliente = C.id;

-- Testes
select *
from produto;

-- Rota '/relatorioporcompra'
select *
from vw_relatorioCompra
where Codigo_Pedido = 1;

-- Rota '/compras'
select Codigo_Pedido , Cliente, Data_Pedido, sum(Valor_Total) as 'Faturamento', Observação
from vw_relatorioCompra
group by cliente;

-- Rota '/pensar no nome' (só chamar a variável do n° do pedido)
select Codigo_Pedido, Cliente, Data_Pedido, sum(Valor_Total) as 'Faturamento', Observação
from vw_relatorioCompra
where Codigo_Pedido = 2;


	