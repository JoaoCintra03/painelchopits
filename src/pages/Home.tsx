import { Link } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";

export const Home = () => {
  const [tarefa, setTarefa] = useState("");
  const [tarefas, setTarefas] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const armazenadas = localStorage.getItem("tarefas");
    if (armazenadas) {
      setTarefas(JSON.parse(armazenadas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  const adicionarTarefa = useCallback(() => {
    if (tarefa.trim() === "") return;
    setTarefas((prev) => [...prev, tarefa]);
    setTarefa("");
    inputRef.current?.focus();
  }, [tarefa]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Home</h1>

      <nav>
        <Link to="/sobre/10">Ir para Sobre </Link> |{" "}
        <Link to="/sobre/20">Ir para Sobre 20</Link>
      </nav>

      <h2>Lista de Tarefas</h2>
      <input
        ref={inputRef}
        type="text"
        value={tarefa}
        onChange={(e) => setTarefa(e.target.value)}
        placeholder="Digite uma tarefa"
      />
      <button onClick={adicionarTarefa}>Adicionar</button>

      <ul>
        {tarefas.map((t, index) => (
          <li key={index}>{t}</li>
        ))}
      </ul>
    </div>
  );
};
