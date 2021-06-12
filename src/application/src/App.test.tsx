import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders the App component', () => {
  render(<App />);
  const linkElement = screen.getByText(/Url Shortner/i);
  expect(linkElement).toBeInTheDocument();
});

test('Check that the Save Button exists and click on it with empty url or invalid Url', () => {
 render(<App />);
  const button = screen.getByText('Save')
  expect(button).toBeInTheDocument();
  fireEvent.click(button)
});

test('Add Url and Click on the Save button to creat a valid Url', () => {
   render(<App />);
   const button = screen.getByText('Save')
   const textarea = screen.getByPlaceholderText('Add URL')
   expect(textarea).toBeInTheDocument();
   fireEvent.change(textarea, { target: { value: 'https://stackoverflow.com/' } })
   expect(button).toBeInTheDocument();
   fireEvent.click(button)
 });
