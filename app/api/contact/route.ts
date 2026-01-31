import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  nombre: string;
  correo: string;
  organizacion?: string;
  mensaje: string;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    const errors: string[] = [];

    if (!body.nombre?.trim()) {
      errors.push('El nombre es requerido');
    }

    if (!body.correo?.trim()) {
      errors.push('El correo es requerido');
    } else if (!isValidEmail(body.correo)) {
      errors.push('El correo no es válido');
    }

    if (!body.mensaje?.trim()) {
      errors.push('El mensaje es requerido');
    } else if (body.mensaje.trim().length < 10) {
      errors.push('El mensaje debe tener al menos 10 caracteres');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: errors.join('. ') 
        },
        { status: 400 }
      );
    }

    // TODO: Integrate with email service (Resend, SendGrid, etc.)
    // For now, we'll log the contact form submission
    console.log('📧 New contact form submission:', {
      nombre: body.nombre,
      correo: body.correo,
      organizacion: body.organizacion || 'No especificada',
      mensaje: body.mensaje,
      timestamp: new Date().toISOString(),
    });

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Example integration with Resend (uncomment when ready):
    /*
    import { Resend } from 'resend';
    
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'DAI+ Website <noreply@daiplus.com>',
      to: ['dandradei@outlook.es'],
      subject: `Nueva consulta de ${body.nombre}`,
      html: `
        <h2>Nueva solicitud de consultoría</h2>
        <p><strong>Nombre:</strong> ${body.nombre}</p>
        <p><strong>Correo:</strong> ${body.correo}</p>
        <p><strong>Organización:</strong> ${body.organizacion || 'No especificada'}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${body.mensaje}</p>
      `,
    });
    */

    return NextResponse.json({
      success: true,
      message: 'Mensaje enviado correctamente',
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error interno del servidor. Por favor, intente nuevamente.' 
      },
      { status: 500 }
    );
  }
}

// Handle other methods
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}
