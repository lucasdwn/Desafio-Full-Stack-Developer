import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import api from '../services/api';

interface IForm {
    nome: string;
    preco: number;
}

const EditarProduto = () => {

    const navigate = useNavigate()
    const { id } = useParams()

    const [formState, setFormState] = useState<IForm>({
        nome: "",
        preco: 0
    });

    useEffect(() => {
        findProduto(id)
    }, [id])

    function updateForm (e: ChangeEvent<HTMLInputElement>){

        setFormState({
            ...formState,
            [e.target.name]: 
            e.target.value
        })
    }

    async function onSubmit (e: ChangeEvent<HTMLFormElement>){
        e.preventDefault()

        await api.put(`/produtos/${id}`, formState).then(() => {
            navigate('/produtos')
        })
        
    }

    async function findProduto(id: string | undefined){
        const response = await api.get(`produtos/${id}`)
        setFormState({
            nome: response.data.nome,
            preco: response.data.preco
        })
    }

    function back() {
        navigate('/produtos')
    }

    
    return (
        <>
            <h1>Editar produto</h1>
            <button onClick={back}>Voltar</button>
            <div className="section-form">
                <form className='form' onSubmit={onSubmit}>
                    <div className="field">
                        <label htmlFor="nome">Produto:</label>
                        <input 
                            type="text" 
                            id="produto" 
                            name="nome" 
                            value={formState.nome}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="preco">Preço:</label>
                        <input 
                            type="number" 
                            id="preco" 
                            name="preco" 
                            value={formState.preco}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                        />
                    </div>
                    <input type="submit" value="Salvar" />
                </form>
            </div>
        </>
    );
}

export default EditarProduto;