import Deal from "./Deal"
import { DealsInterface } from "./Interfaces"
import { nanoid } from "nanoid"

interface Props {
    title: string,
    deals: DealsInterface[],
    summonDealInfo: (deal: DealsInterface) => void
}

export default function DealList(props: Props) {
    let moneySum: number = 0;
    for (let i:number = 0; i < props.deals.length; i++) {
        moneySum += Number(props.deals[i].money)
    }

    return (
        <article className="deal-list">
            <h2 className="deal-list_title">{props.title}</h2>
            <p>{moneySum} руб.</p>
            <div className="deal-list_deals-conainer">
                {props.deals.map(deal =>
                    <Deal
                        key={nanoid()}
                        summonDealInfo={props.summonDealInfo}
                        deal={deal}
                    />
                )}
            </div>
        </article>
    )
}