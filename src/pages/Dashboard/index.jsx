import { useState, useEffect } from "react";
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import firebase from '../../services/firebaseConnection';
import format from "date-fns/format";


import './dashboard.css';

import Header from "../../components/Header";
import Title from "../../components/Title";
import Modal from "../../components/Modal";

const listRef = firebase.firestore().collection('chamados').orderBy('created', 'desc')

function Dashboard() {

    const [chamados, setChamados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState();

    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();

    useEffect(() => {
        async function loadChamados() {
            await listRef.limit(5)
                .get()
                .then((snapshot) => {
                    updateState(snapshot);
                })
                .catch((error) => {
                    console.log('Erro na busca de chamados', error);
                    setLoadingMore(false);
                })
            setLoading(false);
        }

        loadChamados();

    }, []);



    async function updateState(snapshot) {
        const isCollectionEmpty = snapshot.size === 0;
        
        if (!isCollectionEmpty) {
            let lista = [];
            
            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    assunto: doc.data().assunto,
                    cliente: doc.data().cliente,
                    clienteId: doc.data().clienteId,
                    created: doc.data().created,
                    createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
                    status: doc.data().status,
                    complemento: doc.data().complemento
                })
            })

            const lastDoc = snapshot.docs[snapshot.docs.length - 1];
            
            setChamados(chamados => [...chamados, ...lista]);
            setLastDocs(lastDoc);

        }
        else {
            setIsEmpty(true);
        }
        setLoadingMore(false);
    }

    async function handleMore() {
        setLoadingMore(true);
        await listRef.startAfter(lastDocs).limit(5)
        .get()
        .then((snapshot) => {
            updateState(snapshot);
        })
    }

    function togglePostModal(chamado) {
        setShowPostModal(!showPostModal);
        setDetail(chamado);
    }

    if(loading) {
        return(
            <div>
                <Header />
                <div className="content">
                    <Title name="Chamados">
                        <FiMessageSquare size={25} />
                    </Title>
                    <div className="container dashboard">
                        <span>Buscando chamados...</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Chamados">
                    <FiMessageSquare size={25} />
                </Title>

                {chamados.length === 0 ? (
                    <div className="container dashboard">
                        <span>Nenhum chamado registrado</span>
                        <Link to="/new" className="new">
                            <FiPlus size={25} color="FFF" />
                            Novo chamado
                        </Link>
                    </div>
                ) : (
                    <>
                        <Link to="/new" className="new full">
                            <FiPlus size={25} color="FFF" />
                            Novo chamado
                        </Link>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Assunto</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Cadastrado em</th>
                                    <th scope="col">#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {chamados.map((chamado, index) => {
                                    return (
                                        <tr key={index}>
                                            <td data-label="Cliente">{chamado.cliente}</td>
                                            <td data-label="Assunto">{chamado.assunto}</td>
                                            <td data-label="Status">
                                                <span className="badge" style={{ backgroundColor: chamado.status === 'Aberto' ? '#5cb85c' : '#999' }}>{chamado.status}</span>
                                            </td>
                                            <td data-label="Cadastrado em">{chamado.createdFormated}</td>
                                            <td data-label="#">
                                                <button className="action" style={{ backgroundColor: '#3583f6' }} onClick={() => togglePostModal(chamado)}>
                                                    <FiSearch color="#FFF" size={17} />
                                                </button>
                                                <button className="action" style={{ backgroundColor: '#F6a935' }}>
                                                    <FiEdit2 color="#FFF" size={17} />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {loadingMore && <h3 style={{textAlign: 'center', marginTop: 15}}>Buscando dados...</h3>}
                        { !loadingMore && !isEmpty && <button className="btn-more" onClick={handleMore}>Buscar mais</button> }
                    </>
                )}

            </div>

            {showPostModal && (
                <Modal 
                    conteudo={detail}
                    close={togglePostModal}
                />
            )}
        </div>
    )
}

export default Dashboard;