import {createSlice} from `@reduxjs/toolkit`

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
            state.carts.push(action.payload)
        },


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