export const messages = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return [...state, action.message]
    case 'CLEAR_MESSAGES':
      return []
    default:
      return state
  }
}
