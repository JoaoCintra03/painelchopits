import axios from "axios";
import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react"
import { useNavigate, useParams } from "react-router-dom";

export default function GerenciarUsuarios() {

    const navigate = useNavigate();
    const { id } = useParams();
    const refForm = useRef<any>(null);
    const [isEditar, setIsEditar] = useState(false)

    useEffect(() => {
        const idUsuario = Number(id)

        if (!isNaN(idUsuario)) {
            console.log('é numero ');
            setIsEditar(true);
            

            axios.get(`http://localhost:3001/usuarios?id=${idUsuario}`)
                .then(({ data }) => {
                    refForm.current['nome'].value = data[0].nome
                    refForm.current['email'].value = data[0].email
                    refForm.current['permissão'].value = data[0].permissao
                    refForm.current['senha'].value = data[0].senha
                })
                .catch((erro) => {
                    console.log(erro);

                })
        }
    }, [id])

    const submitForm = useCallback((event: SyntheticEvent) => {
        event.preventDefault();

        if (refForm.current.checkValidity()) {

            const target = event.target as typeof event.target & {   
                nome: { value: string },
                email: { value: string },
                permissao: { value: string },
                senha: { value: string }
            }

            let objSalvar = {
                nome: target.nome.value,
                email: target.email.value,
                permissao: target.permissao.value,
                senha: target.senha.value,
            }

            if (isEditar) {
                console.log('esta editando');

                axios.put('http://localhost:3001/usuarios/'+ id, objSalvar)
                    .then(() => {
                        alert('Editado com sucesso.')
                        navigate('/usuarios')
                    })
                    .catch((erro) =>{
                        console.log(erro);
                        
                    })
            } else {
                console.log('esta criando');
                axios.post('http://localhost:3001/usuarios', objSalvar)
                .then(() => {
                    alert('Cadastrado!')
                    navigate('/usuarios')
                })
                .catch((erro) => {
                    console.log(erro)
                    alert('Deu ruim')
                })
            }

            
        } else {
            refForm.current.classList.add('was-validated')
        }
    }, [isEditar, id])

    return (
        <>
            <div className="container mt-3">

                <h1>Usuario</h1>

                <form className="needs-validation g-3 row" noValidate ref={refForm} onSubmit={submitForm}>

                    <div className="col-md-12">
                        <label htmlFor="nome" className="formLabel"> Nome </label>
                        <input type="text" className="form-control" placeholder="Digite seu nome" id="nome" required />
                        <div className="invalid-feedback">Por favor digite seu nome.</div>
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="email" className="formLabel"> Email </label>
                        <input type="email" className="form-control" placeholder="Digite seu email" id="email" required />
                        <div className="invalid-feedback">Por favor digite seu email.</div>
                    </div>

                    
                    <div className="col-md-12">
                    <label htmlFor="permissao" className="formLabel"> Permissão </label>
                    <select className="form-control" id="permissao" required>
                        <option value="">Selecione uma opção</option>
                        <option value="Admin">Admin</option>
                        <option value="Colaborador">Colaborador</option>
                    </select>
                    <div className="invalid-feedback">Por favor informe sua permissão.</div>
                </div>

                    
                    <div className="col-md-12">
                         <label htmlFor="senha" className="formLabel">Senha</label>
                         <input type="password" className="form-control" placeholder="Digite sua senha" id="senha" required />
                         <div className="invalid-feedback">Por favor digite sua senha</div>
                      </div> 


                    <div className="col-md-12">
                         <input type="submit" value="Voltar" className="btn btn-secondary" onClick={() => {
                            navigate('/usuarios')
                         }}/>
                        <input type="submit" value="Enviar" className="btn btn-primary" />
                    </div>

                </form>
            </div>
        </>
    )
}