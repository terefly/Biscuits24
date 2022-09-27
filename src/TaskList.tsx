import { nanoid } from "nanoid"
import { TaskInterface} from "./Interfaces"
import Task from "./Task"

interface Props {
    tasks: TaskInterface[],
    toggleTaskDone: (taskId: string) => void,
}

export default function TaskList(props: Props) {
    return (
        <main className="task-list">
            {props.tasks.map(task => (
                <Task
                    key={nanoid()}
                    toggleTask={() => props.toggleTaskDone(task.id)}
                    task={task}/>))}</main>)}