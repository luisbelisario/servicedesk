import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth';
import './signin.css';
import logo from '../../assets/logo.png'


function SignIn() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, loadingAuth } = useContext(AuthContext);
    
    function handleSubmit(e) {
        e.preventDefault();

        if (email !== '' && password !== '') {
            signIn(email, password);
        }
    }

    return (
        <div className="container-center">
           <div className="login">
                <div className="logo-area">
                    <img src={logo} alt="Logotipo sistema" />
                </div>
                <form action="" onSubmit={handleSubmit} className="form-area">
                    <label htmlFor="">Email: </label>
                    <input type="email" value={email} onChange={ (e) => setEmail(e.target.value) } />
                    <label htmlFor="">Senha: </label>
                    <input type="password" value={password} onChange={ (e) => setPassword(e.target.value) } />
                    <button type="submit">Login</button>
                </form>

                {loadingAuth && <span>Fazendo login...</span>}

                <Link to="/register">Criar uma conta</Link>
           </div>
        </div>
    )
}

export default SignIn;