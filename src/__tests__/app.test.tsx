import { describe, it } from 'vitest'; // expect
import { render } from '@testing-library/react'; // screen
//import userEvent from '@testing-library/user-event';

// To Test : App.tsx
import App from '../App';

// Tests
describe('Renders main page correctly', () => {
	it('Should render the App correctly', () => {
		render(<App />);
		//const wrapper = render(<App />);
		//const h1 = wrapper.container.querySelector('h1'); // as HTMLHeadingElement
		// const h1 = screen.queryByText('Vite + React');
		//expect(h1).toBeInTheDocument();
	});
});
