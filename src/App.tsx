import Deals from "./Deals";
import Sidebar from "./Sidebar";
import Personnel from "./Personnel";
import { useState, useEffect } from "react";
import Tasks from "./Tasks";
import importedTitles from "./titles.json"
import { DealsInterface, PersonnelInterface, TaskInterface, TitlesInterface } from "./Interfaces"
import Modal from "./Modal"
import NewDealForm from "./NewDealForm"
import { nanoid } from "nanoid";

export default function App() {
    let [page, setPage] = useState('deals')
    let [personnel, setPersonnel] = useState<PersonnelInterface[]>([
        {
            id: nanoid(),
            name: 'Павел',
            lastname: 'Потехин',
            phone: '89995553322'
        },
    ])
    let [titles, setTitels] = useState<TitlesInterface>(importedTitles)
    let [deals, setDeals] = useState<DealsInterface[]>([
        {
            id: nanoid(),
            title: 'Иван',
            phone: '88005553535',
            money: '25000',
            tasks: [
                {
                    id: nanoid(),
                    isDone: true,
                    description: 'Связаться',
                    deadline: '2022-09-28T12:00',
                    responsible: {
                        id: nanoid(),
                        name: 'Павел',
                        lastname: 'Потехин',
                        phone: '89995553322'
                    }
                },
                
                {
                    id: nanoid(),
                    isDone: false,
                    description: 'Встретиться',
                    deadline: '2022-09-28T15:00',
                    responsible: {
                        id: nanoid(),
                        name: 'Павел',
                        lastname: 'Потехин',
                        phone: '89995553322'
                    }
                },
            ],
            responsible:{
                id: nanoid(),
                name: 'Павел',
                lastname: 'Потехин',
                phone: '89995553322'
            },
            stage: 'inWork',
        }
    ])

    let [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    let [modalContent, setModalContent] = useState<JSX.Element>(
        <NewDealForm
            titles={titles}
            personnel={personnel}
            handleNewDeal={handleNewDeal}
            closeModal={() => setIsModalOpen(false)}/> as JSX.Element
    )

    function handleNewDeal(newDeal: DealsInterface) {
        setDeals(prevDeals => [...prevDeals, newDeal])
    }
    function handleDealEdit(id:string, newValue: DealsInterface) {
        setDeals(prevDeals => prevDeals.map(deal => deal.id === id ? newValue : deal))
    }
    function handleNewTask(newTask: TaskInterface, deal: DealsInterface) {
        setDeals(prevDeals => {
            let newDeals = [...prevDeals]
            const newDealIndex = deals.indexOf(deal)
            newDeals[newDealIndex] = {
                ...newDeals[newDealIndex],
                tasks: [...newDeals[newDealIndex].tasks, newTask] 
            }
            return newDeals;
        })
    }
    function toggleTaskDone(taskId: string, deal: DealsInterface) {
        setDeals(prevState => {
            let changedTasks = [...deal.tasks].map(task => (task.id === taskId) ? {...task, isDone: !task.isDone} : task)
            let changedDeal = {...deal, tasks: changedTasks}
            let newState: DealsInterface[] = [...prevState].map(theDeal => (theDeal.id === deal.id) ? changedDeal : theDeal)
            return newState});
    }

    useEffect(() => { 
        if (personnel.length < 1 && JSON.parse(localStorage.getItem('personnel') || '{}').length > 0) {
                setPersonnel(JSON.parse(localStorage.getItem('personnel') || '{}'))
            }
        }, [])
    useEffect(() => {
        localStorage.setItem('personnel', JSON.stringify(personnel))
    }, [personnel])

    useEffect(() => {
        if (deals.length < 1 && JSON.parse(localStorage.getItem('deals') || '{}').length > 0) {
                setDeals(JSON.parse(localStorage.getItem('deals') || '{}'))
            }
        }, [])
    useEffect(() => {
        localStorage.setItem('deals' ,JSON.stringify(deals))
    }, [deals])


    function pageContent() {
        if(page === 'deals') return (
            <Deals
                toggleTaskDone={toggleTaskDone}
                handleNewTask={handleNewTask}
                deals={deals}
                personnel={personnel}
                setModalContent={setModalContent}
                setIsModalOpen={setIsModalOpen}
                handleDealEdit={handleDealEdit}
                handleNewDeal={handleNewDeal}
                titles={titles}/>)
        else if (page === 'tasks') return (
            <Tasks
                toggleTaskDone={toggleTaskDone}
                deals={deals}
                personnel={personnel}/>)
        else if (page === 'personnel') return (
            <Personnel
                titles={titles}
                personnel={personnel}
                setPersonnel={setPersonnel}
                setModalContent={setModalContent}
                setIsModalOpen={setIsModalOpen}/>)
    }
    return (
        <div className="app">
            <Sidebar setPage={setPage}/>
            {pageContent()}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {modalContent}
            </Modal>
        </div>
    )
}