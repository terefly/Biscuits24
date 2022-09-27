interface Props {
    setPage: React.Dispatch<React.SetStateAction<string>>
}

export default function Sidebar(props: Props) {
    return (
        <aside className="aside">
            <h3>Бисквитс 24</h3>
            <nav className="aside_nav">
                <ul className="aside_menu">
                    <li onClick={() => props.setPage('deals')}>СДЕЛКИ</li>
                    <li onClick={() => props.setPage('tasks')}>ЗАДАЧИ</li>
                    <li onClick={() => props.setPage('personnel')}>СОТРУДНИКИ</li>
                </ul>
            </nav>
        </aside>
    )
}