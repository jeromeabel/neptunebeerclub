import { describe, it } from 'vitest'; // expect
import { render } from '@testing-library/react'; // screen
//import userEvent from '@testing-library/user-event';

// To Test
import { Home } from '@pages/home';

// Tests
describe('Renders Home page correctly', () => {
  it('Should render the Home correctly', () => {
    render(<Home />);
    //const wrapper = render(<App />);
    //const h1 = wrapper.container.querySelector('h1'); // as HTMLHeadingElement
    // const h1 = screen.queryByText('Vite + React');
    //expect(h1).toBeInTheDocument();
  });
});
