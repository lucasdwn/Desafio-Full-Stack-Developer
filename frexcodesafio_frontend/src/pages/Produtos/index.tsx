/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from 'react';
import "./styles.css";
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Nav_Bar from '../../components/navbar';
import api from '../../services/api';

interface IProdutos{
    id: number;
    nome: string;
    preco: number;
    quantidade: number;
    idEstoque: number;
}

const Produtos = () => {

    const navigate = useNavigate()

    const [produtos, setProdutos] = useState<IProdutos[]>([])

    useEffect(() => {
        loadProdutos()
    }, []);

    async function loadProdutos() {
        const response = await api.get('/produtos')
        setProdutos(response.data)
    }

    function editProduto(id: number) {
        navigate(`/editar_produto/${id}`)
    }

    function viewProduto(id: number) {
        navigate(`/produtos/${id}`)
    }

    async function deleteProdutos(id: number) {
        await api.delete(`/produtos/${id}`).then(() => {
            alert('Produto deletado')
            loadProdutos()
        })
    }
    return (
        <>
        <section>
            <header>
                <Nav_Bar/>
            </header>
            <main>
                <div className="mainheader">
                    <h1>Produtos</h1>
                    
                    <a href='/cadastrar_produto'><Button variant="light">Novo Produto</Button>{' '}</a>
                </div>
                    <div className="table">
                        <Table striped bordered hover variant="dark" responsive="sm">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NOME</th>
                                    <th>QUANTIDADE</th>
                                    <th>PREÇO</th>
                                    <th>AÇÕES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    produtos && produtos.map(produtos => (
                                        <tr key={produtos.id}>
                                            <td>{produtos.id}</td>
                                            <td>{produtos.nome}</td>
                                            <td>{produtos.quantidade} Itens</td>
                                            <td>R$ {produtos.preco}</td>
                                            <td>
                                                <Button className='button' variant="light" onClick={() => editProduto(produtos.id)}>Editar</Button>
                                                <Button className='button' variant="info" onClick={() => viewProduto(produtos.id)}>Visualizar</Button>
                                                <Button className='button' variant="danger" onClick={() => deleteProdutos(produtos.id)}>Remover</Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>
            </main>
        </section>
        </>
    )
}

export default Produtos;