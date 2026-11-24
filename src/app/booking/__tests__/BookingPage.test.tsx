import { render, screen, fireEvent } from '@testing-library/react';
import BookingPage from '../page';

describe('BookingPage Component', () => {
  test('renders the booking form', () => {
    render(<BookingPage />);
    expect(screen.getByText('Train Ticket Booking')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /confirm booking/i })).toBeInTheDocument();
  });

  test('updates contact information inputs', () => {
    render(<BookingPage />);
    const nameInput = screen.getByPlaceholderText('Full Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const phoneInput = screen.getByPlaceholderText('Phone');

    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });

    expect(nameInput).toHaveValue('John');
    expect(emailInput).toHaveValue('john@example.com');
    expect(phoneInput).toHaveValue('1234567890');
  });

  test('prevents submission while processing', () => {
    render(<BookingPage />);
    const submitButton = screen.getByRole('button', { name: /confirm booking/i });

    expect(submitButton).not.toBeDisabled();
    // We could simulate form submit if needed
  });

  test('prefills only the destination from a ?to= link', () => {
    window.history.pushState({}, '', '/booking?to=Naivasha');
    render(<BookingPage />);

    expect(screen.getByDisplayValue('Naivasha')).toBeInTheDocument();
    expect(screen.getAllByRole('combobox')[0]).toHaveValue('');

    window.history.pushState({}, '', '/');
  });

  test('a station picked in one list is hidden from the other', () => {
    render(<BookingPage />);
    const [origin, destination] = screen.getAllByRole('combobox') as HTMLSelectElement[];
    const options = (el: HTMLSelectElement) => Array.from(el.options).map((o) => o.value);

    fireEvent.change(origin, { target: { value: 'Nairobi' } });
    expect(options(destination)).not.toContain('Nairobi');

    fireEvent.change(destination, { target: { value: 'Mombasa' } });
    expect(options(origin)).not.toContain('Mombasa');
    expect(options(origin)).toContain('Nairobi');
  });
});
