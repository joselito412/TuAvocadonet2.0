import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Briefcase, Heart, Rocket, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui';
import SEO from '../components/SEO';

export default function WorkWithUsPage() {
  const { t } = useTranslation();
  const [showVacancies, setShowVacancies] = useState(false);

  return (
    <>
      <SEO
        titleKey="workWithUs.seo.title"
        descriptionKey="workWithUs.seo.description"
        defaultTitle="Trabaja con Nosotros | Avocado"
        defaultDescription="Únete al equipo que está redefiniendo el futuro legal."
      />

      <div className="min-h-screen bg-[#f8f5f2] pt-28 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-4xl mx-auto">
          {/* Main "Agenda" Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-r-3xl rounded-l-md shadow-2xl border-l-8 border-orange-500 overflow-hidden min-h-[70vh] relative"
          >
            {/* Decorative binding elements */}
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/5" />
            <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-gray-200" />

            <div className="p-8 md:p-12 relative">
              {/* Header */}
              <div className="mb-12 border-b-2 border-orange-100 pb-8">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-sm font-bold tracking-wide mb-4"
                >
                  {t('workWithUs.pill', 'Unete al Equipo')}
                </motion.span>
                <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
                  {t('workWithUs.title', 'Trabaja con Avocado')}
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                  {t(
                    'workWithUs.subtitle',
                    'Ayudanos a construir el sistema operativo legal del futuro. Buscamos mentes curiosas, no solo currículums.'
                  )}
                </p>
              </div>

              {/* Grid Content */}
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="flex gap-4 items-start group">
                    <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Rocket className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {t('workWithUs.mission.title', 'Impacto Real')}
                      </h3>
                      <p className="text-gray-600">
                        {t(
                          'workWithUs.mission.desc',
                          'Tu código y tus ideas protegerán los derechos de miles de personas. Literalmente.'
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start group">
                    <div className="p-3 rounded-2xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <Heart className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {t('workWithUs.culture.title', 'Cultura Humana')}
                      </h3>
                      <p className="text-gray-600">
                        {t(
                          'workWithUs.culture.desc',
                          'Tecnología de punta, pero primero las personas. Salud mental y balance real.'
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    {t('workWithUs.openings.title', 'Roles Abiertos')}
                  </h3>
                  <div className="space-y-4">
                    {/* Placeholder for future jobs list logic */}
                    <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <div>
                        <p className="font-bold text-gray-800">Senior Frontend Dev</p>
                        <p className="text-xs text-gray-500">Remoto • React/TS</p>
                      </div>
                      <Briefcase className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <div>
                        <p className="font-bold text-gray-800">Legal Engineer</p>
                        <p className="text-xs text-gray-500">Bogotá • Híbrido</p>
                      </div>
                      <Briefcase className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <Button
                    onClick={() => setShowVacancies(!showVacancies)}
                    className="w-full mt-6 bg-orange-500 text-white hover:bg-orange-600 shadow-orange-200 shadow-lg"
                  >
                    {showVacancies
                      ? t('workWithUs.ctaClose', 'Cerrar vacantes')
                      : t('workWithUs.cta', 'Ver todas las vacantes')}
                  </Button>
                </div>
              </div>

              {/* Vacancy Search Table - Notebook Aesthetic */}
              <AnimatePresence>
                {showVacancies && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="mt-12 border-t border-dashed border-gray-300 pt-8">
                      <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="w-1 h-8 bg-orange-500 rounded-full inline-block" />
                        {t('workWithUs.table.title', 'Vacantes Disponibles')}
                      </h3>

                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">
                                  {t('workWithUs.table.role', 'Rol')}
                                </th>
                                <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">
                                  {t('workWithUs.table.team', 'Equipo')}
                                </th>
                                <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">
                                  {t('workWithUs.table.location', 'Ubicación')}
                                </th>
                                <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider"></th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {[
                                {
                                  role: 'Senior Frontend Dev',
                                  team: 'Engineering',
                                  loc: 'Remoto',
                                  type: 'Full-time',
                                },
                                {
                                  role: 'Legal Prompt Engineer',
                                  team: 'AI Lab',
                                  loc: 'Bogotá / Híbrido',
                                  type: 'Full-time',
                                },
                                {
                                  role: 'Growth Marketing Manager',
                                  team: 'Growth',
                                  loc: 'Medellín',
                                  type: 'Full-time',
                                },
                                {
                                  role: 'Legal Operations Lead',
                                  team: 'Operations',
                                  loc: 'Remoto',
                                  type: 'Contract',
                                },
                              ].map((job, idx) => (
                                <tr
                                  key={idx}
                                  className="hover:bg-orange-50/50 transition-colors group cursor-pointer"
                                >
                                  <td className="p-4 font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                                    {job.role}
                                  </td>
                                  <td className="p-4 text-gray-600">{job.team}</td>
                                  <td className="p-4 text-gray-600">{job.loc}</td>
                                  <td className="p-4 text-right">
                                    <span className="inline-flex items-center text-orange-500 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                      Aplicar <ArrowRight className="w-4 h-4 ml-1" />
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
