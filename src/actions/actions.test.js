import * as actions from '../actions'

it("should have a type of CREATE_USER", () => {
  const mockUser = {
    id: 1,
    firstName: 'Ray',
    lastName: 'Zlou',
    feeling: 'tired',
  }

  const expected = {
    type: 'CREATE_USER',
    user: mockUser
  }

  const result = actions.createUser(mockUser)

  expect(result).toEqual(expected)
});

it("should have a type of REMOVE_USER", () => {
  const expected = {
    type: 'REMOVE_USER'
  }

  const result = actions.removeUser()

  expect(result).toEqual(expected)
});

it("should have a type of HAS_ERRORED", () => {
  const error = 'This is error!'

  const expected = {
    type: 'HAS_ERRORED',
    errorMsg: error
  }

  const result = actions.hasErrored(error)

  expect(result).toEqual(expected)
});

it("should have a type of ADD_MESSAGE", () => {
  const mockMessage = {
    message: 'Hi!',
    isUser: false
  }

  const expected = {
    type: 'ADD_MESSAGE',
    message: mockMessage
  }

  const result = actions.addMessage(mockMessage)

  expect(result).toEqual(expected)
});

it("should have a type of CLEAR_MESSAGES", () => {
  const expected = {
    type: 'CLEAR_MESSAGES'
  }

  const result = actions.clearMessages()

  expect(result).toEqual(expected)
});
