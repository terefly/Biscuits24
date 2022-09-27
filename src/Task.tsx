import { TaskInterface } from "./Interfaces"

interface Props {
    task: TaskInterface
    toggleTask: () => void,
}

export default function Task(props: Props) {
    return (
        <div className={`task ${props.task.isDone && 'done'}`}>
                <h3 className="task-item">{props.task.description}</h3>
                <p className="task-item">Срок: {props.task.deadline}</p>
                <p className="task-item">{`Ответственный: ${props.task.responsible ? `${props.task.responsible.name} ${props.task.responsible.lastname}` : "не закреплен"}`}</p>
                <input
                    type='checkbox'
                    onChange={props.toggleTask}
                    checked={props.task.isDone}/>
                        </div>

    )
}