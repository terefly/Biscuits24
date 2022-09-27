import { TitlesInterface, PersonnelInterface } from "./Interfaces"
import NewPersonnelForm from "./NewPersonnelForm"
import PersonnelList from "./PersonnelList"

interface Props {
    personnel: PersonnelInterface[],
    setPersonnel: React.Dispatch<React.SetStateAction<PersonnelInterface[]>>,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setModalContent: React.Dispatch<React.SetStateAction<JSX.Element>>,
    titles: TitlesInterface,
}
export default function Personnel(props: Props) {
    function summonNewPersonnelForm(){
        props.setModalContent(
            <NewPersonnelForm
                setPersonnel={props.setPersonnel}
                closeModal={() => props.setIsModalOpen(false)}/> as JSX.Element
        )
        props.setIsModalOpen(true)
    }
    return (
        <main className="personnel">
            <header className="personnel_header">
                <h1>СОТРУДНИКИ</h1>
                <button onClick={summonNewPersonnelForm}>ДОБАВИТЬ</button>
            </header>
            <PersonnelList personnel={props.personnel}/>
        </main>
    )
}