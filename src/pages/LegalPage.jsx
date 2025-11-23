import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function LegalPage() {
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to section if hash is present
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div>
      {/* Hero Section */}
      <section className="section-block min-h-[50vh] text-center bg-gradient-to-r from-green-50 to-blue-50">
        <div className="content-wrapper">
          <span className="eyebrow">TRANSPARENCIA LEGAL</span>
          <h1 className="mb-8">Información Legal</h1>
          <p className="lead-text max-w-3xl mx-auto">
            Tu privacidad y seguridad son nuestra prioridad. Conoce cómo manejamos tus datos y los términos de nuestros servicios.
          </p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-20 z-[100]">
        <div className="content-wrapper">
          <div className="flex gap-8 py-5 justify-center flex-wrap">
            <a href="#datos-personales" className="text-dark no-underline font-semibold px-5 py-2 rounded-lg transition-all hover:bg-green-50 hover:text-primary">
              Datos Personales
            </a>
            <a href="#terminos" className="text-dark no-underline font-semibold px-5 py-2 rounded-lg transition-all hover:bg-green-50 hover:text-primary">
              Términos y Condiciones
            </a>
            <a href="#privacidad" className="text-dark no-underline font-semibold px-5 py-2 rounded-lg transition-all hover:bg-green-50 hover:text-primary">
              Política de Privacidad
            </a>
          </div>
        </div>
      </section>

      {/* Datos Personales Section */}
      <section id="datos-personales" className="section-block py-20">
        <div className="content-wrapper max-w-4xl">
          <h2 className="mb-8">
            <i className="fas fa-user-shield text-primary mr-4"></i>
            Protección de Datos Personales
          </h2>
          
          <div className="bg-green-50 p-5 rounded-xl mb-8 border-l-4 border-primary">
            <p style={{ margin: 0, fontWeight: '600' }}>
              En cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013, TuAvocado se compromete a proteger tus datos personales.
            </p>
          </div>

          <h3>¿Qué datos recopilamos?</h3>
          <ul className="leading-relaxed text-gray-600 list-disc pl-6">
            <li>Información de identificación (nombre, cédula, correo electrónico)</li>
            <li>Datos de contacto (teléfono, dirección)</li>
            <li>Información profesional (empresa, cargo) para clientes B2B</li>
            <li>Historial de consultas legales y documentos generados</li>
          </ul>

          <h3 className="mt-10">¿Cómo usamos tus datos?</h3>
          <ul className="leading-relaxed text-gray-600 list-disc pl-6">
            <li>Proveer servicios de asesoría legal personalizada</li>
            <li>Mejorar nuestros algoritmos de IA mediante aprendizaje automático</li>
            <li>Comunicaciones relacionadas con tu caso o servicio</li>
            <li>Cumplimiento de obligaciones legales y regulatorias</li>
          </ul>

          <h3 className="mt-10">Tus Derechos</h3>
          <p className="leading-relaxed text-gray-600">
            Tienes derecho a conocer, actualizar, rectificar y suprimir tus datos personales. Para ejercer estos derechos, 
            contáctanos en <strong>datospersonales@avocado.legal</strong>
          </p>
        </div>
      </section>

      {/* Términos y Condiciones Section */}
      <section id="terminos" className="section-block bg-white py-20">
        <div className="content-wrapper max-w-4xl">
          <h2 className="mb-8">
            <i className="fas fa-file-contract text-secondary mr-4"></i>
            Términos y Condiciones de Uso
          </h2>
          
          <p className="text-sm text-gray-500 mb-8">
            Última actualización: Enero 2025
          </p>

          <h3>1. Aceptación de los Términos</h3>
          <p className="leading-relaxed text-gray-600">
            Al acceder y usar los servicios de TuAvocado, aceptas estar sujeto a estos términos y condiciones. 
            Si no estás de acuerdo, no utilices nuestros servicios.
          </p>

          <h3 className="mt-10">2. Descripción del Servicio</h3>
          <p className="leading-relaxed text-gray-600">
            TuAvocado es una plataforma de asesoría legal impulsada por IA que:
          </p>
          <ul className="leading-relaxed text-gray-600 list-disc pl-6">
            <li>Proporciona orientación legal general basada en normativa colombiana y estadounidense</li>
            <li>Genera documentos legales estandarizados</li>
            <li>Conecta usuarios con abogados certificados para casos complejos</li>
            <li><strong>NO sustituye</strong> el asesoramiento legal personalizado de un abogado licenciado</li>
          </ul>

          <h3 className="mt-10">3. Limitaciones de Responsabilidad</h3>
          <div className="bg-orange-50 p-5 rounded-xl border-l-4 border-accent">
            <p style={{ margin: 0, lineHeight: '1.6' }}>
              <strong>IMPORTANTE:</strong> La IA de TuAvocado proporciona información legal general. 
              Para decisiones legales críticas, siempre consulta con un abogado certificado. No nos hacemos responsables 
              por decisiones tomadas exclusivamente basadas en respuestas automatizadas.
            </p>
          </div>

          <h3 className="mt-10">4. Propiedad Intelectual</h3>
          <p className="leading-relaxed text-gray-600">
            Todos los documentos generados son propiedad del usuario. La tecnología, marca y contenidos de la plataforma 
            son propiedad exclusiva de TuAvocado SAS.
          </p>

          <h3 className="mt-10">5. Modificaciones</h3>
          <p className="leading-relaxed text-gray-600">
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios significativos 
            serán notificados por correo electrónico.
          </p>
        </div>
      </section>

      {/* Política de Privacidad Section */}
      <section id="privacidad" className="section-block py-20">
        <div className="content-wrapper max-w-4xl">
          <h2 className="mb-8">
            <i className="fas fa-lock text-primary mr-4"></i>
            Política de Privacidad
          </h2>

          <h3>Cookies y Tecnologías de Rastreo</h3>
          <p className="leading-relaxed text-gray-600">
            Utilizamos cookies esenciales para el funcionamiento de la plataforma, cookies analíticas (Google Analytics) 
            para mejorar la experiencia del usuario, y cookies de preferencias para recordar tus configuraciones.
          </p>

          <h3 className="mt-10">Seguridad de la Información</h3>
          <p className="leading-relaxed text-gray-600">
            Implementamos medidas de seguridad robustas:
          </p>
          <ul className="leading-relaxed text-gray-600 list-disc pl-6">
            <li>Cifrado end-to-end (TLS 1.3) para todas las comunicaciones</li>
            <li>Almacenamiento encriptado de datos sensibles (AES-256)</li>
            <li>Auditorías de seguridad trimestrales</li>
            <li>Acceso restringido a datos bajo principio de mínimo privilegio</li>
          </ul>

          <h3 className="mt-10">Compartir con Terceros</h3>
          <p className="leading-relaxed text-gray-600">
            <strong>NO vendemos</strong> tus datos personales. Solo compartimos información con:
          </p>
          <ul className="leading-relaxed text-gray-600 list-disc pl-6">
            <li>Abogados asignados a tu caso (con tu consentimiento)</li>
            <li>Proveedores de servicios esenciales (hosting, pagos) bajo acuerdos de confidencialidad</li>
            <li>Autoridades judiciales cuando sea legalmente requerido</li>
          </ul>

          <h3 className="mt-10">Retención de Datos</h3>
          <p className="leading-relaxed text-gray-600">
            Conservamos tus datos mientras mantengas una cuenta activa o según lo requiera la ley. 
            Puedes solicitar la eliminación de tu cuenta y datos asociados en cualquier momento.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-block bg-light py-16 text-center">
        <div className="content-wrapper">
          <h3 className="mb-5">¿Tienes preguntas sobre nuestras políticas?</h3>
          <p className="mb-8 text-gray-600">
            Nuestro equipo legal está disponible para aclarar cualquier duda
          </p>
          <button className="btn-primary">
            <i className="fas fa-envelope mr-2"></i>
            Contactar
          </button>
        </div>
      </section>
    </div>
  );
}

export default LegalPage;
