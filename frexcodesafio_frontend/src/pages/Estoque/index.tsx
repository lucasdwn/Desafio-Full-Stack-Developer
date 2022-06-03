/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react/jsx-no-undef */
import { useState, useEffect } from 'react';
import './styles.css';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Nav_Bar from '../../components/navbar';
import api from '../../services/api';

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
            <section>
                <header>
                    <Nav_Bar/>
                </header>
                <main>
                    <div className="mainheader">
                        <h1>Estoques</h1>
                        <a href='/cadastrar_estoque'><Button variant="light">Novo Estoque</Button>{' '}</a>
                    </div>
                    <div className="table">
                        <Table striped bordered hover variant="dark" responsive="sm">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NOME</th>
                                        <th>AÇÕES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        estoques && estoques.map(estoques => (
                                            <tr key={estoques.id}>
                                                <td>{estoques.id}</td>
                                                <td>{estoques.nome}</td>
                                                <td>
                                                    <Button className='button' variant="primary" onClick={() => editEstoque(estoques.id)}>Editar</Button>
                                                    <Button className='button' variant="info" onClick={() => viewEstoque(estoques.id)}>Visualizar</Button>
                                                    <Button className='button' variant="danger" onClick={() => deleteEstoque(estoques.id)}>Remover</Button>
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

export default Estoques;