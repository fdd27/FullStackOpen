/* eslint-disable react/display-name */
import { useState, forwardRef, useImperativeHandle } from "react"

const Toggleable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState('')

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => { setVisible(!visible) }

    useImperativeHandle(refs, () => {
        return { toggleVisibility }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})

export default Toggleable