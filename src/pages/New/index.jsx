import Header from "../../components/Header"
import Title from "../../components/Title"

import { FiPlus } from "react-icons/fi"
import './new.css';

export default function New() {
    
    function handleRegister(e) {
        e.preventDefault();
        alert('teste');
    }
    
    return(
        <div>
            <Header />

            <div className="content">
                <Title name="Novo chamado">
                    <FiPlus size={25} />
                </Title>

                <div className="container">
                    <form action="" className="form-profile" onSubmit={handleRegister}>
                        <label htmlFor="">Cliente</label>
                        <select name="" id="">
                            <option key={1} value={1}>Escola Maria</option>
                        </select>

                        <label htmlFor="">Assunto</label>
                        <select name="" id="">
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
                            />
                            <span>Em aberto</span>
                            <input 
                            type="radio"
                            name="radio"
                            value="Progresso" 
                            />
                            <span>Em progresso</span>
                            <input 
                            type="radio"
                            name="radio"
                            value="Finalizado" 
                            />
                            <span>Finalizado</span>
                        </div>

                        <label htmlFor="">Complemento</label>
                        <textarea type="text" placeholder="Descreva seu problema (opcional)" name="" id="" cols="20" rows="5"></textarea>

                        <button type="submit" className="profile-btn">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}