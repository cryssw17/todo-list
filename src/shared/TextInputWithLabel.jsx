export default function TextInputWithLabel({
    elementId,
    ref,
    onChange,
    labelText,
    value,
}) {
    return(
        <>
         <label htmlFor={elementId}>{labelText}</label>
         <input
             type="text"
             id={elementId}
             ref={ref}
             onChange={onChange} 
             value={value}
             />
        </>
   
    );
}