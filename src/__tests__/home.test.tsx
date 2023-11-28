import { describe, it } from 'vitest'; // expect
import { render } from '@testing-library/react'; // screen
//import userEvent from '@testing-library/user-event';

// To Test
import { Home } from '@pages/home';

// Tests
describe('Unit tests on pages', () => {
  it('Should render the Home page correctly', () => {
    render(<Home />);
    //const wrapper = render(<App />);
    //const h1 = wrapper.container.querySelector('h1'); // as HTMLHeadingElement
    // const h1 = screen.queryByText('Vite + React');
    //expect(h1).toBeInTheDocument();
  });
});
