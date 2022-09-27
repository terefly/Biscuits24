import DealList from "./DealList"
import { DealsInterface } from "./Interfaces"
import { nanoid } from "nanoid"


interface Props {
    titles: {[key: string]: string},
    deals: DealsInterface[],
    summonDealInfo: (deal: DealsInterface) => void
}

export default function ListContainer(props: Props) {
    let coloms = Object.entries(props.titles)
    return (
        <section className="deals_lists-container">
            {coloms.map(colom => (
                <DealList
                    key={nanoid()}
                    summonDealInfo={props.summonDealInfo}
                    title={colom[1]}
                    deals={props.deals.filter(deal => deal.stage === colom[0])}/>
            ))}
        </section>
    )
}