import { PersonnelInterface, DealsInterface } from "./Interfaces"
import { useState } from "react"
import { nanoid } from "nanoid"

interface Props {
    deal: DealsInterface
    handleDealEdit: (id: string, newValue: DealsInterface)=>void,
    closeModal: () => void,
    personnel: PersonnelInterface[],
    titles: {[key: string]: string}
}

export default function DealInfo(props: Props) {
    let options = Object.entries(props.titles)
    const deal = props.deal
    let [editedDeal, setEditedDeal] = useState<DealsInterface>(deal)
    let [isTitleEdited, setIsTitleEdited] = useState<boolean>(false)
    let [isPhoneEdited, setIsPhoneEdited] = useState<boolean>(false)
    let [isMoneyEdited, setIsMoneyEdited] = useState<boolean>(false)

    function handleChange(field: string, value: string) {
        setEditedDeal((prevState: DealsInterface) => ({
            ...prevState,
            [field]: (field === 'responsible' ?
                props.personnel.filter(unit => (unit.id === value))[0] :
                value)
        }))
    }
    function handleEditSubmit() {
        props.handleDealEdit(deal.id, editedDeal)
        props.closeModal()
    }
    
    return (
        <div className="deal-info">
            <h2>Сделка</h2>
            <h3>{isTitleEdited ? 
                <span>
                    <input type="text" value={editedDeal.title} onChange={(e) => handleChange('title', e.currentTarget.value)}/>
                    <button onClick={() => setIsTitleEdited(prevState => !prevState)}>X</button>
                </span> : 
                <span 
                    className="deal-info_editable"
                    onClick={() => setIsTitleEdited(prevState => !prevState)}>
                        {editedDeal.title}</span>}
            </h3>
            <p>{isPhoneEdited ? 
                <span>
                    <input type="text" value={editedDeal.phone} onChange={(e) => handleChange('phone', e.currentTarget.value)}/>
                    <button onClick={() => setIsPhoneEdited(prevState => !prevState)}>X</button>
                </span> : 
                <span 
                    className="deal-info_editable"
                    onClick={() => setIsPhoneEdited(prevState => !prevState)}>
                        Номер телефона: {editedDeal.phone ? editedDeal.phone : '-'}</span>}
            </p>
            <p>Бюджет: {isMoneyEdited ? 
                <span>
                    <input type="text" value={editedDeal.money} onChange={(e) => handleChange('money', e.currentTarget.value)}/>
                    <button onClick={() => setIsMoneyEdited(prevState => !prevState)}>X</button>
                </span> : 
                <span 
                    className="deal-info_editable"
                    onClick={() => setIsMoneyEdited(prevState => !prevState)}>
                        {editedDeal.money ? editedDeal.money: '0'}</span>}
            </p>
            <p>Ответственный:
                <select
                    value={editedDeal.responsible ?
                        (Object.keys(editedDeal.responsible).length > 0 ?
                            editedDeal.responsible.id :
                            undefined) :
                        undefined}
                    onChange={e => handleChange('responsible', e.currentTarget.value)}>
                        {props.personnel ? 
                            <><option value={undefined}>Без ответственного</option>
                            {props.personnel.map(unit => (
                                <option
                                    key={nanoid()}
                                    value={unit.id}>
                                        {`${unit.lastname} ${unit.name}`} </option>))}</> :
                            <option value={undefined}>СОТРУДНИКОВ НЕ НАЙДЕНО</option>
                        }
                </select>
            </p>
            <p>Стадия:  
            <select
                value={editedDeal.stage}
                onChange={e => handleChange('stage', e.currentTarget.value)}>
                    {options.map(option => (
                        <option
                            key={nanoid()}
                            value={option[0]}>
                                {option[1]}
                        </option>
                ))}
            </select>
            </p>
            <button onClick={handleEditSubmit}>Сохранить</button>
        </div>
    )
}