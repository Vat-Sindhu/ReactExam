import React from 'react'
import {Controller,Control,useFormContext} from 'react-hook-form'
import { TextField } from '@fluentui/react'
import '../Form/form.scss'
interface ITextFieldProps{
  name?:string|number|any,
  label?:string|number|any,
  placeholder?:string,
  control?:Control<any>,
  isRequired?:boolean,
  isdisabled?:boolean,
  typeOf?:string|number,
  defaultvalue?:any,
  register?:any,
  isReadOnly?:boolean
  

}
 const TextFieldForm = ({
  name,
  label,
  isRequired,
  isdisabled,
  isReadOnly,
  defaultvalue,
  placeholder,
  typeOf
}: ITextFieldProps) => {

 const {control,register}=useFormContext();

  return (
    <Controller
    control={control}
    name={name}
    render={({
      field,
      fieldState: { error, invalid, isTouched, },
    }) => {
      return (
        <>
          <div
            className={
              isRequired ? (error ? "errorGroup" : "errorGroupStar") : ""
            }
          > 
            <TextField
              type={typeOf === 'number'?"number":'text'}
              label={label}
              required={isRequired}
              disabled={isdisabled}
              readOnly={isReadOnly}
              defaultValue={defaultvalue}
              styles={{fieldGroup:{background:"#F0F0F0",border:0}}}
              placeholder={placeholder}
              {...field}
              errorMessage={error ? error.message : ""}
              className="form_element"
              />
              </div>
              </>
    
  )
 
}
    }
    />
  )
}

export default TextFieldForm