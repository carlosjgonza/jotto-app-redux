import React from 'react';
import { shallow } from 'enzyme';

import { storeFactory } from '../test/testUtils';
import App, { UnconnectedApp } from './App';

/**
 * Setup is a factory function to create a shallowWrapper for App
 * @function
 * @returns {ShallowWrapper}
 */
const setup = (initialState={}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<App store={store} />).dive().dive();
  return wrapper;
}

describe('Redux Props', () => {
  test('has success redux prop', () => {
    const success = true;
    const wrapper = setup ({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });
  test('has `guessedWords` redux prop', () => {
    const guessedWords = [
      { guessedWord: "train", letterMatchCount: 3 },
    ];
    const wrapper = setup({ guessedWords });
    const guessedWordsProp = wrapper.instance().props.guessedWords;
    expect(guessedWordsProp).toEqual(guessedWords);
  });
  test('has `secretWord` redux prop', () => {
    const secretWord = 'party';
    const wrapper = setup({ secretWord });
    const secretWordProp = wrapper.instance().props.secretWord;
    expect(secretWordProp).toBe(secretWord);
  });
  test('`getSecretWord` action is a function on the props', () => {
    const wrapper = setup();
    const getSecretWordProp = wrapper.instance().props.getSecretWord;
    expect(getSecretWordProp).toBeInstanceOf(Function);
  });
});

test('`getSecretWord` runs on App mount', () => {
  // Create func mock (it does nothing)
  const getSecretWordMock = jest.fn();
  const props = {
    getSecretWord: getSecretWordMock,
    guessedWords: [],
    success: false,
  };

  // Set upp app component with getSecretWordMock as the getSecretWord prop
  const wrapper = shallow(<UnconnectedApp {...props} />);

  // Run componentDidMount
  wrapper.instance().componentDidMount();

  // Check to see if mock fn ran
  const getSecretWordMockCallCount = getSecretWordMock.mock.calls.length;

  expect(getSecretWordMockCallCount).toBe(1);
});