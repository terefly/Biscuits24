import ListContainer from "./ListsContainer"
import NewDealForm from "./NewDealForm"
import { PersonnelInterface, DealsInterface, TitlesInterface, TaskInterface } from "./Interfaces"
import DealEdit from "./DealEdit"

interface Props {
    deals: DealsInterface[],
    personnel: PersonnelInterface[],
    toggleTaskDone: (taskId: string, deal: DealsInterface) => void,
    handleDealEdit: (id: string, newValue: DealsInterface) => void,
    handleNewDeal: (newDeal: DealsInterface, responsibleId: string) => void,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setModalContent: React.Dispatch<React.SetStateAction<JSX.Element>>,
    handleNewTask: (newTask: TaskInterface, deal: DealsInterface) => void,
    titles: TitlesInterface,
}

export default function Deals (props: Props) {
    function summonNewDealForm(){
        props.setModalContent(
            <NewDealForm
                titles={props.titles}
                personnel={props.personnel}
                handleNewDeal={props.handleNewDeal}
                closeModal={() => props.setIsModalOpen(false)}/> as JSX.Element
        )
        props.setIsModalOpen(true)
    }

    function summonDealInfo(deal: DealsInterface) {
        props.setModalContent(
            <DealEdit
                toggleTaskDone={props.toggleTaskDone}
                personnel={props.personnel}
                titles={props.titles}
                deal={deal}
                handleDealEdit={props.handleDealEdit}
                closeModal={() => props.setIsModalOpen(false)}
                handleNewTask={props.handleNewTask}/> as JSX.Element
        )
        props.setIsModalOpen(true)
    }


    return (
        <main className="deals">
            <header className="deals_header">
                <h1>СДЕЛКИ</h1>
                <button onClick={summonNewDealForm}>ДОБАВИТЬ</button>
            </header>
            <ListContainer titles={props.titles} deals={props.deals} summonDealInfo={summonDealInfo}/>
        </main>
    )
}