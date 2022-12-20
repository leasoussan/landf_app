import { Input } from "@mui/material";

export const FormInputLabel = (props) => {
    const { name, label, type, value, onChange } = props;
    return (
        <>
            <div className="input_conatainer">
                <label htmlFor={name}>{label}{value}</label>
                <input
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                />
            </div>

        </>
    )
}