
import { useState, useEffect } from 'react';

export interface FormSubmission {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  businessUrl: string;
  contactMethod: 'email' | 'whatsapp';
  message: string;
  submittedAt: string;
}

export const useFormSubmissions = () => {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);

  useEffect(() => {
    // Load submissions from localStorage on mount
    const savedSubmissions = localStorage.getItem('form-submissions');
    if (savedSubmissions) {
      setSubmissions(JSON.parse(savedSubmissions));
    }
  }, []);

  const addSubmission = (formData: Omit<FormSubmission, 'id' | 'submittedAt'>) => {
    const newSubmission: FormSubmission = {
      ...formData,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
    };

    const updatedSubmissions = [...submissions, newSubmission];
    setSubmissions(updatedSubmissions);
    localStorage.setItem('form-submissions', JSON.stringify(updatedSubmissions));
  };

  const clearSubmissions = () => {
    setSubmissions([]);
    localStorage.removeItem('form-submissions');
  };

  const exportToGoogleSheets = () => {
    // Create CSV content
    const headers = ['Name', 'Surname', 'Email', 'Phone', 'Business URL', 'Contact Method', 'Message', 'Submitted At'];
    const csvContent = [
      headers.join(','),
      ...submissions.map(sub => [
        sub.name,
        sub.surname,
        sub.email,
        sub.phone,
        sub.businessUrl,
        sub.contactMethod,
        `"${sub.message.replace(/"/g, '""')}"`,
        new Date(sub.submittedAt).toLocaleString()
      ].join(','))
    ].join('\n');

    // Download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `form-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return {
    submissions,
    addSubmission,
    clearSubmissions,
    exportToGoogleSheets,
  };
};
