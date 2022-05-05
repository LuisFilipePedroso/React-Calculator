import { render } from '@testing-library/react';
import App from '.';

test('Home renders correctly', () => {
  const { debug } = render(
    <App />
  )

  debug();
})