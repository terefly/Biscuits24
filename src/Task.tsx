interface Props {
    taskTitle: string,
    taskMoney: number,
    taskResponsible: string,
    taskDeadline: string,
}

export default function Task (props: Props) {
    return (
        <div className="task">
            <h3>{props.taskTitle}</h3>
            <p>{props.taskMoney} руб.</p>
            <p>{props.taskResponsible}</p>
            <p>{props.taskDeadline}</p>
        </div>
    )
}