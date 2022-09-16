import TaskList from "./TaskList"
import data from "./data.json"
import { TasksInterface } from "./TasksInterface"
import { useState } from "react"

export default function App () {
    let [newTasks, setNewTasks] = useState<TasksInterface[]>(data.new)

    return (
        <main>
            <header>
                header
            </header>
            <section className="deals_lists-container">
                <TaskList title="Новые задачи" tasks={newTasks} />
                <TaskList title="Новые задачи" tasks={newTasks} />
                <TaskList title="Новые задачи" tasks={newTasks} />
                <TaskList title="Новые задачи" tasks={newTasks} />
            </section>
        </main>
    )
}