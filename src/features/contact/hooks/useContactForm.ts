'use client';

import { useState } from 'react';
import { isValidEmail } from '@/src/lib/utils';

interface FormData {
  nombre: string;
  correo: string;
  organizacion: string;
  mensaje: string;
}

interface FormErrors {
  nombre?: string;
  correo?: string;
  mensaje?: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function useContactForm() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    correo: '',
    organizacion: '',
    mensaje: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es requerido';
    } else if (!isValidEmail(formData.correo)) {
      newErrors.correo = 'El correo no es válido';
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es requerido';
    } else if (formData.mensaje.trim().length < 10) {
      newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    // TODO: Configurar Firebase Functions para el envío de formularios
    // Por ahora, solo mostramos un mensaje de éxito simulado
    try {
      // Simular delay de envío
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mostrar mensaje de éxito
      setStatus('success');
      setFormData({
        nombre: '',
        correo: '',
        organizacion: '',
        mensaje: '',
      });

      // Reset success status after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);

      /* 
      // Código para cuando Firebase Functions esté configurado:
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al enviar el mensaje');
      }
      */

    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : 'Error al enviar el mensaje. Por favor, intente nuevamente.'
      );
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      correo: '',
      organizacion: '',
      mensaje: '',
    });
    setErrors({});
    setStatus('idle');
    setErrorMessage('');
  };

  return {
    formData,
    errors,
    status,
    errorMessage,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
