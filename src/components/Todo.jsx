import { useState } from "react"

const Todo = ({ item, eliminarTask, updateTodo }) => {

    const [isEdit, setIsEdit] = useState(false)

    const FormEdit = () => {
        const [newTitle, setNewTitle] = useState(item.title)
        const handleChangeTitle = (e) => {
            setNewTitle(e.target.value)

        }
        const handleClickUpdateTodo = (e) => {
            e.preventDefault()
            updateTodo(item.id, newTitle)
            setIsEdit(false)
        }
        return (
            <>
                <form action="" className="form-edit">
                    <input type="text" placeholder="Editar titulo" className="input-edit" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
                    <input type="submit" onClick={handleClickUpdateTodo} className="btn-edit" value="Actualizar" />
                </form>
            </>
        )
    }
    const TodoElement = () => {
        return (
            <>
                <p className="todo-title">{item.title}</p>
                <div className="btn-container">
                    <button className="btn-editar" onClick={() => setIsEdit(true)}>Editar</button>
                    <button onClick={() => eliminarTask(item.title)} className="btn-eliminar">Eliminar</button>
                </div>
            </>
        )
    }

    return (
        <>
            {isEdit ? <FormEdit /> : <TodoElement />}
        </>
    )
}
export { Todo }