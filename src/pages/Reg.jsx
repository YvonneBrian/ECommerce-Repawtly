import React, { useState, useCallback } from 'react';
import { PawPrint, User, Dog, CheckCircle, Edit3, Mail, Lock } from 'lucide-react';

// --- Helper function for friendly alerts ---
const customAlert = (message) => {
  console.log("Notification:", message);
};

const DatePicker = ({ value, onChange, label, id }) => (
  <div className="flex flex-col space-y-1">
    <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type="date"
      id={id}
      value={value}
      onChange={onChange}
      className="p-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition duration-150"
    />
  </div>
);

const ToggleSwitch = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-white">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
        checked ? 'bg-sky-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);

const StepIndicator = ({ stepNumber, title, currentStep }) => {
  const isActive = stepNumber === currentStep;
  const isComplete = stepNumber < currentStep;

  return (
    <div className="flex items-center relative">
      <div className={`w-8 h-8 flex items-center justify-center rounded-full z-10 ${
        isComplete ? 'bg-amber-400' : isActive ? 'bg-white border-2 border-amber-400 text-sky-600' : 'bg-sky-700 text-sky-400'
      }`}>
        {isComplete ? <CheckCircle className="w-5 h-5 text-sky-700" /> : <span className="font-bold text-sm">{stepNumber}</span>}
      </div>
      <span className={`ml-4 text-sm font-medium ${isComplete ? 'text-white' : isActive ? 'text-white font-bold' : 'text-sky-300'}`}>
        {title}
      </span>
    </div>
  );
};

const Reg = ({ navigate, handleRegister }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    petName: '',
    petBreed: '',
    petDob: '',
    isChipped: false,
    vetContact: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = useCallback((e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const handleToggle = useCallback((field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }, []);

  const nextStep = (e) => {
    e.preventDefault();
    setError('');

    if (step === 1 && (!formData.email || !formData.password || !formData.fullName || !formData.phone)) {
      setError("Please fill in all required user fields.");
      return;
    }
    if (step === 2 && (!formData.petName || !formData.petBreed || !formData.petDob)) {
      setError("Please fill in all required pet fields.");
      return;
    }

    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setError('');
    setStep((prev) => prev - 1);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      handleRegister(formData); // call function from App.jsx
      customAlert("Registration successful!");
    } catch (err) {
      console.error("Registration Error:", err);
      setError("Registration failed. Please try again.");
      setStep(1);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <form onSubmit={nextStep} className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <User className="w-6 h-6 mr-2 text-sky-600" /> Account Information
          </h3>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                placeholder="Email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                id="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                placeholder="Min. 6 characters"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                id="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                placeholder="Jane Doe"
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                placeholder="(123) 456-7890"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-400 text-gray-900 font-bold rounded-lg shadow-lg hover:bg-amber-500 transition duration-200"
          >
            Next: Pet Info
          </button>
        </form>
      );
    } else if (step === 2) {
      return (
        <form onSubmit={nextStep} className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <Dog className="w-6 h-6 mr-2 text-sky-600" /> Primary Pet Information
          </h3>

          <div>
            <label htmlFor="petName" className="block text-sm font-medium text-gray-700 mb-1">Pet's Name</label>
            <input
              type="text"
              id="petName"
              required
              value={formData.petName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
              placeholder="Buddy"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="petBreed" className="block text-sm font-medium text-gray-700 mb-1">Breed / Type</label>
              <input
                type="text"
                id="petBreed"
                required
                value={formData.petBreed}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                placeholder="Golden Retriever"
              />
            </div>
            <DatePicker
              id="petDob"
              label="Date of Birth"
              value={formData.petDob}
              onChange={(e) => handleChange({ target: { id: 'petDob', value: e.target.value } })}
            />
          </div>

          <ToggleSwitch
            label="Is your pet microchipped?"
            checked={formData.isChipped}
            onChange={() => handleToggle('isChipped')}
          />

          <div>
            <label htmlFor="vetContact" className="block text-sm font-medium text-gray-700 mb-1">Veterinarian Contact (Optional)</label>
            <input
              type="text"
              id="vetContact"
              value={formData.vetContact}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
              placeholder="Dr. Smith - (555) 123-4567"
            />
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition duration-200"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-amber-400 text-gray-900 font-bold rounded-lg shadow-lg hover:bg-amber-500 transition duration-200"
            >
              Next: Confirmation
            </button>
          </div>
        </form>
      );
    } else if (step === 3) {
      return (
        <form onSubmit={handleFinalSubmit} className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-sky-600" /> Review & Finish
          </h3>

          <div className="p-4 bg-sky-50 rounded-lg space-y-3">
            <p className="font-bold text-lg text-sky-800 border-b pb-1">User Details</p>
            <p className="text-sm text-gray-700"><strong>Name:</strong> {formData.fullName}</p>
            <p className="text-sm text-gray-700"><strong>Email:</strong> {formData.email}</p>
          </div>

          <div className="p-4 bg-amber-50 rounded-lg space-y-3">
            <p className="font-bold text-lg text-amber-800 border-b pb-1">Pet Details</p>
            <p className="text-sm text-gray-700"><strong>Pet Name:</strong> {formData.petName}</p>
            <p className="text-sm text-gray-700"><strong>Breed:</strong> {formData.petBreed}</p>
            <p className="text-sm text-gray-700"><strong>Microchip:</strong> {formData.isChipped ? 'Yes' : 'No'}</p>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-sm text-sky-600 hover:underline flex items-center"
            >
              <Edit3 className="w-4 h-4 mr-1" /> Edit Pet Info
            </button>
          </div>

          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition duration-200"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-3 text-white font-bold rounded-lg shadow-lg transition duration-200 flex items-center justify-center ${
                isLoading ? 'bg-sky-400 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-700'
              }`}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">...</svg>
              ) : (
                'Create Account & Profile'
              )}
            </button>
          </div>
        </form>
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full p-4 md:p-8">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

        {/* Left Side */}
        <div className="w-full md:w-1/3 bg-sky-600 p-8 flex flex-col justify-start relative text-white">
          <div className="flex items-center mb-10">
            <PawPrint className="w-6 h-6 mr-2 text-amber-300" />
            <span className="text-xl font-bold">Repawtly</span>
          </div>

          <div className="relative pl-4 space-y-8">
            <div className="absolute left-6 top-8 bottom-0 w-0.5 bg-sky-400"></div>
            <StepIndicator stepNumber={1} title="User Info" currentStep={step} />
            <StepIndicator stepNumber={2} title="Pet Info" currentStep={step} />
            <StepIndicator stepNumber={3} title="Confirmation" currentStep={step} />
          </div>

          <div className="mt-auto pt-10">
            <p className="text-sky-300 text-sm italic">Smart Tags for Smart Pets.</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-2/3 p-8 lg:p-12">
          {renderStepContent()}

          <div className="text-center pt-6">
            <p className="text-gray-600">
              Already have an account?
              <button
                onClick={() => navigate('login')}
                className="text-sky-600 hover:text-sky-800 font-semibold transition duration-150 ml-1"
              >
                Log in here
              </button>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Reg;
