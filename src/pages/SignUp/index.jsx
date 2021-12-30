import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';


import './signup.css';
import logo from '../../assets/logo.png'


function SignUp() {
    
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signUp, loadingAuth } = useContext(AuthContext);
    
    function handleSubmit(e) {
        e.preventDefault();
        if (nome !== '' && email !== '' && password !== '') {
            signUp(nome, email, password);
        }
    }

    return (
        <div className="container-center">
           <div className="login">
                <div className="logo-area">
                    <img src={logo} alt="Logotipo sistema" />
                </div>
                <form action="" onSubmit={handleSubmit} className="form-area">
                    <label htmlFor="">Nome: </label>
                    <input type="text" value={nome} onChange={ (e) => setNome(e.target.value) } />
                    <label htmlFor="">Email: </label>
                    <input type="email" value={email} onChange={ (e) => setEmail(e.target.value) } />
                    <label htmlFor="">Senha: </label>
                    <input type="password" value={password} onChange={ (e) => setPassword(e.target.value) } />
                    <button type="submit">Cadastrar</button>
                </form>

                {loadingAuth && <span>Fazendo cadastro...</span>}

                <Link to="/">Já possui uma conta? Entre</Link>
           </div>
        </div>
    )
}

export default SignUp;