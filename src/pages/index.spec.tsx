import { cleanup, fireEvent, render } from '@testing-library/react';
import App from '.';

describe('Calculator behavior', () => {
  afterEach(cleanup);

  it('should sum two numbers', () => {
    const { getByText, getByTestId } = render(
      <App />
    )

    fireEvent.click(getByText('1'), new MouseEvent('click'));
    fireEvent.click(getByText('+'), new MouseEvent('click'));
    fireEvent.click(getByText('2'), new MouseEvent('click'));
    fireEvent.click(getByText('='), new MouseEvent('click'));

    const screen = getByTestId('screen');
    expect(screen).toHaveTextContent('3');
  });

  it('should subtract two numbers', () => {
    const { getByText, getByTestId } = render(
      <App />
    )

    fireEvent.click(getByText('4'), new MouseEvent('click'));
    fireEvent.click(getByText('-'), new MouseEvent('click'));
    fireEvent.click(getByText('2'), new MouseEvent('click'));
    fireEvent.click(getByText('='), new MouseEvent('click'));

    const screen = getByTestId('screen');
    expect(screen).toHaveTextContent('2');
  });

  it('should multiply two numbers', () => {
    const { getByText, getByTestId } = render(
      <App />
    )

    fireEvent.click(getByText('2'), new MouseEvent('click'));
    fireEvent.click(getByText('*'), new MouseEvent('click'));
    fireEvent.click(getByText('2'), new MouseEvent('click'));
    fireEvent.click(getByText('='), new MouseEvent('click'));

    const screen = getByTestId('screen');
    expect(screen).toHaveTextContent('4');
  });

  it('should divide two numbers', () => {
    const { getByText, getByTestId } = render(
      <App />
    )

    fireEvent.click(getByText('2'), new MouseEvent('click'));
    fireEvent.click(getByText('/'), new MouseEvent('click'));
    fireEvent.click(getByText('2'), new MouseEvent('click'));
    fireEvent.click(getByText('='), new MouseEvent('click'));

    const screen = getByTestId('screen');
    expect(screen).toHaveTextContent('1');
  });

  it('should calculate percentage', () => {
    const { getByText, getByTestId } = render(
      <App />
    )

    fireEvent.click(getByText('2'), new MouseEvent('click'));
    fireEvent.click(getByText('%'), new MouseEvent('click'));

    const screen = getByTestId('screen');
    expect(screen).toHaveTextContent('0.02');
  });

  it('should clear the calculator screen', () => {
    const { getByText, getByTestId } = render(
      <App />
    )

    fireEvent.click(getByText('1'), new MouseEvent('click'));
    fireEvent.click(getByText('+'), new MouseEvent('click'));
    fireEvent.click(getByText('2'), new MouseEvent('click'));
    fireEvent.click(getByText('='), new MouseEvent('click'));
    fireEvent.click(getByText('AC'), new MouseEvent('click'));

    const screen = getByTestId('screen');
    expect(screen).toHaveTextContent('0');
  });
});