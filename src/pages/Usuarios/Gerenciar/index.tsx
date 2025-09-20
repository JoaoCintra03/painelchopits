import axios from "axios";
import { useCallback, useEffect, useRef, type SyntheticEvent } from "react"
import { useNavigate, useParams } from "react-router-dom";

export default function GerenciarUsuarios() {

    const navigate = useNavigate ();
    const {id} = useParams();
    const refForm = useRef<any>(null);

    useEffect(() => {
        const idUser = Number(id)

        if(isNaN(idUser)) {
            axios.get(`http://localhost:3001/usuarios?id=${idUser}`)
            .then(({ data }) => {
                refForm.current['nome'].value = data[0].nome
                refForm.current['email'].value = data[0].email
            })
            .catch((erro) => {
                console.log(erro)
            })
        }
    },[id])
    const submitForm = useCallback((event: SyntheticEvent) => {
        event.preventDefault();

        if (refForm.current.checkValidity()) {

            const target = event.target as typeof event.target & {
                nome: {value: string},
                email:{value: string},
            }

            let objSalvar = {
                nome: target.nome.value,
                email: target.email.value,
            }

            axios.post('http://localhost:3001/usuarios', objSalvar)
            .then (() => {
                alert('Salvou')
                navigate('/usuarios')
            })
            .catch((erro) => {
                console.log(erro)
                alert('Não salvou')
            })
        } else {
            refForm.current.classList.add('was-validated')
       }

    }, [])
    return(
        <>
         <h1>Usuario</h1>

         <form
         noValidate
         className="needs-validation g-3 row"
           ref={refForm}
           onSubmit={submitForm}
           >
            <div className="col-md-12">
                <label htmlFor="nome" className="formLabel"
                
                >
                    Nome
                </label>
                <input
                 type="text" 
                className="form-control"
                placeholder="Digite seu nome"
                id="nome"
                required/>

                <div className="invalid-feedback">
                    Por favor digite seu nome.
                </div>
            </div> 
            
            <div className="col-md-12">
                <label htmlFor="nome" className="formLabel"
                
                >
                    Email
                </label>
                <input
                 type="email" 
                className="form-control"
                placeholder="Digite seu email"
                id="email"
                required/>

                <div className="invalid-feedback">
                    Por favor digite seu email.
                </div>
            </div>

            <div className="col-md-12">

                <button
                className="btn"
                type="button"
                >Voltar</button>

                <button
                className="btn btn-primary"
                type="submit"
                >Salvar</button>

            </div>
         </form>
        </>
    )
}