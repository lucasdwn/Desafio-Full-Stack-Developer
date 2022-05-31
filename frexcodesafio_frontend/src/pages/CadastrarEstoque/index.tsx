import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface IForm{
    nome: string;
}

const CadastrarEstoque = () => {
    const navigate = useNavigate();

    const [formState, setFormState] = useState<IForm>({
        nome: ""
    });

    function updateForm (e: ChangeEvent<HTMLInputElement>){

        setFormState({
            ...formState,
            [e.target.name]: 
            e.target.value
        })
    }

    async function onSubmit (e: ChangeEvent<HTMLFormElement>){
        e.preventDefault()

        await api.post('/estoque', formState).then(() => (
            navigate('/estoques')
        ))
    }

    function back() {
        navigate('/estoques')
    }

    return (
        <>
        <h1>Cadastrar Estoque</h1>
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
                <input type="submit" value="Cadastrar" />
            </form>
        </div>
    </>
    )
}

export default CadastrarEstoque;