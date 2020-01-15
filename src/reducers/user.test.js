import { user } from './user'

describe("user reducer", () => {
  it("should return the initial value", () => {
    const expected = null

    const result = user(undefined, {})
    expect(result).toEqual(expected)
  });

  it("should return the object with user information if action type is CREATE_USER", () => {
    const mockUser = {
      id: 1,
      firstName: 'Ray',
      lastName: 'Zlou',
      feeling: 'tired',
    }

    const mockAction = {
      type: 'CREATE_USER',
      user: mockUser
    }

    const expected = mockUser

    const result = user(undefined, mockAction)
    expect(result).toEqual(expected)
  });

  it("should return null if action type is REMOVE_USER", () => {
    const mockAction = {
      type: 'REMOVE_USER'
    }

    const expected = null

    const result = user(undefined, mockAction)
    expect(result).toEqual(expected)
  });
});
