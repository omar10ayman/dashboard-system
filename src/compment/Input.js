const Input =({type ,value,handlechange,placeHolder,id,maxLength})=>{
    return(
        <input className="w-50 empty" style={{
            height:"50px"
        }} type={type} id={id} defaultValue={value} onChange={handlechange} placeholder={placeHolder} maxLength={maxLength} />
    )
}
export default Input;