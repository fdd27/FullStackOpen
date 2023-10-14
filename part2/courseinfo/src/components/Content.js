import Part from "./Part"

const Content = ({parts}) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={parts[part.id-1]} />)}
        </div>
    )
}

export default Content