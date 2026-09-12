import { useEffect, useState } from "react";
import {useFormBuilderContext} from "../providers/FormBuilderContext"

const fieldsType = [
    "text",
    "number",
    "email",
    "textarea",
    "radio",
    "checkbox",
    "select",
];

const fieldTypeInitialOpenStates = fieldsType.reduce((a, b) => ({ ...a, [b]: false }), {})

const FieldConfiguration = ({ type, onSubmit }) => {
    const showOptions = ["radio", "checkbox", "select"].includes(type);

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        onSubmit(data);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="fieldLabel">Field label:</label>
                <input type="text" name="fieldLabel" required />
            </div>
            <div>
                <label htmlFor="fieldName">Field name:</label>
                <input type="text" name="fieldName" required />
            </div>
            {showOptions && (
                <div>
                    <label htmlFor="fieldOptions">Options (,) separated:</label>
                    <input type="text" name="fieldOptions" required />
                </div>
            )}

            <button type="submit">Add</button>
        </form>
    )
}

export const FormLeftPanel = () => {
    
    const {formFields, addFormFields} = useFormBuilderContext();
    const [fieldTypeOpen, setFieldTypeOpen] = useState(fieldTypeInitialOpenStates);

    const toggleFieldAccordion = (type) => {
        const fieldTypeOpenClone = {...fieldTypeOpen};
        for (let e in fieldTypeOpenClone) {
            if (e===type) {
                fieldTypeOpenClone[e] = !fieldTypeOpenClone[e];
            } else {
                fieldTypeOpenClone[e] = false;
            }
        }
        setFieldTypeOpen(fieldTypeOpenClone);
    }

    const onFormFieldAdd = (fieldDetails, type) => {
        addFormFields({...fieldDetails, type});
    }

    useEffect(() => {
        console.log(formFields);
    }, [formFields])

    return (
        <div className="form-inputs">
            {
                fieldsType.map((e) => 
                    <div key={e}>
                        <div
                            className="acc-header"
                            onClick={() => {
                                toggleFieldAccordion(e)
                            }}
                        >
                            <span>{e}</span>
                            <span>{fieldTypeOpen[e] ? '--' : '+'}</span>
                        </div>

                        {fieldTypeOpen && (
                            <div className="field-config">
                                <FieldConfiguration
                                    type={e}
                                    onSubmit={(fieldDetails) => {
                                        onFormFieldAdd(fieldDetails, e)
                                    }}
                                />
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    )
}