import { useState, useEffect } from 'react'
import { v4 } from 'uuid';
import { format } from 'date-fns';

const Todos = () => {
    const [todos, setTodos] = useState(()=>{
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    })

    useEffect(()=>{
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])

    const [editTaskId, setEditTaskId] = useState(null)

    const [updatedTask, setUptadetTask] = useState('')


    const handleNewTask = (e) =>{
        e.preventDefault()

        const formatDate = e.target.date.value ? format(new Date(e.target.date.value), 'dd/MM/yyyy') : '';

        if(e.target.task.value.trim().length >= 1 && e.target.task.value.trim().length <= 90){
            const newTask = {
                id: v4(),
                task: e.target.task.value,
                date: formatDate,
                done: false
            }
            setTodos([
                ...todos,
                newTask
            ]);
        }

        e.target.task.value = '';
        e.target.date.value = '';
    }

    const handleDoneStatus = (id) =>{
        const updatedToDos = todos.map(todo=>{
            if(todo.id === id){
                return {...todo, done: !todo.done}
            }
            return todo
        })
        setTodos(updatedToDos)
    }

    const removeToDo = (id) =>{
        const userConfirmAlert = window.confirm("Sei sicuro? L'azione è irreversibile.")
        if(userConfirmAlert){
            const removedTodo = todos.filter((el) => el.id !== id)
            setTodos(removedTodo)
        }
    }

    const editTask = (e) => {
        e.preventDefault()

        if(e.target.updateTask.value.trim().length >= 1 && e.target.updateTask.value.trim().length <= 90){

            const updatedToDos = todos.map(todo => {
                if (todo.id === editTaskId) {
                    return { ...todo, task: updatedTask };
                }
                return todo;
            });
            setTodos(updatedToDos);
            setEditTaskId(null);
            setUptadetTask('');
        }
    }

    const toggleInput = (id, currentTask) => {
        setEditTaskId(id);
        setUptadetTask(currentTask);
    }

    const cancelEdit = () => {
        setEditTaskId(null);
        setUptadetTask('');
    }


    return (
        <>
            <form className="row justify-content-between align-items-center my-5" onSubmit={handleNewTask}>
                <div className="col-xl-8 col-sm-12 my-4">
                    <input className='rounded-4 w-100 py-2 px-4 my-input' type="text" name='task' placeholder='Add a new task...' />
                </div>
                <div className="col-xl-2 col-6 my-4">
                    <input className='rounded-4 w-100 py-2 px-4 my-input' type="date" name='date'/>
                </div>
                <div className="col-auto">
                    <button className='my-button text-white rounded-5 px-4 py-2 fw-bold'>Aggiungi task</button>
                </div>
            </form>
            <div className="todos-wrapper mb-5">
                <div className='todos-box py-3 px-5'>
                    {
                        todos.length === 0 ? 
                        <h3 className='my-font text-white py-5'>Sembra non ci siano Tasks per ora...</h3> : 
                        todos.map((elem, index)=>{
                            return (
                                <>
                                    <div className="row justify-content-between align-items-center border-bottom py-3">
                                        <div className="col-xl-8 col-sm-12 d-flex justify-content-between" key={elem.id}>
                                            {editTaskId === elem.id ? 
                                                <form onSubmit={editTask}>
                                                    <input
                                                        className='rounded-4 w-100 py-2 px-4 my-input-transparent'
                                                        type="text"
                                                        value={updatedTask}
                                                        onChange={(e) => setUptadetTask(e.target.value)}
                                                        name='updateTask'
                                                        placeholder='Aggiorna Task...'
                                                    />
                                                    <button type="submit" className='my-4 me-4 my-button text-white rounded-5 px-4 py-2 fw-bold'><i className="fa-solid fa-check text-white"></i></button>
                                                    <button onClick={() => cancelEdit()} type="submit" className='my-4 my-delete-button text-white rounded-5 px-4 py-2 fw-bold'><i className="fa-solid fa-x text-white"></i></button>
                                                </form> :
                                                <h5 className={`fw-bold ${elem.done === true ? 'task-done' : 'text-white'}`}>{index + 1}{')'} {elem.task}</h5>
                                            }
                                            {elem.date ? <h6 className={`my-date m-0 ${elem.done === true ? 'task-done' : 'text-white'}`}><i className="m-0 fa-regular my-date fa-calendar-days me-2"></i> {elem.date}</h6> : ''}
                                        </div>
                                        <div className='col-xl-3 col-sm-12 d-flex justify-content-between align-items-center'>
                                            <button onClick={()=>toggleInput(elem.id, elem.task)} className='px-3 py-2 my-button rounded-5 my-2'><i className="fa-solid fa-pen text-white"></i></button>
                                            <button onClick={()=>handleDoneStatus(elem.id)} className='px-3 py-2 my-button rounded-5 my-2 mx-5'><i className="fa-solid fa-check text-white"></i></button>
                                            <button onClick={()=>removeToDo(elem.id)} className='px-3 py-2 my-delete-button rounded-5 my-2'><i className="fa-solid fa-trash text-white"></i></button>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                        
                    }
                </div>
            </div>
        </>
    )
}

export default Todos



