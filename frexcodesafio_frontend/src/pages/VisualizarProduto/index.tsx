import react, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

interface IProduto {
    id: number;
    nome: string;
    preco: number;
    idEstoque: number;
}

const VisualizarProduto = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [produto, setProduto] = useState<IProduto>()

    useEffect(() => {
        ViewProduto()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <h1>Visualizar "{produto?.nome}"</h1>
            <button onClick={back}>Voltar</button>
            <div>
                <h1>ID: {produto?.id}</h1>
                <h1>NOME: {produto?.nome}</h1>
                <h1>PREÇO: {produto?.preco}</h1>
                <h1>IDESTOQUE: {produto?.idEstoque}</h1>
            </div>

        </>
    )
}

export default VisualizarProduto;