import { useContext } from 'react';
import './header.css';
import { AuthContext } from '../../contexts/auth';
import avatar from '../../assets/avatar.png'

import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiSettings } from "react-icons/fi";


export default function Header() {
    
    const { user } = useContext(AuthContext);
    console.log(user)
    
    return(
        <div className="sidebar">
            <div>
                <img src={user.avatarUrl === null ?  avatar : user.avatarUrl } alt="Foto avatar" />
            </div>
            <Link>
                <FiHome color="#FFF" size={24}/>
                Chamados
            </Link>
            <Link>
                <FiUser color="#FFF" size={24}/>
                Clientes
            </Link>
            <Link>
                <FiSettings color="#FFF" size={24}/>
                Configurações
            </Link>
        </div>
    )
}
