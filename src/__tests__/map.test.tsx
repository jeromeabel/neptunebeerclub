import { describe, it } from 'vitest'; // expect
import { render } from '@testing-library/react'; // screen
//import userEvent from '@testing-library/user-event';

// To Test
import { BarMap, BarProvider } from '@features/bar';

// Tests
describe('Unit tests on Map Feature', () => {
  it('Should render the Map Component correctly inside BarProvider', () => {
    render(
      <BarProvider>
        <BarMap />
      </BarProvider>,
    );
  });
});
