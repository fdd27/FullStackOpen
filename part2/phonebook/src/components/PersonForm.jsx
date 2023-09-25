const PersonForm = ({ handleAdd, handleNameChange, handleNumberChange }) => {
    return (
        <form onSubmit={handleAdd}>
            <div>
                name: <input id="name" onChange={handleNameChange} />
            </div>
            <div>
                number: <input id="number" onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm