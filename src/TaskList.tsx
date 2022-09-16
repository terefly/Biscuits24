import Task from "./Task"
import { TasksInterface } from "./TasksInterface"

interface Props {
    title: string,
    tasks: TasksInterface[],
}

export default function TaskList(props: Props) {
    let moneySum: number = 0;
    for (let i:number = 0; i < props.tasks.length; i++) {
        moneySum += Number(props.tasks[i].money)
    }

    return (
        <article className="task-list">
            <h2>{props.title}</h2>
            <p>{moneySum} руб.</p>
            <div className="task-list_tasks-conainer">
                {props.tasks.map(task =>
                    <Task 
                        taskTitle={task.title}
                        taskMoney={Number(task.money)}
                        taskDeadline={task.deadline}
                        taskResponsible={task.responsible}
                    />
                )}
            </div>
        </article>
    )
}