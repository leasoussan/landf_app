import React, { useEffect } from 'react';
import { SwatchesPicker } from 'react-color';
import { SketchPicker } from 'react-color';



const  Colors =(props)=> {
  const [color, SetColor ]= React.useState('')

  useEffect(()=>{
    console.log(props.SetColor);

  },[])

const handleChangeComplete = (color) => {
    console.log("color", color);
    props.selected_color(color)
  };

    return (
        <>
    
    <SketchPicker
        color_select={ color}
        onChangeComplete={ handleChangeComplete }
      />
      </>
    );
  }




export default Colors