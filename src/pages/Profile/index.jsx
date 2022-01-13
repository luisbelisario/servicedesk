import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import firebase from '../../services/firebaseConnection'

import './profile.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiSettings } from 'react-icons/fi'
import avatar from '../../assets/avatar.png'


export default function Profile() {
    
    const { user, signOut, setUser, storageUser } = useContext(AuthContext)

    const [nome, setNome] = useState(user && user.nome)
    const [email] = useState(user && user.email)
    const [avatarUrl] = useState(user && user.avatarUrl)
    const [imageAvatar, setImageAvatar] = useState(null);

    function handleFile(e) {

        if(e.target.files[0]) {
            setImageAvatar(e.target.files[0])
        }
    }

    async function handleUpload() {
        const currentUid = user.uid;

        await firebase.storage()
        .ref(`images/${currentUid}/${imageAvatar.name}`)
        .put(imageAvatar)
        .then(async () => {
            console.log('Foto enviada com sucesso')
            await firebase.storage().ref(`images/${currentUid}`)
            .child(imageAvatar.name).getDownloadURL()
            .then(async (url) => {
                let urlFoto = url;

                await firebase.firestore().collection('users')
                .doc(user.uid)
                .update({
                    avatarUrl: urlFoto,
                    nome: nome
                })
                .then(() => {
                    let data = {
                        ...user,
                        avatarUrl: urlFoto,
                        nome: nome
                    }
                    setUser(data)
                    storageUser(data)
                })
            })
        })
    }

    async function handleSave(e) {
        e.preventDefault();
        
        if(imageAvatar === null && nome !== '') {
            await firebase.firestore().collection('users')
            .doc(user.uid)
            .update({
                nome: nome
            })
            .then(()=> {
                let data = {
                    ...user,
                    nome: nome
                }
                setUser(data)
                storageUser(data)
            })
        }
        else if(imageAvatar !== null && nome !== '') {
            handleUpload();
        }
    }


    return(
        <div>
            <Header/>

            <div className="content">
                <Title name="Meu perfil">
                    <FiSettings size={25} />
                </Title>

                <div className="container">
                    <form action="" className="form-profile" onSubmit={handleSave}>
                        <label htmlFor="" className="label-avatar">
                            
                            {avatarUrl === null ? 
                                <img src={avatar} width="250" height="250" alt="Foto de perfil" />
                                : 
                                <img src={user.avatarUrl} width="250" height="250" alt="Foto de perfil" />
                            }
                        </label>
                        <input type="file" accept="image/**" onChange={handleFile} /> <br />
                        <label htmlFor="" className="text-label">Nome:</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}/>
                        
                        <label htmlFor="" className="text-label">Email:</label>
                        <input type="text" value={email} disable="true" onChange={() => {}}/>

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
