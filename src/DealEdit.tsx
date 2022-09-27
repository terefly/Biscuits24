import { useState } from "react";
import DealFeed from "./DealFeed";
import DealInfo from "./DealInfo";
import { DealsInterface, PersonnelInterface, TaskInterface } from "./Interfaces";

interface Props {
    deal: DealsInterface,
    handleDealEdit: (id: string, newValue: DealsInterface)=>void,
    closeModal: () => void,
    personnel: PersonnelInterface[],
    titles: {[key: string]: string},
    handleNewTask: (newTask: TaskInterface, deal: DealsInterface) => void,
    toggleTaskDone: (taskId: string, deal: DealsInterface) => void,
}

export default function DealEdit(props: Props) {
    return (
        <div className="deal-edit">
            <DealInfo
                personnel={props.personnel}
                titles={props.titles}
                deal={props.deal}
                handleDealEdit={props.handleDealEdit}
                closeModal={props.closeModal}/> 
            <DealFeed
                toggleTaskDone={props.toggleTaskDone}
                deal={props.deal}
                personnel={props.personnel}
                handleNewTask={props.handleNewTask}/>
        </div>
    )
}