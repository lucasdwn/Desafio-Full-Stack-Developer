/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import { useState, useEffect } from 'react';
import './styles.css'
import { Button, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Nav_Bar from '../../components/navbar';
import api from '../../services/api';
import { Card } from 'react-bootstrap';

interface IEstoque {
    id: number;
    nome: string;
    produtos: IProdutos[]
}

interface IProdutos {
    id: number;
    nome: string;
    quantidade: number;
    preco: number;
}

const VisualizarEstoque = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [estoque, setEstoque] = useState<IEstoque>()
    
    useEffect(() => {
        ViewEstoque()
    }, [id])

    function back(){
        navigate('/Estoques')
    }

    async function ViewEstoque() {
        const response = await api.get<IEstoque>(`Estoquepk/${id}`)
        setEstoque(response.data)
        
    }

    return (
        <>
        <section>
            <header>
                <Nav_Bar/>
            </header>
            <main>
                <div className="mainheader">
                    <h1>Visualizar Estoque: "{estoque?.nome}"</h1>
                    <Button variant="light" onClick={back}>Voltar</Button>{' '}
                </div>
                <div className="card">
                    {['Dark',].map((variant) => (
                        <Card
                        border='secundary'
                        bg={variant.toLowerCase()}
                        key={variant}
                        text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                        style={{ width: '18rem' }}
                        className="mb-2"
                        >
                        <Card.Header>ID: {estoque?.id}</Card.Header>
                        <Card.Body>
                            <Card.Title>NOME: {estoque?.nome}</Card.Title>
                        </Card.Body>
                        </Card>
                    ))}
                </div>
                <div className="table">
                    <Table striped bordered hover variant="dark" responsive="sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NOME</th>
                                <th>PREÇO</th>
                                <th>QUANTIDADE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                estoque?.produtos.map(produto => (
                                    <tr key={produto.id}>
                                        <td>{produto.id}</td>
                                        <td>{produto.nome}</td>
                                        <td>R$ {produto.preco}</td>
                                        <td>{produto.quantidade} itens</td>
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

export default VisualizarEstoque;

