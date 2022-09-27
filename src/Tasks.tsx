import { nanoid } from "nanoid"
import { useState } from "react"
import { DealsInterface, PersonnelInterface, TaskInterface, TaskListConfig } from "./Interfaces"
import TaskList from "./TaskList"

interface Props {
    personnel: PersonnelInterface[],
    deals: DealsInterface[],
    toggleTaskDone: (taskId: string, deal: DealsInterface) => void,
}

export default function Tasks(props: Props) {
    let [config, setConfig] = useState<TaskListConfig>({
        showOnlyLateTasks: false,
        showOnlyNotComlited: false,
    })
    function toggleConfigField(field: string) {
        const confirmField = field as keyof typeof config
        setConfig(prev => ({
                ...prev,
                [confirmField]: !prev[confirmField]
        }))
    }

    function sortTasks(tasks: TaskInterface[]) {
        let returned = tasks;
        if (config.showOnlyLateTasks) {
            const curTime = new Date();
            returned = [...returned].filter(task => (+Date.parse(task.deadline) < +curTime))
        }
        if (config.showOnlyNotComlited) {
            returned = [...returned].filter(task => !task.isDone)
        }
        return returned;
    }

    return (
        <main className="tasks">
            <header className="tasks-header">
                <h1>ЗАДАЧИ</h1>
                <nav>
                    <label htmlFor="onlyLate">Только просроченные</label>
                    <input
                        type="checkbox"
                        name="onlyLate"
                        onChange={() => toggleConfigField('showOnlyLateTasks')}
                        checked={config.showOnlyLateTasks}/>
                    <label htmlFor="onlyNotDone">Только незавершенные</label>
                    <input
                        type="checkbox"
                        name="onlyNotDone"
                        onChange={() => toggleConfigField('showOnlyNotComlited')}
                        checked={config.showOnlyNotComlited}/>
                </nav>
            </header>
            {props.deals.map(deal => (
                <TaskList
                    key={nanoid()}
                    tasks={sortTasks(deal.tasks)}
                    toggleTaskDone={(id: string) => props.toggleTaskDone(id, deal)}/>))}
        </main>
    )
}