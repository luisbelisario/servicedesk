import { useState, useEffect, useContext } from "react";
import { FiPlus } from "react-icons/fi";
import firebase from '../../services/firebaseConnection';
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import Title from "../../components/Title";
import './new.css';

export default function New() {

    const { id } = useParams();
    const history = useHistory();

    const [loadCustomers, setLoadCustomers] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomers] = useState(0);

    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');
    const [complemento, setComplemento] = useState('');

    const [idCustomer, setIdCustomer] = useState(false);

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

                    if(id) {
                        firebase.firestore().collection('chamados').doc(id)
                            .get()
                            .then((snapshot) => {
                                setAssunto(snapshot.data().assunto);
                                setStatus(snapshot.data().status);
                                setComplemento(snapshot.data().complemento);

                                let index = lista.findIndex(item => item.id === snapshot.data().clienteId);
                                setSelectedCustomers(index);
                                setIdCustomer(true);
                            })
                            .catch((error) => {
                                console.log('Chamado não encontrado!');
                                setIdCustomer(false);
                            })
                    }
                })
                .catch((error) => {
                    console.log('Erro na busca dos clientes!', error);
                    setLoadCustomers(false);
                    setCustomers([{ id: '1', nomeFantasia: '' }])
                })
        }
        loadCustomers();
    }, [id])

    async function handleRegister(e) {
        e.preventDefault();

        if(idCustomer) {
            await firebase.firestore().collection('chamados')
            .doc(id)
            .update({
                cliente: customers[selectedCustomer].nomeFantasia,
                clienteId: customers[selectedCustomer].id,
                assunto: assunto,
                status: status,
                complemento: complemento,
                userId: user.uid
            })
            .then(() => {
                toast.success('Chamado editado com sucesso!');
                setSelectedCustomers(0);
                setComplemento('');
                history.push('/dashboard');
            })
            .catch((error) => {
                toast.error('Erro ao editar chamado!');
            })
            return;
        }
    
        await firebase.firestore().collection('chamados')
        .add({
            created: new Date(),
            cliente: customers[selectedCustomer].nomeFantasia,
            clienteId: customers[selectedCustomer].id,
            assunto: assunto,
            status: status,
            complemento: complemento,
            userId: user.uid
        })
        .then(() => {
            toast.success('Chamado cadastrado com sucesso!');
            setComplemento('');
            setSelectedCustomers(0);
        })
        .catch((error) => {
            toast.error('Erro no cadastro de chamado!');
            console.log(error);
        })
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