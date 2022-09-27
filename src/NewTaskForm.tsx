import { nanoid } from "nanoid"
import { useState } from "react"
import { DealsInterface, PersonnelInterface, TaskInterface } from "./Interfaces"

interface Props {
    handleNewTask: (newTask: TaskInterface, deal: DealsInterface) => void,
    personnel: PersonnelInterface[],
    deal: DealsInterface,
}

export default function NewTaskForm(props: Props) {
    let [newTask, setNewTask] = useState<TaskInterface>({
        id: nanoid(),
        isDone: false,
        description: '',
        deadline: new Date().toISOString().substring(0, 16),
        responsible: props.personnel[0] ? props.personnel[0] : undefined,
    })
    function handleChange(field: string, value: string) {
        setNewTask(prevState => ({
            ...prevState,
            [field]: 
                (field === 'responsible') ? props.personnel.filter(unit => (unit.id === value))[0] :
                value
        }))
    }

    return (
        <div className="new-task"> 
            <h3>Новая задача</h3>
            <form className="new-task-form">
                <input
                    type="text"
                    placeholder="Описание"
                    value={newTask.description}
                    onChange={(e) => handleChange('description', e.currentTarget.value)}/>
                <input
                    type="datetime-local" 
                    value={newTask.deadline}
                    onChange={(e) => handleChange('deadline', e.currentTarget.value)}/>
                <select
                    value={newTask.responsible ? newTask.responsible.id : undefined}
                    onChange={e => handleChange('responsible', e.currentTarget.value)}>
                        {props.personnel ? 
                            <><option value={undefined}>Без ответственного</option>
                            {props.personnel.map(unit => (
                                <option
                                    key={nanoid()}
                                    value={unit.id}>
                                        {`${unit.lastname} ${unit.name}`} </option>))}</>:
                            <option value={undefined}>Сотрудников не найдено</option>}
                                </select>
                <button
                    onClick={() => props.handleNewTask(newTask, props.deal)}
                    type="button">
                        Добавить</button></form></div>
    )
}