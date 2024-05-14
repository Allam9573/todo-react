import { useState } from "react"
import '../index.css'


const TodoApp = () => {

    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState([])
    const [searchText, setSearchText] = useState('')

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
    const results = todos.filter(item => {
        return item.title.toLowerCase().includes(searchText.toLowerCase())
    })
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
                            <input type="search" placeholder="Buscar tarea..." value={searchText} onChange={e => setSearchText(e.target.value)} className="search" id="" />
                            {
                                results.length === 0 ?
                                    <h3 className="empty-results">No hay resultados</h3> :
                                    results.map(item => {
                                        return (
                                            <div className="todo-item" key={item.id}>
                                                <p className="todo-title">{item.title}</p>
                                                <div className="btn-container">
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