import React from "react";
import { connect } from "react-redux";

class CheckItemMatch extends React.Component{
    constructor(props){
        super(props);
        this.state={
            item_details:[],
            type:'',
            lost_item_pool :[],
           found_item_pool:[],
           match: false, 

        }
    }
    // item_router.get('/found_item_pool/:user_id/:category_id/:sub_cat_id/:found_date/:location/', getFoundItemPool)

    componentDidMount(){
        console.log(this.props);
        const get_comparative_db =()=>{
            const type = this.props.type
            switch (type) {
                case 'lost':
                    this.setState({type:type})  ;
                    this.setState({item_details:this.props.item_data})
                    this.setState({found_item_pool:this.props.user_found_items})
                    break;
                case 'found':
                    this.setState({type:type})  ;
                    this.setState({item_details:this.props.item_data})
                    this.setState({lost_item_pool:this.props.user_lost_items})
                break;
        
                default:
                break;
            }
          
        };
        get_comparative_db()


       
    }

    





    render(){
        console.log(this.state)
        return(
            <>
            {
                this.state.match ?
                <h1>WE MATCH</h1>
                :
                <h1>no</h1>
            }
           
            </>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        store_token: state.token,
        user_found_items: state.user_found_items,
        user_lost_items:  state.user_lost_items,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // user_found_items : ()=>{ dispatch(userFitem())} 
        // user_lost_items :
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckItemMatch)



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

