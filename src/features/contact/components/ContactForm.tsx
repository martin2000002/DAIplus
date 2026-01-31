'use client';

import { Input, Textarea } from '@/src/shared/components/ui';
import { useContactForm } from '../hooks/useContactForm';

export function ContactForm() {
  const { 
    formData, 
    errors, 
    status, 
    errorMessage,
    handleChange, 
    handleSubmit 
  } = useContactForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Success Message */}
      {status === 'success' && (
        <div 
          className="p-4 rounded-lg bg-green-50 border border-green-200 
                     text-green-800 text-center animate-fade-in"
        >
          <p className="font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
            ¡Mensaje enviado correctamente!
          </p>
          <p className="text-sm mt-1" style={{ fontFamily: 'var(--font-body)' }}>
            Nos pondremos en contacto contigo pronto.
          </p>
        </div>
      )}

      {/* Error Message */}
      {status === 'error' && (
        <div 
          className="p-4 rounded-lg bg-red-50 border border-red-200 
                     text-red-800 text-center animate-fade-in"
        >
          <p className="font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
            Error al enviar
          </p>
          <p className="text-sm mt-1" style={{ fontFamily: 'var(--font-body)' }}>
            {errorMessage}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          id="nombre"
          name="nombre"
          type="text"
          label="Nombre *"
          placeholder="Tu nombre completo"
          value={formData.nombre}
          onChange={handleChange}
          error={errors.nombre}
          disabled={status === 'loading'}
        />

        <Input
          id="correo"
          name="correo"
          type="email"
          label="Correo Electrónico *"
          placeholder="tu@email.com"
          value={formData.correo}
          onChange={handleChange}
          error={errors.correo}
          disabled={status === 'loading'}
        />
      </div>

      <Input
        id="organizacion"
        name="organizacion"
        type="text"
        label="Organización"
        placeholder="Nombre de tu empresa u organización (opcional)"
        value={formData.organizacion}
        onChange={handleChange}
        disabled={status === 'loading'}
      />

      <Textarea
        id="mensaje"
        name="mensaje"
        label="Mensaje *"
        placeholder="Cuéntanos cómo podemos ayudarte..."
        rows={5}
        value={formData.mensaje}
        onChange={handleChange}
        error={errors.mensaje}
        disabled={status === 'loading'}
      />

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full btn btn--primary btn--lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <svg 
              className="animate-spin h-5 w-5" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
                fill="none"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Enviando...
          </span>
        ) : (
          'Enviar Mensaje'
        )}
      </button>

      <p 
        className="text-xs text-center text-[var(--color-gray-500)]"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        * Campos requeridos. Tu información será tratada con confidencialidad.
      </p>
    </form>
  );
}
