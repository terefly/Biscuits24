import { useState } from "react"
import { PersonnelInterface } from "./Interfaces"
import { nanoid } from "nanoid"

interface Props {
    closeModal: () => void,
    setPersonnel: React.Dispatch<React.SetStateAction<PersonnelInterface[]>>,
}


export default function NewPersonnelForm(props: Props) {
    let [newPersonnel, setNewPersonnel] = useState<PersonnelInterface>({
        id: nanoid(),
        name: '',
        lastname: '',
        phone: '',
    })
    
    function handleChange(field: string, value: string) {
        setNewPersonnel((prevState: PersonnelInterface) => ({
            ...prevState,
            [field]: value,
        }))
    }
    function handleClick() {
        props.setPersonnel(prevPersonnel => [...prevPersonnel, newPersonnel]);
        props.closeModal();
    }



    return (
        <form className="new-personnel-form">
            <input
                value={newPersonnel.name}
                onChange={e => handleChange('name', e.currentTarget.value)}
                type="text"
                placeholder="Имя"/>
                
            <input
                value={newPersonnel.lastname}
                onChange={e => handleChange('lastname', e.currentTarget.value)}
                type="text"
                placeholder="Фамилия"/>
                
            <input
                value={newPersonnel.phone}
                onChange={e => handleChange('phone', e.currentTarget.value)}
                type="text"
                placeholder="Номер телефона"/>
                
            <button
                onClick={handleClick}
                type="button">
                ДОБАВИТЬ
            </button>
        </form>
    )
}