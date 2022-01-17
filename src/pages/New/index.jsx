import { useState, useEffect, useContext } from "react";
import { FiPlus } from "react-icons/fi";
import firebase from '../../services/firebaseConnection';

import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import Title from "../../components/Title";
import './new.css';

export default function New() {

    const [loadCustomers, setLoadCustomers] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomers] = useState(0);

    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');
    const [complemento, setComplemento] = useState('');

    const { user } = useContext(AuthContext);

    useEffect(() => {
        async function loadCustomers() {
            await firebase.firestore().collection('customers')
                .get()
                .then((snapshot) => {

                    let lista = [];

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            nomeFantasia: doc.data().nomeFantasia
                        })
                    })

                    if (lista.length === 0) {
                        setCustomers([{ id: '1', nomeFantasia: '' }]);
                        setLoadCustomers(false);
                        return;
                    }
                    setCustomers(lista);
                    setLoadCustomers(false);
                })
                .catch((error) => {
                    console.log('Erro na busca dos clientes!', error);
                    setLoadCustomers(false);
                    setCustomers([{ id: '1', nomeFantasia: '' }])
                })
        }
        loadCustomers();
    }, [])

    function handleRegister(e) {
        e.preventDefault();
        alert('teste');
    }

    //Troca assunto
    function handleChangeSelect(e) {
        setAssunto(e.target.value);
    }

    //Troca status
    function handleOptionChange(e) {
        setStatus(e.target.value);
    }

    //Troca cliente
    function handleChangeCustomers(e) {
        setSelectedCustomers(e.target.value)
    }

    return (
        <div>
            <Header />

            <div className="content">
                <Title name="Novo chamado">
                    <FiPlus size={25} />
                </Title>

                <div className="container">
                    <form action="" className="form-profile" onSubmit={handleRegister}>
                        <label htmlFor="">Cliente</label>
                        {loadCustomers ? (
                            <input type="text" disable={true} value="Carregando clientes..." />
                        ) : (
                            <select value={selectedCustomer} onChange={handleChangeCustomers}>
                                {customers.map((customer, index) => {
                                    return (
                                        <option key={customer.id} value={index}>
                                            {customer.nomeFantasia}
                                        </option>
                                    )
                                })}
                            </select>
                        )}

                        <label htmlFor="">Assunto</label>
                        <select value={assunto} onChange={handleChangeSelect}>
                            <option value="Suporte">Suporte</option>
                            <option value="Visita técnica">Visita técnica</option>
                            <option value="Financeiro">Financeiro</option>
                        </select>

                        <label htmlFor="">Status</label>
                        <div className="status">
                            <input
                                type="radio"
                                name="radio"
                                value="Aberto"
                                onChange={handleOptionChange}
                                checked={status === 'Aberto'}
                            />
                            <span>Em aberto</span>
                            <input
                                type="radio"
                                name="radio"
                                value="Progresso"
                                onChange={handleOptionChange}
                                checked={status === 'Progresso'}
                            />
                            <span>Em progresso</span>
                            <input
                                type="radio"
                                name="radio"
                                value="Finalizado"
                                onChange={handleOptionChange}
                                checked={status === 'Finalizado'}
                            />
                            <span>Finalizado</span>
                        </div>

                        <label htmlFor="">Complemento</label>
                        <textarea type="text" placeholder="Descreva seu problema (opcional)"
                            value={complemento} onChange={(e) => setComplemento(e.target.value)}
                            cols="20" rows="5"></textarea>

                        <button type="submit" className="profile-btn">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}