import { useEffect, useState } from "react"
import { DealsInterface, PersonnelInterface, TaskInterface, TaskListConfig } from "./Interfaces"
import NewTaskForm from "./NewTaskForm"
import TaskList from "./TaskList"

interface Props {
    handleNewTask: (newTask: TaskInterface, deal: DealsInterface) => void,
    personnel: PersonnelInterface[],
    deal: DealsInterface,
    toggleTaskDone: (taskId: string, deal: DealsInterface) => void,
}

export default function DealFeed(props: Props) {
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

    let [passedDeal, setPassedDeal] = useState<DealsInterface>(props.deal)
    function handleNewTask(newTask: TaskInterface, deal: DealsInterface) {
        props.handleNewTask(newTask, deal)
        setPassedDeal(prev => ({
            ...prev,
            tasks: [...prev.tasks, newTask]
        }))
    }

    let [displayedTasks, setDisplayedTasks] = useState<TaskInterface[]>(passedDeal.tasks)
    useEffect(() => {
        setDisplayedTasks(passedDeal.tasks)
        if (config.showOnlyLateTasks) {
            const curTime = new Date();
            setDisplayedTasks(prev => [...prev].filter(task => (+Date.parse(task.deadline) < +curTime)))
        }
        if (config.showOnlyNotComlited) {
            setDisplayedTasks(prev => [...prev].filter(task => !task.isDone))
        }
    }, [config, passedDeal])

    function toggleTaskDone(taskId: string) {
        props.toggleTaskDone(taskId, props.deal)
        setPassedDeal(prev => {
            let changedTasks = [...prev.tasks].map(task => (task.id === taskId) ? {...task, isDone: !task.isDone} : task)
            let changedDeal = {...prev, tasks: changedTasks}
            return changedDeal;
        });
    }
    



    return (
        <div className="deal-feed">
            <div className="new-task-form">
                <NewTaskForm
                    deal={props.deal}
                    personnel={props.personnel}
                    handleNewTask={handleNewTask}/>
            </div>
            <nav className="deal-feed_nav">
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
            <TaskList
                tasks={displayedTasks}
                toggleTaskDone={toggleTaskDone} />
        </div>
    )
}