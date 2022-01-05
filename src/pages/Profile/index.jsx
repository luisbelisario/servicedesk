import { useState, useContext } from 'react'
import './profile.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiSettings, FiUpload } from 'react-icons/fi'
import avatar from '../../assets/avatar.png'
import { AuthContext } from '../../contexts/auth'

export default function Profile() {
    
    const {user} = useContext(AuthContext)
    const { signOut } = useContext(AuthContext)

    const [nome, setNome] = useState(user && user.nome)
    const [email, setEmail] = useState(user && user.email)
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)

    return(
        <div>
            <Header/>

            <div className="content">
                <Title name="Meu perfil">
                    <FiSettings size={25} />
                </Title>

                <div className="container">
                    <form action="" className="form-profile">
                        <label htmlFor="" className="label-avatar">
                            <span>
                                <FiUpload color="#FFF" size={25} />
                            </span>
                            
                            <input type="file" accept="image/*" /> <br />
                            {avatarUrl === null ? 
                                <img src={avatar} width="250" height="250" alt="Foto de perfil" />
                                : 
                                <img src={user.avatarUrl} width="250" height="250" alt="Foto de perfil" />
                            }
                        </label>
                        
                        <label htmlFor="" className="text-label">Nome:</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}/>
                        
                        <label htmlFor="" className="text-label">Email:</label>
                        <input type="text" value={email} disable={true}/>

                        <button type="submit" className="profile-btn">Salvar</button>
                    </form>
                </div>

                            
                <div className="container">
                    <button className="logout-btn" onClick={ () => signOut() }>Logout</button>
                </div>
            </div>
        </div>
    )
}
