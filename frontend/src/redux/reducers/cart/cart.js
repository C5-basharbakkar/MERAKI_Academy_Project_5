import {createSlice} from `@reduxjs/toolkit`
import { toast } from "react-toastify"
const cartSlice=createSlice({
    name:`Cart`,
    initialState:{
        carts:[],
        totalQuantity:0,
        totalAmount:0
    },

    reducers:{

        setCart:(state,action)=>{
            state.carts=action.payload
        },


        addItem:(state,action)=>{
            const mealIndex=state.carts.findIndex((item)=>item.id===action.payload.id)
            if(mealIndex>=0){
           state.carts[mealIndex].quantity+=1
           toast.info(`${state.carts[mealIndex].name}قمت بحجز المزيد من`,{
               position:"bottom-left"
           })
            }else{
                const quantity={...action.payload,quantity:1}
                state.carts.push(quantity)

                toast.success(` تم اضافة ${action.payload.name} الى السلة`,{
                    position:"bottom-left"
            })
            
        }},


        deleteItemById:(state,action)=>{
            state.carts=state.carts.filter((cart,index)=>{
                return cart.id !==action.payload
            })
        },

        updateById:(state,action)=>{
            state.carts = state.carts.map((cart, index) => {
            if (cart.id == action.payload) {
              return { ...cart, quantity:action.payload.quantity };
            }
            return cart;
          });

        },


        removeAllItem:(state,action)=>{
            state.carts=[]
        }
    }

})


export const {setCart,addItem,deleteItemById,removeAllItem,updateById}=cartSlice.actions

export default cartSlice.reducers