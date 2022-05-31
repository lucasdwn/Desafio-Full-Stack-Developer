import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface IProdutos{
    id: number;
    nome: string;
    preco: number;
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
        <h1>Produtos</h1>
        <a href='/cadastrar_produto'><button>Novo produto</button></a>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOME</th>
                        <th>PREÇO</th>
                        <th>AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        produtos.map(produtos => (
                            <tr key={produtos.id}>
                                <td>{produtos.id}</td>
                                <td>{produtos.nome}</td>
                                <td>R$ {produtos.preco}</td>
                                <td>
                                    <button onClick={() => editProduto(produtos.id)}>Editar</button>{' '}
                                    <button onClick={() => viewProduto(produtos.id)}>Visualizar</button>{' '}
                                    <button onClick={() => deleteProdutos(produtos.id)}>Remover</button>{' '}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default Produtos;