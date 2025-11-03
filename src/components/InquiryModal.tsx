import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Phone, User, MessageSquare, Calendar, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  onSubmit: (data: InquiryFormData) => void;
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  message: string;
  inspirationImages?: File[];
}

export function InquiryModal({ isOpen, onClose, productName, onSubmit }: InquiryModalProps) {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    message: '',
    inspirationImages: []
  });

  const [errors, setErrors] = useState<Partial<InquiryFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const validateForm = () => {
    const newErrors: Partial<InquiryFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (e.g., 555-123-4567)';
    }

    if (!formData.eventDate) {
      newErrors.eventDate = 'Event date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventDate: '',
        message: '',
        inspirationImages: []
      });
      setErrors({});
      setImagePreviews([]);
      onClose();
    }, 800);
  };

  const handleChange = (field: keyof InquiryFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newImages = files.slice(0, 3 - (formData.inspirationImages?.length || 0));
      setFormData(prev => ({ 
        ...prev, 
        inspirationImages: [...(prev.inspirationImages || []), ...newImages] 
      }));

      newImages.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({ 
      ...prev, 
      inspirationImages: prev.inspirationImages?.filter((_, i) => i !== index) 
    }));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0"
            style={{ 
              zIndex: 10001,
              background: 'rgba(0, 0, 0, 0.75)'
            }}
            onClick={onClose}
            aria-label="Close modal"
          />

          {/* Modal */}
          <div
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 10002 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-lg rounded-2xl overflow-hidden"
              style={{
                background: '#FFFFFF',
                boxShadow: '0 25px 70px rgba(0, 0, 0, 0.4)',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="relative px-8 py-6"
                style={{
                  background: 'linear-gradient(135deg, #C44569 0%, #A03355 100%)',
                  color: 'white'
                }}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onClose();
                  }}
                  className="absolute top-4 right-4 p-2 rounded-full transition-colors"
                  style={{ 
                    width: '40px', 
                    height: '40px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  }}
                  aria-label="Close modal"
                >
                  <X size={24} strokeWidth={2.5} />
                </button>

                <h3
                  style={{
                    fontFamily: 'Playfair Display',
                    fontSize: '28px',
                    fontWeight: 700,
                    marginBottom: '8px',
                    paddingRight: '40px'
                  }}
                >
                  Cake Inquiry
                </h3>
                <p
                  style={{
                    fontSize: '16px',
                    opacity: 0.95,
                    fontFamily: 'Poppins'
                  }}
                >
                  {productName}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="overflow-y-auto px-8 py-6" style={{ background: '#FFFFFF' }}>
                <div className="space-y-5">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="inquiry-name"
                      className="block mb-2"
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#2B2B2B',
                        fontFamily: 'Poppins'
                      }}
                    >
                      Your Name *
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-4 top-1/2 transform -translate-y-1/2"
                        size={20}
                        color="var(--text-tertiary)"
                      />
                      <Input
                        id="inquiry-name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="pl-12 h-12 rounded-xl"
                        style={{
                          background: '#F8F8F8',
                          border: '2px solid #E0E0E0',
                          color: '#2B2B2B'
                        }}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                    </div>
                    {errors.name && (
                      <p
                        id="name-error"
                        className="mt-1.5 text-sm"
                        style={{ color: '#C44569' }}
                        role="alert"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="inquiry-email"
                      className="block mb-2"
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#2B2B2B',
                        fontFamily: 'Poppins'
                      }}
                    >
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-4 top-1/2 transform -translate-y-1/2"
                        size={20}
                        color="var(--text-tertiary)"
                      />
                      <Input
                        id="inquiry-email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="pl-12 h-12 rounded-xl"
                        style={{
                          background: '#F8F8F8',
                          border: '2px solid #E0E0E0',
                          color: '#2B2B2B'
                        }}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                    </div>
                    {errors.email && (
                      <p
                        id="email-error"
                        className="mt-1.5 text-sm"
                        style={{ color: '#C44569' }}
                        role="alert"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label
                      htmlFor="inquiry-phone"
                      className="block mb-2"
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#2B2B2B',
                        fontFamily: 'Poppins'
                      }}
                    >
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone
                        className="absolute left-4 top-1/2 transform -translate-y-1/2"
                        size={20}
                        color="var(--text-tertiary)"
                      />
                      <Input
                        id="inquiry-phone"
                        type="tel"
                        placeholder="555-123-4567"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="pl-12 h-12 rounded-xl"
                        style={{
                          background: '#F8F8F8',
                          border: '2px solid #E0E0E0',
                          color: '#2B2B2B'
                        }}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                      />
                    </div>
                    {errors.phone && (
                      <p
                        id="phone-error"
                        className="mt-1.5 text-sm"
                        style={{ color: '#C44569' }}
                        role="alert"
                      >
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Event Date Field */}
                  <div>
                    <label
                      htmlFor="inquiry-date"
                      className="block mb-2"
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#2B2B2B',
                        fontFamily: 'Poppins'
                      }}
                    >
                      Event Date *
                    </label>
                    <div className="relative">
                      <Calendar
                        className="absolute left-4 top-1/2 transform -translate-y-1/2"
                        size={20}
                        color="var(--text-tertiary)"
                      />
                      <Input
                        id="inquiry-date"
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) => handleChange('eventDate', e.target.value)}
                        className="pl-12 h-12 rounded-xl"
                        style={{
                          background: '#F8F8F8',
                          border: '2px solid #E0E0E0',
                          color: '#2B2B2B'
                        }}
                        min={new Date().toISOString().split('T')[0]}
                        aria-invalid={!!errors.eventDate}
                        aria-describedby={errors.eventDate ? 'date-error' : undefined}
                      />
                    </div>
                    {errors.eventDate && (
                      <p
                        id="date-error"
                        className="mt-1.5 text-sm"
                        style={{ color: '#C44569' }}
                        role="alert"
                      >
                        {errors.eventDate}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="inquiry-message"
                      className="block mb-2"
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#2B2B2B',
                        fontFamily: 'Poppins'
                      }}
                    >
                      Additional Details (Optional)
                    </label>
                    <div className="relative">
                      <MessageSquare
                        className="absolute left-4 top-4"
                        size={20}
                        color="var(--text-tertiary)"
                      />
                      <textarea
                        id="inquiry-message"
                        placeholder="Tell us about your event, preferences, or any special requests..."
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        rows={4}
                        className="w-full pl-12 pr-4 py-3 rounded-xl resize-none"
                        style={{
                          fontFamily: 'Open Sans',
                          fontSize: '15px',
                          background: '#F8F8F8',
                          border: '2px solid #E0E0E0',
                          color: '#2B2B2B'
                        }}
                      />
                    </div>
                  </div>

                  {/* Inspiration Images Upload */}
                  <div>
                    <label
                      htmlFor="inquiry-images"
                      className="block mb-2"
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#2B2B2B',
                        fontFamily: 'Poppins'
                      }}
                    >
                      Inspiration Images (Optional)
                    </label>
                    <p
                      className="mb-3 text-sm"
                      style={{ color: '#666666' }}
                    >
                      Upload up to 3 images of cakes or designs you like
                    </p>

                    {/* Upload Button */}
                    {(formData.inspirationImages?.length || 0) < 3 && (
                      <label
                        htmlFor="inquiry-images"
                        className="flex items-center justify-center gap-3 p-4 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200"
                        style={{
                          borderColor: '#E0E0E0',
                          background: '#F8F8F8'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#C44569';
                          e.currentTarget.style.background = 'rgba(196, 69, 105, 0.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#E0E0E0';
                          e.currentTarget.style.background = '#F8F8F8';
                        }}
                      >
                        <Upload size={20} color="#C44569" />
                        <span
                          style={{
                            color: '#2B2B2B',
                            fontFamily: 'Poppins',
                            fontSize: '14px',
                            fontWeight: 500
                          }}
                        >
                          Click to upload images
                        </span>
                        <input
                          id="inquiry-images"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}

                    {/* Image Previews */}
                    {imagePreviews.length > 0 && (
                      <div className="grid grid-cols-3 gap-3 mt-3">
                        {imagePreviews.map((preview, index) => (
                          <div
                            key={index}
                            className="relative group rounded-lg overflow-hidden"
                            style={{
                              aspectRatio: '1',
                              border: '2px solid #E0E0E0'
                            }}
                          >
                            <img
                              src={preview}
                              alt={`Inspiration ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              style={{
                                background: 'rgba(196, 69, 105, 0.95)',
                                color: 'white'
                              }}
                              aria-label={`Remove image ${index + 1}`}
                            >
                              <X size={16} strokeWidth={3} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-3 mt-8">
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onClose();
                    }}
                    className="flex-1 h-12 rounded-xl"
                    style={{
                      background: '#F8F8F8',
                      border: '2px solid #E0E0E0',
                      color: '#2B2B2B',
                      fontFamily: 'Poppins',
                      fontWeight: 600
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 h-12 rounded-xl btn-primary"
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: 600,
                      opacity: isSubmitting ? 0.7 : 1
                    }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                  </Button>
                </div>

                <p
                  className="mt-4 text-center text-sm"
                  style={{ color: '#666666' }}
                >
                  We'll get back to you within 24 hours
                </p>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
