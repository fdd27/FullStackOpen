const Person = ({ person, deletePerson}) => {
    return (
        <div className="row">
            <p>{person.name} {person.phone}</p>
            <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
        </div>
    )
}

export default Person