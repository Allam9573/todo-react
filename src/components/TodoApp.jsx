import { useState } from "react"
import '../index.css'


const TodoApp = () => {

    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState([])

    const eliminarTask = (title) => {
        setTodos(todos.filter(item => item.title !== title))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (todo.length === 0) {
            return
        } else {
            const existeTask = todos.findIndex(item => item.title === todo)
            if (existeTask >= 0) {
                return
            } else {
                setTodos([...todos, {
                    id: todos.length + 1,
                    title: todo
                }])
                setTodo('')
            }
        }
    }
    return (
        <>
            <div className="todo-container">
                <form onSubmit={onSubmit} className="form-todo">
                    <input type="text" value={todo} placeholder="Titulo de tarea..." onChange={e => setTodo(e.target.value)} className="todo-input" />
                    <input type="submit" value="Crear Tarea" className="btn-create" />
                </form>

                {
                    todos.length === 0 ?
                        <h3 className="subtitle">No hay tareas pendientes</h3> :
                        <>
                            <h3 className="subtitle">Listado de tareas</h3>
                            {
                                todos.map(item => {
                                    return (
                                        <div className="todo-item" key={item.id}>
                                            <p>{item.title}</p>
                                            <div>
                                                <button className="btn-editar">Editar</button>
                                                <button onClick={() => eliminarTask(item.title)} className="btn-eliminar">Eliminar</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </>
                }
            </div>
        </>
    )
}
export { TodoApp }