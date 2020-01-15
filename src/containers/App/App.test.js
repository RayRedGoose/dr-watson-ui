import React from 'react';
import { shallow } from 'enzyme';
import { App, mapStateToProps, mapDispatchToProps } from './App';
import { removeUser, hasErrored, addMessage, clearMessages } from '../../actions';
import { endConversation } from '../../apiCalls';

jest.mock('../../apiCalls');

describe('App component', () => {
  const mockRemoveUser = jest.fn();
  const mockHasErrored = jest.fn();
  const mockAddMessage = jest.fn();
  const mockClearMessages = jest.fn();
  let wrapper;

  beforeEach(() => {
    const mockUser = {
      id: 1568665187737,
      firstName: "Travis",
      lastName: "Rollins",
      feeling: "tired"
    };

    wrapper = shallow(<App
        user={mockUser}
        removeUser={mockRemoveUser}
        hasErrored={mockHasErrored}
        addMessage={mockAddMessage}
        clearMessages={mockClearMessages}
    />);
  });

  it('should match the snapshot with a ChatBox if the user has signed in', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should match the snapshot with a WelcomeModal if the user hasn't signed in yet", () => {
    const wrapper = shallow(<App
      user={null}
      removeUser={mockRemoveUser}
      hasErrored={mockHasErrored}
      addMessage={mockAddMessage}
      clearMessages={mockClearMessages}
    />);

    expect(wrapper).toMatchSnapshot();
  });

  it("should call addMessage props when addMessage method is calling", () => {
    const mockMessage = 'Hi!'
    wrapper.instance().addMessage(mockMessage, true)

    const expectedArgs = {
      message: mockMessage,
      isUser: true
    }

    expect(mockAddMessage).toHaveBeenCalledWith(expectedArgs)

  });

  it('should call endConversation, removeUser and clearMessages if someone signs out', async () => {
    await wrapper.instance().signOut();

    expect(endConversation).toHaveBeenCalled();
    expect(mockRemoveUser).toHaveBeenCalled();
    expect(mockClearMessages).toHaveBeenCalled();
  });

  it('should call hasErrored if endCoversation does not resolve when a user signs out', async () => {
    endConversation.mockImplementation(() => {
      return Promise.reject(Error('fetch failed.'));
    });

    await wrapper.instance().signOut();

    expect(mockHasErrored).toHaveBeenCalledWith('fetch failed.');
  });
});

describe('mapStateToProps', () => {
  it('should return an object with the user information', () => {
    const mockUser = {
      id: 1568665187737,
      firstName: "Travis",
      lastName: "Rollins",
      feeling: "tired"
    };

    const mockMessage = {
      message: 'Hi!',
      isUser: false
    };

    const mockState = {
      user: mockUser,
      messages: [ mockMessage ],
      errorMsg: ''
    };

    const expected = {
      user: mockUser,
      messages: [ mockMessage ]
    }

    const mappedProps = mapStateToProps(mockState);

    expect(mappedProps).toEqual(expected);
  });
});

describe('mapDispatchToProps', () => {
  let mockDispatch, mappedProps

  beforeEach(() => {
    mockDispatch = jest.fn();
    mappedProps = mapDispatchToProps(mockDispatch);
  });

  it('calls dispatch with a removeUser action when removeUser is called', () => {
    const actionToDispatch = removeUser();

    mappedProps.removeUser();

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });

  it('calls dispatch with a hasErrored action when hasErrored is called', () => {
    const actionToDispatch = hasErrored('fetch failed');

    mappedProps.hasErrored('fetch failed');

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });

  it('calls dispatch with a addMessage action when addMessage is called', () => {
    const mockMessage = {
      message: 'Hi!',
      isUser: false
    }

    const actionToDispatch = addMessage(mockMessage);

    mappedProps.addMessage(mockMessage);

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });

  it('calls dispatch with a clearMessages action when clearMessages is called', () => {
    const actionToDispatch = clearMessages();

    mappedProps.clearMessages();

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });
});
