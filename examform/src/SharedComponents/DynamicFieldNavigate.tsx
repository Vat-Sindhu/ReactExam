import React from 'react'
import TextFieldForm from './TextFieldForm'
import DropdownForm from './DropdownForm'

const DynamicFieldNavigate = (fieldName:string,item:any) => {
  switch (fieldName) {  
    case "DropdownForm":
        return <DropdownForm {...item} />;
    case "TextFieldForm":
        return <TextFieldForm {...item} />;
    default:
        return 'Component Missing';
}
}

export default DynamicFieldNavigate