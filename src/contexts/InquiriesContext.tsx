import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  eventDate: string | null;
  message: string;
  productName: string;
  inspirationImages?: File[] | string;
  status: 'pending' | 'reviewed' | 'contacted';
  createdAt?: string;
}

interface InquiriesContextType {
  inquiries: Inquiry[];
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'status' | 'createdAt'>) => Promise<void>;
  updateInquiryStatus: (id: number, status: 'pending' | 'reviewed' | 'contacted') => Promise<void>;
  isLoading: boolean;
}

const InquiriesContext = createContext<InquiriesContextType | undefined>(undefined);

export function InquiriesProvider({ children }: { children: ReactNode }) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch inquiries from API on mount
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await fetch('/api/inquiries');
        if (response.ok) {
          const data = await response.json();
          setInquiries(data);
        }
      } catch (error) {
        console.error('Error fetching inquiries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  const addInquiry = async (inquiry: Omit<Inquiry, 'id' | 'status' | 'createdAt'>) => {
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: inquiry.name,
          email: inquiry.email,
          phone: inquiry.phone,
          eventDate: inquiry.eventDate,
          message: inquiry.message,
          productName: inquiry.productName,
          inspirationImages: inquiry.inspirationImages,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create inquiry');
      }

      const newInquiry = await response.json();
      setInquiries(prev => [newInquiry, ...prev]);
    } catch (error) {
      console.error('Error adding inquiry:', error);
      throw error;
    }
  };

  const updateInquiryStatus = async (id: number, status: 'pending' | 'reviewed' | 'contacted') => {
    try {
      const response = await fetch(`/api/inquiries/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update inquiry status');
      }

      const updatedInquiry = await response.json();
      setInquiries(prev =>
        prev.map(inquiry =>
          inquiry.id === id ? { ...inquiry, status: updatedInquiry.status } : inquiry
        )
      );
    } catch (error) {
      console.error('Error updating inquiry status:', error);
      throw error;
    }
  };

  return (
    <InquiriesContext.Provider value={{ inquiries, addInquiry, updateInquiryStatus, isLoading }}>
      {children}
    </InquiriesContext.Provider>
  );
}

export function useInquiries() {
  const context = useContext(InquiriesContext);
  if (context === undefined) {
    throw new Error('useInquiries must be used within an InquiriesProvider');
  }
  return context;
}
