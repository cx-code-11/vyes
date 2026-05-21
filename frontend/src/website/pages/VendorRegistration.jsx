import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardFooter } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { StepIndicator } from '../components/StepIndicator';
import { Building2, Briefcase, CreditCard, Shield, Plus } from 'lucide-react';

const steps = [
  { name: 'Registration' },
  { name: 'Documents' },
  { name: 'Agreement' },
  { name: 'Sign' }
];

export function VendorRegistration() {
  const navigate = useNavigate();
  
  // State for standard form fields (Login credentials removed)
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    upiId: '',
    gstNumber: '',
    aadhar: '',
    pan: ''
  });

  const [errors, setErrors] = useState({});
  const [submissionError, setSubmissionError] = useState('');
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  // State for dynamic services
  const [services, setServices] = useState([
    {
      id: Date.now(),
      selectedService: 'AC Service',
      experience: '',
      customServiceName: '',
      customExperience: '',
      customDescription: '',
    },
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddService = () => {
    setServices([
      ...services,
      {
        id: Date.now(),
        selectedService: '',
        experience: '',
        customServiceName: '',
        customExperience: '',
        customDescription: '',
      },
    ]);
  };

  const handleServiceChange = (id, field, value) => {
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, [field]: value } : service
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmissionError('');

    const requiredFields = [
      'businessName',
      'contactPerson',
      'email',
      'phone',
      'address',
      'accountHolderName',
      'accountNumber',
      'ifscCode',
      'upiId',
      'aadhar',
      'pan'
    ];

    const validationErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]?.trim()) {
        validationErrors[field] = 'This field is required';
      }
    });

    services.forEach((service, index) => {
      if (!service.selectedService) {
        validationErrors[`service_${index}_selectedService`] = 'Please choose a service';
      }
      if (service.selectedService !== 'Other' && !service.experience?.trim()) {
        validationErrors[`service_${index}_experience`] = 'Please enter experience';
      }
      if (service.selectedService === 'Other') {
        if (!service.customServiceName?.trim()) {
          validationErrors[`service_${index}_customServiceName`] = 'Please enter custom service name';
        }
        if (!service.customExperience?.trim()) {
          validationErrors[`service_${index}_customExperience`] = 'Please enter experience';
        }
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmissionError('Please fix the highlighted fields before continuing.');
      return;
    }

    const completeData = {
      ...formData,
      services
    };

    try {
      const response = await fetch(`${apiBaseUrl}/vendor-registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(completeData)
      });

      const result = await response.json();

      if (!response.ok) {
        setSubmissionError(result.error || 'Failed to submit registration.');
        return;
      }

      localStorage.setItem('vendorData', JSON.stringify(completeData));
      localStorage.setItem('vendorRegistrationId', result.data?.id || '');
      navigate('/upload');
    } catch (error) {
      console.error('Registration submit error:', error);
      setSubmissionError('Unable to send registration data to the server.');
    }
  };

  // Common Tailwind classes for inputs that don't use your custom <Input /> component
  const baseInputStyles = "w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900">Partner with Vyess FMS</h1>
        <p className="mt-3 text-slate-600">Join our network of trusted service providers. Fill out the details below to start your onboarding journey.</p>
      </div>

      <div className="mb-12">
        <StepIndicator steps={steps} currentStep={0} />
      </div>

      <form onSubmit={handleSubmit}>
        {submissionError && (
          <div className="rounded-md bg-red-50 border border-red-200 p-4 text-sm text-red-700 mb-6">
            {submissionError}
          </div>
        )}
        <div className="space-y-8">
          
          {/* Section 1: Basic Information */}
          <Card>
            <CardHeader 
              title={<div className="flex items-center gap-2"><Building2 className="w-5 h-5" /> Basic Information</div>}
              description="Please provide your official business information."
            />
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Business Name"
                  name="businessName"
                  required
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="e.g. Cool Air Tech"
                  error={errors.businessName}
                />
                <Input 
                  label="Contact Person"
                  name="contactPerson"
                  required
                  value={formData.contactPerson}
                  onChange={handleChange}
                  placeholder="Representative Name"
                  error={errors.contactPerson}
                />
                <Input 
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91"
                  error={errors.phone}
                />
                <Input 
                  label="Email Address"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="contact@business.com"
                  error={errors.email}
                />
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Full Address
                  </label>
                  <textarea
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    rows={2}
                    className={baseInputStyles}
                    placeholder="Shop No, Street, Area, City"
                  />
                  {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Service Details */}
          <Card>
            <CardHeader 
              title={<div className="flex items-center gap-2"><Briefcase className="w-5 h-5" /> Service Details</div>}
              description="Specify the services you provide and your experience."
            />
            <CardContent>
              <div className="space-y-8">
                {services.map((service, index) => (
                  <div key={service.id} className={index > 0 ? "pt-6 border-t border-slate-200" : ""}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Service Name
                        </label>
                        <select
                          className={baseInputStyles}
                          value={service.selectedService}
                          onChange={(e) => handleServiceChange(service.id, 'selectedService', e.target.value)}
                        >
                          <option value="">Select Service</option>
                          <option value="AC Service">AC Service</option>
                          <option value="Cleaning">Cleaning</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors[`service_${index}_selectedService`] && (
                          <p className="mt-2 text-sm text-red-600">{errors[`service_${index}_selectedService`]}</p>
                        )}
                      </div>

                      {/* Standard Experience - Hidden if 'Other' is selected */}
                      {service.selectedService !== 'Other' ? (
                        <div>
                           <label className="block text-sm font-medium text-slate-700 mb-1">
                            Experience
                          </label>
                          <input
                            type="text"
                            className={baseInputStyles}
                            placeholder="e.g. 5 Years"
                            value={service.experience}
                            onChange={(e) => handleServiceChange(service.id, 'experience', e.target.value)}
                          />
                          {errors[`service_${index}_experience`] && (
                            <p className="mt-2 text-sm text-red-600">{errors[`service_${index}_experience`]}</p>
                          )}
                        </div>
                      ) : (
                        <div className="hidden md:block"></div> /* Spacer for grid alignment */
                      )}
                    </div>

                    {/* Custom Service Block - Only visible when 'Other' is selected */}
                    {service.selectedService === 'Other' && (
                      <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-6">
                        <h4 className="font-semibold text-slate-800">Custom Service Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div>
                             <label className="block text-sm font-medium text-slate-700 mb-1">
                              Custom Service Name
                            </label>
                            <input
                              type="text"
                              className={baseInputStyles}
                              placeholder="Enter service name"
                              value={service.customServiceName}
                              onChange={(e) => handleServiceChange(service.id, 'customServiceName', e.target.value)}
                            />
                            {errors[`service_${index}_customServiceName`] && (
                              <p className="mt-2 text-sm text-red-600">{errors[`service_${index}_customServiceName`]}</p>
                            )}
                           </div>
                           <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              Experience
                            </label>
                            <input
                              type="text"
                              className={baseInputStyles}
                              placeholder="e.g. 5 Years"
                              value={service.customExperience}
                              onChange={(e) => handleServiceChange(service.id, 'customExperience', e.target.value)}
                            />
                            {errors[`service_${index}_customExperience`] && (
                              <p className="mt-2 text-sm text-red-600">{errors[`service_${index}_customExperience`]}</p>
                            )}
                           </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Service Description
                          </label>
                          <textarea
                            className={baseInputStyles}
                            placeholder="Describe the service in detail...."
                            rows={3}
                            value={service.customDescription}
                            onChange={(e) => handleServiceChange(service.id, 'customDescription', e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddService}
                  className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add service
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Bank Details */}
          <Card>
            <CardHeader 
              title={<div className="flex items-center gap-2"><CreditCard className="w-5 h-5" /> Bank Details (For Payouts)</div>}
            />
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Account Holder Name"
                  name="accountHolderName"
                  value={formData.accountHolderName}
                  onChange={handleChange}
                  placeholder="As per bank records"
                  error={errors.accountHolderName}
                />
                <Input 
                  label="Account Number"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  placeholder="XXXXXXXXXXXXX"
                  error={errors.accountNumber}
                />
                <Input 
                  label="IFSC Code"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChange}
                  placeholder="ABCD0123456"
                  error={errors.ifscCode}
                />
                <Input 
                  label="UPI ID"
                  name="upiId"
                  value={formData.upiId}
                  onChange={handleChange}
                  placeholder="mobile@upi"
                  error={errors.upiId}
                />
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Verification & Access */}
          <Card>
            <CardHeader 
              title={<div className="flex items-center gap-2"><Shield className="w-5 h-5" /> Verification & Access</div>}
            />
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="GST Number (Optional)"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  placeholder="22AAAAA0000A1Z5"
                  error={errors.gstNumber}
                />
                <Input 
                  label="Aadhar"
                  name="aadhar"
                  value={formData.aadhar}
                  onChange={handleChange}
                  placeholder="Aadhar Number"
                  error={errors.aadhar}
                />
                <Input 
                  label="PAN"
                  name="pan"
                  value={formData.pan}
                  onChange={handleChange}
                  placeholder="Pan Number"
                  error={errors.pan}
                />
              </div>
            </CardContent>
            
            {/* Action buttons moved here, attached to the last remaining section */}
            <CardFooter className="flex justify-end gap-4 border-t border-slate-100 pt-6 mt-6">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
              <Button type="submit" size="lg">Save & Continue</Button>
            </CardFooter>
          </Card>

        </div>
      </form>
    </div>
  );
}