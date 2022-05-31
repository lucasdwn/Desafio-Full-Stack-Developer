import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface IEstoques{
    id: number;
    nome: string;
}

const Estoques = () => {

    const navigate = useNavigate()

    const [estoques, setEstoques] = useState<IEstoques[]>([])

    useEffect(() => {
        loadEstoques()
    }, []);

    async function loadEstoques() {
        const response = await api.get('/estoque')
        setEstoques(response.data)
    }

    function editEstoque(id: number) {
        navigate(`/editar_estoque/${id}`)
    }

    function viewEstoque(id: number) {
        navigate(`/estoques/${id}`)
    }

    async function deleteEstoque(id: number) {
        await api.delete(`/estoque/${id}`).then(() => {
            alert(`estoque deletado`)
            loadEstoques()
        })
    }

    return (
        <>
        <h1>Estoques</h1>
        <a href='/cadastrar_estoque'><button>Novo estoque</button></a>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOME</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        estoques.map(estoques => (
                            <tr key={estoques.id}>
                                <td>{estoques.id}</td>
                                <td>{estoques.nome}</td>
                                <td>
                                    <button onClick={() => editEstoque(estoques.id)}>Editar</button>{' '}
                                    <button onClick={() => viewEstoque(estoques.id)}>Visualizar</button>{' '}
                                    <button onClick={() => deleteEstoque(estoques.id)}>Remover</button>{' '}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default Estoques;