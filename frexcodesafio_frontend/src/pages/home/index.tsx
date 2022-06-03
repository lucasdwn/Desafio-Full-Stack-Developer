/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-pascal-case */
import { MdOutlineInventory2 } from "react-icons/md";
import Nav_Bar from "../../components/navbar";
import './styles.css'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
function Home() {
    return (

       <>
       <section>
           <header>
                <Nav_Bar/>
           </header>
           <main>
               <div className="mainheeader">
                   <h1>Bem vindo ao </h1>
                   <span>MY-STOCK<MdOutlineInventory2/></span>
                </div>
                <div className="text">
                    <p>Aqui você pode cadastrar seus produtos e seus estoques de produtos de uma forma rápida e prática!!</p><br></br>
                    <p>Vamos começar cadastrando um estoque!</p>
                    <a href="/cadastrar_estoque"><p>Clique Aqui!</p></a><br></br>
                    <p>Logo após crie um Produto e escolha a qual estoque ele pertence</p>
                    <a href="/cadastrar_produto"><p>Clique Aqui!</p></a>
                </div>
           </main>
           <footer>
               <div className="icons">
                    <a href="https://www.linkedin.com/in/lucascostadwn/" target="_blank"><FaLinkedin className="icon"/></a>
                    <a href="https://github.com/lucasdwn" target="_blank"><FaGithub className="icon" /></a>
               </div>
               <p>Conecte-se comigo!</p>
           </footer>
       </section>
       </>
    );
}

export default Home;