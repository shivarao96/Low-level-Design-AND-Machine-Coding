import { createContext, useCallback, useContext, useMemo, useState } from "react";

const FromBuilderContext = createContext();

export const useFormBuilderContext = () => {
    const context = useContext(FromBuilderContext);
    if (!context) {
        throw new Error("Form Builder context having invalid reference !");
    }
    return context;
}

export const FormProvider = ({ children }) => {

    const [formFields, setFormFields] = useState([]);

    const addFormFields = useCallback((newField) => {
        setFormFields((prev) => [...prev, newField]);
    }, []);

    const removeFormFields = useCallback((index) => {
        setFormFields((prev) => prev.filter((_, i) => i !== index));
    }, [])

    const value = useMemo(() => ({
        formFields,
        addFormFields,
        removeFormFields
    }), [formFields, addFormFields, removeFormFields])

    return (
        <FromBuilderContext.Provider value={value}>
            {children}
        </FromBuilderContext.Provider>
    )
}