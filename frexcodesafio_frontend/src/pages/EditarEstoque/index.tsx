import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import api from '../services/api';

interface IForm {
    nome: string;
}

const EditarEstoque= () => {

    const navigate = useNavigate()
    const { id } = useParams()

    const [formState, setFormState] = useState<IForm>({
        nome: ""
    });

    useEffect(() => {
        findEstoque(id)
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

        await api.put(`/estoque/${id}`, formState).then(() => (
            navigate('/estoques')
        ))
        
    }

    async function findEstoque(id: string | undefined){
        const response = await api.get(`estoque/${id}`)
        setFormState({
            nome: response.data.nome
        })
    }

    function back() {
        navigate('/estoques')
    }

    
    return (
        <>
            <h1>Editar estoque</h1>
            <button onClick={back}>Voltar</button>
            <div className="section-form">
                <form className='form' onSubmit={onSubmit}>
                    <div className="field">
                        <label htmlFor="nome">Estoque:</label>
                        <input 
                            type="text" 
                            id="estoque" 
                            name="nome" 
                            value={formState.nome}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                        />
                    </div>
                    <input type="submit" value="Salvar" />
                </form>
            </div>
        </>
    );
}

export default EditarEstoque;