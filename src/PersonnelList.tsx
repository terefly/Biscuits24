import { nanoid } from "nanoid";
import { PersonnelInterface } from "./Interfaces";
import PersonnelUnit from "./PersonnelUnit";

interface Props {
    personnel: PersonnelInterface[]
}

export default function PersonnelList(props: Props) {
    return (
        <div className="personnelList">
            {props.personnel.map(unit => <PersonnelUnit key={nanoid()} unit={unit}/>)}
            
        </div>
    )
}