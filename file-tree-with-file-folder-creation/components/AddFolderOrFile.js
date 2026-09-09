import { useState } from "react"

export const AddFolderOrFile = ({ addFileOrFolder }) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("file");

    const handleNameChange = (e) => {
        setName(e.target.value)        
    }

    const handleTypeChange = (e) => {
        setType(e.target.value)        
    }

    const handleAddFileOrFolder = (e) => {
        addFileOrFolder({name, type});
        setName("");
        setType("file");
    }

    return (
        <div>
            <div>
                <input type="text" value={name} onChange={handleNameChange} />
                &nbsp;
                <select value={type} onChange={handleTypeChange}>
                    <option value="file">File</option>
                    <option value="folder">Folder</option>
                </select>
            </div>
            <br />
            <button onClick={handleAddFileOrFolder}>Add</button>
        </div>
    )
}