


class CheckItemMatch extends React.Component{
    constructor(){
        super();
        this.state={
            lost_item:'',
            found_item:'',
        }
    }

    componentDidMount(){
        console.log("this.state item match ",this.state);
        console.log("this.porps item match ",this.props);

    }





    render(){
        return(
            <>
            </>
        )
    }
}

export default CheckItemMatch

// // const checkNotesWords = (notes) => {
// //     const spliter = notes.split(',');
// //     console.log('checking words', spliter)

// // }


// export const CheckItemMatch = async (req, res) => {
//     try {
//         const getLostItem = getFoundItemPool()
//     }
//     catch (e) {
//         console.log(e);
    // }

    // const {category_id,sub_category, note, is_found, resolved , user_id} =data

    // const getFoundItemsGlobal = async () => {
    //     console.log(category_id, sub_category, note, is_found, resolved, user_id);
        // try{
        //     const getLostDatabase = await db('item')
        //             .select('*')
        //             .where(
        //                 {category_id:category_id},
        //                 {sub_category:sub_category},
        //                 // {note: checkNotesWords(note)},
        //                 {is_lost:true}, 
        //                 {resolved:false},
        //                 {user_id: !user_id}
        //                  )
        //             .returning('*')   
        //     const data = await getLostDatabase.json()
        //     console.log(data);        

        // }
        // catch(e){
        //     console.log(e);
        // }

    // };
    // getFoundItemsGlobal()

}
