import { Input } from "@mui/material";

export const FormInputLabel = (props)=>{
    const {id, label, type, value} = props;

    return(
        <>
        <label htmlFor={id}>{label}{value}</label>
        <Input></Input>
        <input
            id ={id}
            type={type}
            value={value}
        />
         

        </>
    )
}