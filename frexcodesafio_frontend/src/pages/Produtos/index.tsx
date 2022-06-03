/* eslint-disable react/jsx-pascal-case */
import { useState, useEffect } from 'react';
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

interface IQuantia{
    quantidade: number;
}

const Produtos = () => {

    const navigate = useNavigate()

    const [produtos, setProdutos] = useState<IProdutos[]>([])

    const [quantia, setQuantia] = useState<IQuantia>({
        quantidade: 0
    })

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

    async function vendaProduto(id: number){
        const response = await api.get(`/produtos/${id}`)
        setQuantia({
            quantidade: response.data.quantidade
        })

        if(quantia.quantidade !== 0){
            const sub = quantia.quantidade - 1
            setQuantia({
                quantidade: sub
            })
            if(quantia.quantidade !== sub){
                await api.put(`/produtos/${id}`, quantia).then(() =>{
                    alert('Vendido')
                })
                loadProdutos()
            }
        }
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
                                                <Button className='button' variant="success" onClick={() => vendaProduto(produtos.id)}>Vender</Button>
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