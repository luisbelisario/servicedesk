import { useState } from 'react';
import { Link } from 'react-router-dom';


import './signin.css';
import logo from '../../assets/logo.png'


function SignIn() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    function handleSubmit(e) {
        e.preventDefault();
        alert('Clicastes');
        setEmail('');
        setPassword('');
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

                <Link to="/register">Criar uma conta</Link>
           </div>
        </div>
    )
}

export default SignIn;