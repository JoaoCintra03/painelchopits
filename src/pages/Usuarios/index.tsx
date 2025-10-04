import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { FaPen, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

interface IUsuarios {
    id: number;
    nome: string;
    email: string;
    permissao: string;
    senha: string
}

export const Usuarios = () => {

    const navigate = useNavigate();

    const [usuarios, setUsuarios] = useState<IUsuarios[]>([])

    useEffect(() => {
        console.log('Execução ao iniciar a pg')

        axios.get('http://localhost:3001/usuarios')
            .then((resposta) => {
                console.log(resposta.data)

                setUsuarios(resposta.data)
            })
            .catch((erro) => {
                console.log(erro)
            })
    }, [])

const excluirUsuarios = useCallback(async(id: number) => {

    try {await axios.delete(`http://localhost:3001/usuarios/${id}`)

    const {data} = await axios.get('http://localhost:3001/usuarios')

    setUsuarios(data) 
   } catch (erro) {
    alert('Erro: Ligue para o suporte: ')
    console.log(erro)
   }
}, [])
    


    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 10
                }}
            >
                <h1>Usuarios</h1>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                        navigate('cadastrar')
                    }}
                >
                    Cadastrar
                </button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Email</th>
                        <th scope="col">Permissões</th>
                        <th scope="col">Senha</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map((usuario, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{usuario.id}</th>
                                    <td>{usuario.nome}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.permissao}</td>
                                    <td>*********</td>
                                    <td>    
                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                            style={{ marginRight: 5 }}
                                            onClick={() => {
                                                navigate(`/usuarios/${usuario.id}`)
                                            }}
                                        >
                                            <FaPen />
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            type="button"
                                            onClick={() => {
                                                excluirUsuarios(usuario.id)
                                            }}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}