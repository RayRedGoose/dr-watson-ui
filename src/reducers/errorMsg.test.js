import { errorMsg } from './errorMsg'

describe("errorMsg reducer", () => {
  it("should return the initial value", () => {
    const expected = ''

    const result = errorMsg(undefined, {})
    expect(result).toEqual(expected)
  });

  it("should return the errorMsg if action type is HAS_ERRORED", () => {
    const mockError = 'This is error'

    const mockAction = {
      type: 'HAS_ERRORED',
      errorMsg: mockError
    }

    const expected = mockError

    const result = errorMsg(undefined, mockAction)
    expect(result).toEqual(expected)
  });
});
