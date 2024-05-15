import { useState, useEffect } from "react"
import '../index.css'
import { Todo } from "./Todo"


const TodoApp = () => {

    const initialTodoList = () => {
        const localStorageTodos = localStorage.getItem('todoList')
        return localStorageTodos ? JSON.parse(localStorageTodos) : []
    }

    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState(initialTodoList)
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todos))
    }, [todos])

    const updateTodo = (id, newTitle) => {
        const updateTodos = [...todos]
        const index = updateTodos.findIndex(item => item.id === id)
        updateTodos[index].title = newTitle
        setTodos(updateTodos)
    }
    const eliminarTask = (title) => {
        const confirmDelete = window.confirm(`¿Estás seguro de que quieres eliminar la tarea "${title}"?`);
        if (confirmDelete) {
            const newTodos = [...todos]
            setTodos(todos.filter(item => item.title !== title))
        }
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
                                                <Todo
                                                    item={item}
                                                    eliminarTask={eliminarTask}
                                                    updateTodo={updateTodo}
                                                />
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