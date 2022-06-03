/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Nav_Bar from '../../components/navbar';
import api from '../../services/api';

interface IProduto {
    id: number;
    nome: string;
    preco: number;
    quantidade: number;
}

const VisualizarProduto = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [produto, setProduto] = useState<IProduto>()

    useEffect(() => {
        ViewProduto()
    }, [id])

    function back(){
        navigate('/produtos')
    }

    async function ViewProduto() {
        const response = await api.get<IProduto>(`produtos/${id}`)
        setProduto(response.data)
    }
    return (
        <>
        <section>
            <header>
                <Nav_Bar/>
            </header>
            <main>
                <div className="mainheader">
                    <h1>Visualizar Produto:"{produto?.nome}"</h1>
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
                        <Card.Header>ID: {produto?.id}</Card.Header>
                        <Card.Body>
                            <Card.Title>NOME: {produto?.nome}</Card.Title>
                            <Card.Text>QUANTIDADE: {produto?.quantidade} Itens</Card.Text>
                            <Card.Text>PREÇO: {produto?.preco}</Card.Text>
                        </Card.Body>
                        </Card>
                    ))}
                </div>
            </main>
        </section>
        </>
    )
}

export default VisualizarProduto;