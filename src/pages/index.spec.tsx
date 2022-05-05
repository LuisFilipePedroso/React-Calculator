import { fireEvent, render } from '@testing-library/react';
import App from '.';

describe('Calculator behavior', () => {
  it('should sum two numbers', () => {
    const { debug, getByText, getByTestId, container } = render(
      <App />
    )

    fireEvent.click(getByText('1'), new MouseEvent('click'));
    fireEvent.click(getByText('+'), new MouseEvent('click'));
    fireEvent.click(getByText('2'), new MouseEvent('click'));
    fireEvent.click(getByText('='), new MouseEvent('click'));

    const screen = getByTestId('screen');
    expect(screen).toHaveTextContent('3');
  });
});