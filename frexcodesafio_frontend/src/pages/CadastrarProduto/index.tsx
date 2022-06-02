/* eslint-disable react/jsx-pascal-case */
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'
import * as yup from 'yup';
import api from '../../services/api';
import { Button } from 'react-bootstrap';
import Nav_Bar from '../../components/navbar';

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

const CadastrarProduto = () => {

    const navigate = useNavigate()

    const [formState, setFormState] = useState<IForm>({
        nome: "",
        preco: 0.00,
        quantidade: 1,
        estoqueId: 0
    });

    const [estoque, setEstoque] = useState<IEstoque[] | undefined>()

    const [status, setStatus] = useState ({
        type: '',
        mensagem: ''
    })

    function updateForm (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>){

        setFormState({
            ...formState,
            [e.target.name]: 
            e.target.value
        })
    }

    useEffect(() => {
        loadEstoque()
    }, []);

    async function loadEstoque() {
        const response = await api.get('/estoque')
        setEstoque(response.data)
    }

    async function onSubmit (e: ChangeEvent<HTMLFormElement>){
        e.preventDefault()
        
        if(!(await validate())) return;

        const saveForm = true

        if(saveForm) {
            await api.post('/produtos', formState).then(()=>(
                navigate('/produtos')
                ))
            alert('Produto Cadastrado!')
        }else {
            alert('Produto não foi cadastrado!')
        } 
    }

    

    async function validate(){
        let schema = yup.object().shape({
            nome: yup.string().required('Por favor preencha o nome do produto'),
            preco: yup.number().required('Por favor preencha o preço do produto'),
            quantidade: yup.number().required('Por favor preencha a quantiedade do produto')
        }).required();
        try{
            await schema.validate(formState)
            return true
        }catch(error){
            setStatus({
                type: 'error',
                mensagem: `${ error }`
            })
        }
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
                    <h1>Cadastrar novo produto</h1>
                    <Button variant="light" onClick={back}>Voltar</Button>{' '}
                </div>
                <div className="section-form">
                    <form className='form' onSubmit={onSubmit}>
                    {status.type === 'success' ? <p style={{ color: "#2B8FD7" }}>{status.mensagem}</p> : ""}
                    {status.type === 'error' ? <p style={{ color: "red" }}>{status.mensagem}</p> : ""}
                        <div className="field">
                            <label htmlFor="nome">Nome do produto:</label>
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
                            <label htmlFor="quantidade">Quantidade:</label>
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
                            <p className='p'>(Por favor crie um estoque antes de produto)</p>
                        </div>
                        <Button  variant="primary" type="submit">Cadastrar</Button>{' '}
                    </form>
                </div>
            </main>
        </section>
        </>
    );
}

export default CadastrarProduto;