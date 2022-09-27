import { DealsInterface, TaskInterface } from "./Interfaces"

interface Props {
    deal: DealsInterface,
    summonDealInfo: (deal: DealsInterface) => void,
}

export default function Deal (props: Props) {
    const deal = props.deal
    return (
        <div className="deal" onClick={() => props.summonDealInfo(deal)}>
            <h3>{deal.title}</h3>
            <p>{deal.phone}</p>
            <p>{deal.money ? deal.money : 0} руб.</p>
            <p>{deal.responsible  ? 
                (Object.keys(deal.responsible).length > 0 ?
                    `${deal.responsible.lastname} ${deal.responsible.name}` :
                    "НЕТ ОТВЕТСТВЕННОГО") :
                "НЕТ ОТВЕТСТВЕННОГО"}</p>
        </div>
    )
}