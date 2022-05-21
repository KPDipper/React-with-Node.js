import { ADD_TO_CART, REMOVE_TO_CART } from "./cartConstants";

//yo state tai cart hune bhyo//yo initial state auyera bascha
const cartReducers = (state = { cart_items: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      let item = action.payload; //payload batako value lai items bhane ma store garum
      let itemExists = state.cart_items.find((i) => i.product === item.product); //yesle k check garne bhane ki yedi cart ma paila item cha ki chaina check garne cha bahne add garnu pardena
      //here item already cha bahne null return garcha
      if (itemExists) {
        //  return {...state,cart_items:state.cart_items.map(i=>i.product === item.product?item:i)}//here yedi already item cha bhnae sabai return garnu paryo tala ko example
        //  //ko anusar we can see that it compare and return allvalue
        //here yo cart

        //Example:-
        //let i : a, b, c, d
        //let item = c
        //now for a===c, return a i.e i
        //now for b===c, return b i.e i
        //now for c===c, return c i.e item
        //now for d===c, return c i.e i

        return { ...state }; //yedi itemexist cha bhane jastai ko jstai return garne
      } else {
        return {
          ...state,
          cart_items: [...state.cart_items, item],
        }; //chaina bhane item add garne cart ma
      }

    case REMOVE_TO_CART:
      return {
        ...state, //purano value aunu paryo suru ma
        cart_items: state.cart_items.filter((i) => i.product != action.payload.product), //here yedi maile apple remove gare bhane payload ma baheko bhayek(not apple ) return garnu paryo
        ///here payload ma object pathako chaum tesaile payload .product garnu paryo to access product
        
        //suppose samsung,apple,nokia
        //now if we remove apple then payload ko value apple huncha
        //now it only return non payload items only that means samsung & nokia
      };
    default:
      return state;
  }
};

export default cartReducers;
