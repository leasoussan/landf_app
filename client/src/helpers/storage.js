export const addToLocatStorage = (key, value)=>{
    console.log("key", key);
    console.log("value", value);
    window.localStorage.setItem(key, JSON.stringify(value))

}

export const getFromLocalStorage = (key)=>{
    return JSON.parse(window.localStorage.getItem(key))
}

// REDUX storage to userID and other Details

// import { useState } from 'react';

// export const useLocalStorage = () => {
//   const [value, setValue] = useState<string | null>(null);

//   const setItem = (key: string, value: string) => {
//     localStorage.setItem(key, value);
//     setValue(value);
//   };


//   const getItem = (key: string) => {
//     const value = localStorage.getItem(key);
//     setValue(value);
//     return value;
//   };

//   const removeItem = (key: string) => {
//     localStorage.removeItem(key);
//     setValue(null);
//   };

//   return { value, setItem, getItem, removeItem };
// };