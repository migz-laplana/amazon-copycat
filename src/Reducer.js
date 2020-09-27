export const initialState = {
    //listing all the initial state variablesL:
    basket: [],  //site shopping cart
    user: null  //current user atm
};


//A Selector; used a lot in production env
export const getBasketTotal = (basket) => {
    return basket?.reduce((amount, item) => {
        let total = Number(item.price) + amount;
        return Math.round((total + Number.EPSILON) * 100) / 100;
    }, 0);
}

const reducer = (state, action) => {

    console.log(action);

    //for every type of dispatch:
    switch (action.type) {
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item],
                //note: basket will be set to what it was previously
                //      then the item object sent to data layer
                //      when dispatch was fired 
            };

        case "REMOVE_FROM_BASKET":
            //in basket, get index of FIRST item that matches id
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            //create a temp copy of the basket
            let newBasket = [...state.basket];

            if (index >= 0) {
                //look in basket for index location, then cut by 1
                newBasket.splice(index, 1);
            } else {  //error handling
                console.warn(
                    `cant remove product (id: ${action.id}) as its not in basket!`
                )
            }
            return {
                ...state,
                basket: newBasket
            }

        case "SET_USER":
            return {
                ...state,
                user: action.user
            }

        case "EMPTY_BASKET":
            return {
                ...state,
                basket: []
            }

        default:
            return state;
    }
};

export default reducer;