import { useReducer } from "react"
import ReactDom from "react-dom"

interface Props {
    children: JSX.Element,
    isOpen: boolean,
    onClose: () => void,
}

export default function Modal(props: Props) {
    let [ignored, forseRefresh] = useReducer(x => x + 1, 0)
    if (!props.isOpen) return null

    else {
        return ReactDom.createPortal(
            <>
                <div className="overlay" onClick={props.onClose}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        {props.children}
                    </div>
                </div>
            </>,
            (document.getElementById('portal') as HTMLElement)
        )
    }

}