import { messages } from './messages'

describe("messages reducer", () => {
  it("should return the initial value", () => {
    const expected = []

    const result = messages(undefined, {})
    expect(result).toEqual(expected)
  });

  it("should return the messages array with new message if action type is ADD_MESSAGE", () => {
    const mockMessage = {
      message: 'Hi!',
      isUser: false
    }

    const mockAction = {
      type: 'ADD_MESSAGE',
      message: mockMessage
    }


    const expected = [mockMessage]

    const result = messages(undefined, mockAction)
    expect(result).toEqual(expected)
  });

  it("should return empty array if action type is CLEAR_MESSAGES", () => {
    const mockAction = {
      type: 'CLEAR_MESSAGES'
    }

    const expected = [ ]

    const result = messages([ ], mockAction)
    expect(result).toEqual(expected)
  });
});
