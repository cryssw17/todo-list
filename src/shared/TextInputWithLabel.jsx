import {forwardRef} from 'react';

 function TextInputWithLabel({
    elementId,
    onChange,
    labelText,
    value,
    type = "text",
    required = false,
}, ref) {
    return(
        <>
         <label htmlFor={elementId}>{labelText}</label>
         <input
             type={type}
             id={elementId}
             ref={ref}
             onChange={onChange} 
             value={value}
             required={required}
             />
        </>
   
    );
}

export default forwardRef(TextInputWithLabel);