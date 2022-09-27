import { useState } from "react"
import { PersonnelInterface, DealsInterface } from "./Interfaces"
import { nanoid } from "nanoid"

interface Props {
    handleNewDeal: (newDeal: DealsInterface, stage: string) => void,
    closeModal: () => void,
    personnel: PersonnelInterface[],
    titles: {[key: string]: string},
}


export default function NewDealForm(props: Props) {
    let dealOptions = Object.entries(props.titles)
    let [newDealInputs, setNewDealInputs] = useState<DealsInterface>({
        id: nanoid(),
        phone: '',
        title:'',
        money: '',
        tasks: [],
        responsible: props.personnel[0] ? props.personnel[0] : undefined,
        stage: 'new',
    })
    function handleChange(field: string, value: string) {
        setNewDealInputs((prevState: DealsInterface) => ({
            ...prevState,
            [field]: (field === 'responsible' ?
                props.personnel.filter(unit => (unit.id === value))[0] :
                value)
        }))
    }
    function handleClick() {
        props.handleNewDeal(newDealInputs, newDealInputs.stage);
        props.closeModal();
    }


    return(
        <div className="new-deal">
        <h3>Новая сделка</h3>
        <form className="new-deal-form">
            <input
                value={newDealInputs.title}
                onChange={e => handleChange('title', e.currentTarget.value)}
                type="text"
                placeholder="Сделка"/>
                
            <input
                value={newDealInputs.phone}
                onChange={e => handleChange('phone', e.currentTarget.value)}
                type="text"
                placeholder="Номер телефона"/>
            <input
                value={newDealInputs.money}
                onChange={e => handleChange('money', e.currentTarget.value)}
                type="text"
                placeholder="Бюджет" />
            <select
                value={newDealInputs.responsible ? newDealInputs.responsible.id : undefined}
                onChange={e => handleChange('responsible', e.currentTarget.value)}>
                    {props.personnel ? 
                        <><option value={undefined}>Без ответственного</option>
                        {props.personnel.map(unit => (
                            <option
                                key={nanoid()}
                                value={unit.id}>
                                    {`${unit.lastname} ${unit.name}`} </option>))}</>:
                        <option value={undefined}>Сотрудников не найдено</option>
                    }
            </select>
            <select
                value={newDealInputs.stage}
                onChange={e => handleChange('stage', e.currentTarget.value)}>
                    {dealOptions.map(option => (
                        <option
                            key={nanoid()}
                            value={option[0]}>
                                {option[1]}
                        </option>
                ))}
            </select>
            <button
                onClick={handleClick}
                type="button">
                ДОБАВИТЬ
            </button>
        </form></div>
    )
}