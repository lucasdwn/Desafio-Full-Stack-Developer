/* eslint-disable react/jsx-pascal-case */
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Nav_Bar from '../../components/navbar';
import api from '../../services/api';

interface IForm {
    nome: string;
    preco: number;
    quantidade: number;
    estoqueId: number;
}

interface IEstoque {
    id: number;
    nome: string;
}

const EditarProduto = () => {

    const navigate = useNavigate()
    const { id } = useParams()

    const [formState, setFormState] = useState<IForm>({
        nome: "",
        preco: 0.00,
        quantidade: 1,
        estoqueId: 0
    });

    useEffect(() => {
        findProduto(id)
    }, [id])

    const [estoque, setEstoque] = useState<IEstoque[] | undefined>()

    useEffect(() => {
        loadEstoque()
    }, []);

    function updateForm (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>){

        setFormState({
            ...formState,
            [e.target.name]: 
            e.target.value
        })
    }

    async function loadEstoque() {
        const response = await api.get('/estoque')
        setEstoque(response.data)
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
            preco: response.data.preco,
            quantidade: response.data.quantidade,
            estoqueId: response.data.estoqueId
        })
    }

    function back() {
        navigate('/produtos')
    }

    
    return (
        <>
        <section>
            <header>
                <Nav_Bar/>
            </header>
            <main>
                <div className="mainheadeer">
                    <h1>Editar produto</h1>
                    <Button variant="light" onClick={back}>Voltar</Button>{' '}
                </div>
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
                        <div className="field">
                            <label htmlFor="quantidade">quantidade:</label>
                            <input 
                            type="number" 
                            id="quantidade"
                            name="quantidade"
                            min="1"
                            max="100"
                            value={formState.quantidade}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                            />
                        </div>
                        <div className="field">
                        <label htmlFor="estoque">Estoque:</label>
                            <select id="estoqueId" name="estoqueId" value={formState.estoqueId} onChange={(e: ChangeEvent<HTMLSelectElement>) => updateForm(e)}>
                                <option>Selecione um estoque</option>
                                {
                                    estoque && estoque.map(estoque => (
                                        <option value={estoque.id} key={estoque.id}>{estoque.nome}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <Button  variant="primary" type="submit">Salvar</Button>{' '}
                    </form>
                </div>
            </main>
        </section>
        </>
    );
}

export default EditarProduto;