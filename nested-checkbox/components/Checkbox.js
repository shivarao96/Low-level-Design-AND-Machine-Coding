export const Checkbox = ({label, checked, onChange}) => {
    return (
        <div>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                name={label}
            />
            <label htmlFor={label}>{label}</label>
        </div>
    )
}