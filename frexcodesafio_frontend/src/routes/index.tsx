import {
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom'
import CadastrarEstoque from '../pages/CadastrarEstoque';
import CadastrarProduto from '../pages/CadastrarProduto';
import EditarEstoque from '../pages/EditarEstoque';
import EditarProduto from '../pages/EditarProduto';
import Estoques from '../pages/Estoque';
import Home from '../pages/home'
import Produtos from '../pages/Produtos';
import VisualizarEstoque from '../pages/VisualizarEstoque';
import VisualizarProduto from '../pages/VisualizarProduto';


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/produtos" element={<Produtos/>} />
                <Route path="/produtos/:id" element={<VisualizarProduto/>} />
                <Route path="/cadastrar_produto" element={<CadastrarProduto/>} />
                <Route path="/editar_produto/:id" element={<EditarProduto/>} />
                <Route path="/estoques" element={<Estoques/>} />
                <Route path="/estoques/:id" element={<VisualizarEstoque/>} />
                <Route path="/cadastrar_estoque" element={<CadastrarEstoque/>} />
                <Route path="/editar_estoque/:id" element={<EditarEstoque/>} />
            </Routes>
        </Router>
    )
}

export default AppRoutes;