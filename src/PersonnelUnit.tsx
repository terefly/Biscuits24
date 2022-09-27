import { PersonnelInterface } from "./Interfaces";

interface Props {
    unit: PersonnelInterface
}

export default function PersonnelUnit(props: Props) {
    const unit = props.unit
    return (
        <div className="personnelUnit">
            {`${unit.name} ${unit.lastname} ${unit.phone}`}
        </div>
    )
}