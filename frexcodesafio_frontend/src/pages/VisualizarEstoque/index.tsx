import react, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

interface IEstoque {
    id: number;
    nome: string;
}

const VisualizarEstoque = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [estoque, setEstoque] = useState<IEstoque>()

    useEffect(() => {
        ViewEstoque()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    function back(){
        navigate('/Estoques')
    }

    async function ViewEstoque() {
        const response = await api.get<IEstoque>(`Estoque/${id}`)
        setEstoque(response.data)
    }
    return (
        <>
            <h1>Visualizar "{estoque?.nome}"</h1>
            <button onClick={back}>Voltar</button>
            <div>
                <h1>ID: {estoque?.id}</h1>
                <h1>NOME: {estoque?.nome}</h1>
            </div>

        </>
    )
}

export default VisualizarEstoque;