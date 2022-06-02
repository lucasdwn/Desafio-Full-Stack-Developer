/* eslint-disable react/jsx-pascal-case */
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import Nav_Bar from '../../components/navbar';
import api from '../../services/api';

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
        <section>
            <header>
                <Nav_Bar/>
            </header>
            <main>
                <div className="mainheadeer">
                    <h1>Editar estoque</h1>
                    <Button variant="light" onClick={back}>Voltar</Button>{' '}
                </div>
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
                        <Button  variant="primary" type="submit">Salvar</Button>{' '}
                    </form>
                </div>
            </main>
        </section>
        </>
    );
}

export default EditarEstoque;