import { useCallback, useMemo } from "react";
import { useFormBuilderContext } from "../providers/FormBuilderContext"

export const FormRightPanel = () => {
    const { formFields } = useFormBuilderContext();

    const onSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const formData = new FormData(e.target);
        const data = {};

        for (const [key, value] of formData.entries()) {
            if (data[key]) {
                data[key] = Array.isArray(data[key])
                    ? [...data[key], value]
                    : [data[key], value];
            } else {
                data[key] = value;
            }
        }

        console.log(data);
    }

    const generateFormFields = useCallback(
        ({ fieldName, fieldLabel, fieldOptions, type }) => {
            switch (type) {
                case "text":
                    return (
                        <div>
                            <label htmlFor={fieldName}>{fieldLabel}</label>
                            <input type="text" name={fieldName} />
                        </div>
                    );
                case "number":
                    return (
                        <div>
                            <label htmlFor={fieldName}>{fieldLabel}</label>
                            <input type="number" name={fieldName} />
                        </div>
                    );
                case "email":
                    return (
                        <div>
                            <label htmlFor={fieldName}>{fieldLabel}</label>
                            <input type="email" name={fieldName} />
                        </div>
                    );
                case "textarea":
                    return (
                        <div>
                            <label htmlFor={fieldName}>{fieldLabel}</label>
                            <textarea name={fieldName} />;
                        </div>
                    );
                case "checkbox": {
                    const options = fieldOptions.split(",");
                    const checkboxes = options.map((e) => (
                        <div>
                            <input key={e} type="checkbox" name={fieldName} value={e} />
                            <label>{e}</label>
                        </div>
                    ));

                    return (
                        <div>
                            <label htmlFor={fieldName}>{fieldLabel}</label>
                            {checkboxes}
                        </div>
                    );
                }
                case "radio": {
                    const options = fieldOptions.split(",");
                    const radioBoxes = options.map((e) => (
                        <div>
                            <input key={e} type="radio" name={fieldName} value={e} />
                            <label>{e}</label>
                        </div>
                    ));

                    return (
                        <div>
                            <label htmlFor={fieldName}>{fieldLabel}</label>
                            {radioBoxes}
                        </div>
                    );
                }
                case "select": {
                    const options = fieldOptions.split(",");
                    const selectOptions = options.map((e) => (
                        <option value={e}>{e}</option>
                    ));

                    return (
                        <div>
                            <label htmlFor={fieldName}>{fieldLabel}</label>
                            <select name={fieldName}>
                                <option value="">Select</option>
                                {selectOptions}
                            </select>
                        </div>
                    );
                }
                default:
                    return <input type="text" name="default-field" />;
            }
        },
        []
    );

    const formFieldAsHTML = useMemo(() => {
        return formFields.map((e, i) => generateFormFields(e));
    }, [formFields, generateFormFields]);

    return (
        <div className="form-right-panel">
            <form onSubmit={onSubmit} className="form-preview">
                {formFieldAsHTML}
                <div className="submit-btn-area">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}