import { useState, useRef } from 'react'

const Todos = () => {
    const [todos, setTodos] = useState([])

    const handleNewTask = (e) =>{
        e.preventDefault()

        if(e.target.task.value.trim().length > 3){
            const newTask = {
                id: new Date(Date.now()).getTime().toString(),
                task: e.target.task.value,
                done: false
            }
            setTodos([
                ...todos,
                newTask
            ]);
        }


        e.target.task.value = '';
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

    return (
        <>
            <form className="row justify-content-between align-items-center my-5" onSubmit={handleNewTask}>
                <div className="col-8">
                    <input className='rounded-4 w-100 py-2 px-4 my-input' type="text" name='task' placeholder='Add a new task...' />
                </div>
                <div className="col-auto">
                    <button className='my-button text-white rounded-5 px-4 py-2 fw-bold'>Aggiungi task</button>
                </div>
            </form>
            <div className='todos-box rounded-5 p-5'>
                {
                    todos.length === 0 ? 
                    <h2 className='my-font text-white'>Sembra non ci siano Tasks...</h2> : 
                    todos.map((elem)=>{
                        return (
                            <>
                                <div className="row justify-content-between">
                                    <div className="col-10">
                                        <h5 className={`fw-bold ${elem.done === true ? 'task-done' : 'text-white'}`} key={elem.id}>{elem.task}</h5>
                                    </div>
                                    <button onClick={()=>handleDoneStatus(elem.id)} className='col-1 my-button rounded-5'><i class="fa-solid fa-check text-white"></i></button>
                                </div>
                            </>
                        )
                    })
                    
                }
            </div>
        </>
    )
}

export default Todos



