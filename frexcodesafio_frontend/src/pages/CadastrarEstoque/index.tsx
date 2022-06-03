/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-pascal-case */
import { ChangeEvent, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Nav_Bar from '../../components/navbar';
import api from '../../services/api';
import * as yup from 'yup'
import './styles.css';

interface IForm{
    nome: string;
}

const CadastrarEstoque = () => {
    const navigate = useNavigate();

    const [formState, setFormState] = useState<IForm>({
        nome: ""
    });

    const [status, setStatus] = useState ({
        type: '',
        mensagem: ''
    })

    function updateForm (e: ChangeEvent<HTMLInputElement>){

        setFormState({
            ...formState,
            [e.target.name]: 
            e.target.value
        })
    }

    async function onSubmit (e: ChangeEvent<HTMLFormElement>){
        e.preventDefault()

        if(!(await validate())) return;

        const saveForm = true

        if(saveForm){
            await api.post('/estoque', formState).then(() => (
                navigate('/estoques')
            ))
            alert('Estoque Cadastrado')
        }else{
            alert('Estoque não foi cadastrado')
        }
    }

    async function validate(){
        let schema = yup.object().shape({
            nome: yup.string().required('Por favor preencha o nome do estoque')
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
                    <h1>Cadastrar novo estoque</h1>
                    <Button variant="light" onClick={back}>Voltar</Button>{' '}
                </div>
                <div className="section-form">
                    <form className='form' onSubmit={onSubmit}>
                        {status.type === 'success' ? <p style={{ color: "#2B8FD7" }}>{status.mensagem}</p> : ""}
                        {status.type === 'error' ? <p style={{ color: "red" }}>{status.mensagem}</p> : ""}
                        <div className="field">
                            <label htmlFor="nome">Nome do estoque:</label>
                            <input 
                                type="text" 
                                id="estoque" 
                                name="nome" 
                                value={formState.nome}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)}
                            />
                        </div>
                        <Button  variant="primary" type="submit">Cadastrar</Button>{' '}
                    </form>
                </div>
            </main>
        </section>
        </>
    )
}

export default CadastrarEstoque;