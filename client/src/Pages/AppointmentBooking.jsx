import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { availableSlots, bookSlot } from '../apis/booking';

const AppointmentBooking = () => {
    const [currentPage, setCurrentPage] = useState('slots');
    const [date, setDate] = useState('');
    const [slots, setSlots] = useState([]);
    const [formData, setFormData] = useState({ name: '', phone: '', timeSlot: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (date) {
            const getSlotes = async () => {
                const response = await availableSlots(date)
                setSlots(response.data)

            }
            getSlotes()
        }
    }, [date]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await bookSlot({ ...formData, date })
            setMessage(response.data.message)
        } catch (error) {
            setMessage(error.response.data.error)
            console.log(error);
        } finally {
            setFormData({ name: '', phone: '', timeSlot: '' })
        }

    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-6">
                {/* Tabs */}
                <div className="flex justify-center mb-6">
                    <button
                        className={`px-6 py-2 text-lg font-semibold rounded-l-lg ${currentPage === 'slots'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 text-gray-700'
                            }`}
                        onClick={() => setCurrentPage('slots')}
                    >
                        Available Slots
                    </button>
                    <button
                        className={`px-6 py-2 text-lg font-semibold rounded-r-lg ${currentPage === 'form'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 text-gray-700'
                            }`}
                        onClick={() => setCurrentPage('form')}
                    >
                        Booking Form
                    </button>
                </div>

                {/* Available Slots Page */}
                {currentPage === 'slots' && (
                    <div>
                        <h2 className="text-2xl font-bold text-indigo-600 mb-4 text-center">
                            Check Available Slots
                        </h2>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full mb-4 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {slots.length > 0 ? (
                            <div className="grid grid-cols-2 gap-4">
                                {slots.map((slot, index) => (
                                    <div
                                        key={index}
                                        className="p-4 bg-indigo-100 rounded-lg text-indigo-700 font-semibold text-center shadow-md"
                                    >
                                        {slot}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">
                                {date ? 'No slots available for this date.' : 'Please select a date.'}
                            </p>
                        )}
                    </div>
                )}

                {/* Booking Form Page */}
                {currentPage === 'form' && (
                    <div>
                        <h2 className="text-2xl font-bold text-indigo-600 mb-4 text-center">
                            Book an Appointment
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                            <select
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                            >
                                <option value="">Select a time slot</option>
                                {slots.map((slot, index) => (
                                    <option key={index} value={slot}>
                                        {slot}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300"
                                disabled={!formData.timeSlot}
                            >
                                Book Appointment
                            </button>
                        </form>
                        {message && (
                            <p
                                className={`mt-4 text-center text-sm font-medium ${message.includes('successfully')
                                    ? 'text-green-600'
                                    : 'text-red-600'
                                    }`}
                            >
                                {message}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppointmentBooking;
