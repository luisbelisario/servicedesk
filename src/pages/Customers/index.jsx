import { useState } from 'react';
import firebase from '../../services/firebaseConnection';
import { toast } from 'react-toastify';

import './customers.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiUser } from 'react-icons/fi'

export default function Customers() {
    
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');

    async function handleAdd(e) {
        e.preventDefault();
        if (nomeFantasia !== '' && cnpj !== '' && telefone !== '' && endereco !== '') {
            await firebase.firestore().collection('customers')
            .add({
               nomeFantasia: nomeFantasia,
               cnpj: cnpj,
               telefone: telefone,
               endereco: endereco 
            })
            .then(() => {
                setNomeFantasia('');
                setCnpj('');
                setTelefone('');
                setEndereco('');
                toast.info('Empresa cadastrada com sucesso!');
            })
            .catch((error) => {
                console.log(error);
                toast.error('Erro no cadastro da empresa!');
            })
        }
        else {
            toast.error('Preencha todos os campos!');
        }
    }
    
    return(
        <div>
            <Header />
            <div className="content">
                <Title name="Clientes">
                    <FiUser size={25} />
                </Title>

                <div className="container">
                   <form action="" className="form-profile customers" onSubmit={handleAdd}>
                        <label htmlFor="">Nome da empresa: </label>
                        <input type="text" value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value) }/>
                        <label htmlFor="">CNPJ: </label>
                        <input type="text" value={cnpj} onChange={(e) => setCnpj(e.target.value) }/>
                        <label htmlFor="">Telefone: </label>
                        <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value) }/>
                        <label htmlFor="">Endereço: </label>
                        <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value) }/>

                        <button type="submit" className="profile-btn">Cadastrar</button>
                   </form> 
                </div>
            </div>
        </div>
    )
}
