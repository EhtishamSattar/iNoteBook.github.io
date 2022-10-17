import React from 'react';

export default function Alert(props) {
  const capitalize=(word)=>{
    if(word==="danger")
    {
      word="error";
    }
    // let lower=word.toLowerCase();
    // return lower.charAt(0).toUpperCase() + word.slice(1);
    return word.charAt(0).toUpperCase() + word.slice(1);
     
  }
  return (
    
    //! here props.alert is used with the and operator ... if props.alert is not Null
    //! means if it is true,then the further code will execute

    
      //! props.alert javascript hai tu isko hm brakets me likhy ghy
    <>
    <div style={{height:"50px"}}>
    {props.alert && 
      <div className={`alert alert-${props.alert.typ} alert-dismissible fade show `} role="alert">
        <strong>{capitalize(props.alert.typ)} ! </strong> {props.alert.msg}
    </div>}
      </div>
    </>
  );
}

