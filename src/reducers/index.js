
const initialState = {
  books: [],
  loading: true,
  error: null,
  cartItems: [],
  orderTotal: 220
};

const increaseCartItems = (state, bookId, newItem) => {
  const updatedItems = state.cartItems.map((item) => {
    if (item.id === bookId) return {
      ...item,
      count: ++item.count,
      total: item.total + newItem.total
    }
    return item
  })
  return { ...state, cartItems: updatedItems }
}

const decreaseCartItems = (state, bookId, newItem) => {
  const updatedItems = state.cartItems.map((item) => {
    if (item.id === bookId && item.total >= newItem.total) return {
      ...item,
      count: --item.count,
      total: item.total - newItem.total
    }
    return item
  })
  return { ...state, cartItems: updatedItems }
}

const addCartItem = (state, newItem) => {
  return {
    ...state,
    cartItems: [
      ...state.cartItems,
      newItem
    ]
  };
}

const createBookItem = (state, bookId) => {
  const book = state.books.find((book) => book.id === bookId);
  return {
    id: book.id,
    name: book.title,
    count: 1,
    total: book.price
  };
}

const reducer = (state = initialState, action) => {
  console.log(action.type)
  switch (action.type) {
    case 'FETCH_BOOKS_REQUEST':
      return {
        ...state,
        books: [],
        loading: true,
        error: null
      };

    case 'FETCH_BOOKS_SUCCESS':
      return {
        ...state,
        books: action.payload,
        loading: false,
        error: null
      };

    case 'FETCH_BOOKS_FAILURE':
      return {
        ...state,
        books: [],
        loading: false,
        error: action.payload
      };

    case 'BOOK_ADDED_TO_CART':
      const bookId = action.payload;
      const isBookCarted = state.cartItems.find((book) => book.id === bookId)
      const newItem = createBookItem(state, bookId)

      if (isBookCarted) return increaseCartItems(state, bookId, newItem)
      else return addCartItem(state, newItem)

    case 'BOOK_INCREASED':
      const increaseBookId = action.payload
      const increaseBookInfo = createBookItem(state, increaseBookId)
      return increaseCartItems(state, increaseBookId, increaseBookInfo)

    case 'BOOK_DECREASED':
      const decreaseBookId = action.payload
      const decreaseBookInfo = createBookItem(state, decreaseBookId)
      return decreaseCartItems(state, decreaseBookId, decreaseBookInfo)
    default:
      return state;
  }
};

export default reducer;
