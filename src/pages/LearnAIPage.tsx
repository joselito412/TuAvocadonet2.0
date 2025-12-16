import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BookOpen, Database, FileText, ArrowLeft, ArrowRight, X } from 'lucide-react';
import { Button } from '../components/ui';
import SEO from '../components/SEO';

interface Course {
  id: string;
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
  detailsKey: string;
  color: string;
  gradient: string;
}

const courses: Course[] = [
  {
    id: 'lawyers-ai',
    icon: <BookOpen className="w-12 h-12" />,
    titleKey: 'learnAI.courses.lawyers.title',
    descriptionKey: 'learnAI.courses.lawyers.description',
    detailsKey: 'learnAI.courses.lawyers.details',
    color: 'bg-blue-600',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'prompts-db',
    icon: <Database className="w-12 h-12" />,
    titleKey: 'learnAI.courses.prompts.title',
    descriptionKey: 'learnAI.courses.prompts.description',
    detailsKey: 'learnAI.courses.prompts.details',
    color: 'bg-purple-600',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    id: 'legal-docs',
    icon: <FileText className="w-12 h-12" />,
    titleKey: 'learnAI.courses.docs.title',
    descriptionKey: 'learnAI.courses.docs.description',
    detailsKey: 'learnAI.courses.docs.details',
    color: 'bg-emerald-600',
    gradient: 'from-emerald-500 to-teal-600',
  },
];

export default function LearnAIPage() {
  const { t } = useTranslation();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <>
      <SEO
        titleKey="learnAI.seo.title"
        descriptionKey="learnAI.seo.description"
        defaultTitle="Avocado Academy"
        defaultDescription="Aprende IA Legal"
      />

      <div className="min-h-screen bg-[#f8f5f2] pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <header className="mb-12 text-center relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 font-serif"
            >
              {t('learnAI.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light"
            >
              {t('learnAI.subtitle')}
            </motion.p>
          </header>

          {/* Main Book/Agenda Container */}
          <div className="relative perspective-1000">
            <AnimatePresence mode="wait">
              {!selectedCourse ? (
                /* Gallery View (Agenda/Book Index) */
                <motion.div
                  key="gallery"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                  {courses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{
                        y: -5,
                        boxShadow:
                          '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                      }}
                      className="relative bg-white rounded-r-2xl rounded-l-md shadow-xl overflow-hidden cursor-pointer group border-l-8 h-[400px] flex flex-col"
                      style={{ borderLeftColor: course.icon ? 'transparent' : undefined }} // fallback
                    >
                      {/* Spine imitation */}
                      <div className={`absolute left-0 top-0 bottom-0 w-2 ${course.color}`} />

                      <div
                        className={`h-48 bg-gradient-to-br ${course.gradient} p-6 flex items-center justify-center text-white relative overflow-hidden`}
                      >
                        <div className="relative z-10 transform transition-transform duration-500 group-hover:scale-110">
                          {course.icon}
                        </div>
                        {/* Decorative patterns */}
                        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-black/10 rounded-full blur-2xl" />
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between bg-[url('/img/paper-texture.png')] bg-cover">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                            {t(course.titleKey)}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-3">
                            {t(course.descriptionKey)}
                          </p>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm font-medium text-gray-500 group-hover:text-gray-800 transition-colors">
                          <span>{t('learnAI.clickToOpen')}</span>
                          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                      {/* Click Handler Overlay */}
                      <button
                        onClick={() => setSelectedCourse(course)}
                        className="absolute inset-0 w-full h-full z-20 focus:outline-none"
                        aria-label={t('learnAI.openCourse', { course: t(course.titleKey) })}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                /* Expanded Page View (Open Book) */
                <motion.div
                  key="content"
                  initial={{ opacity: 0, rotateY: 10, scale: 0.95 }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  className="bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px] flex flex-col md:flex-row max-w-5xl mx-auto relative border border-gray-100"
                >
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="absolute top-4 right-4 z-50 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-gray-100 transition-colors shadow-sm"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </button>

                  {/* Left Side: Visuals & Quick Info */}
                  <div
                    className={`md:w-1/3 bg-gradient-to-br ${selectedCourse.gradient} p-8 text-white relative flex flex-col justify-between`}
                  >
                    <div className="relative z-10">
                      <Button
                        variant="ghost"
                        className="text-white hover:bg-white/20 mb-8 -ml-2 p-2 w-fit h-auto"
                        onClick={() => setSelectedCourse(null)}
                      >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        {t('common.back')}
                      </Button>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/20 p-6 rounded-2xl backdrop-blur-md border border-white/30 inline-flex mb-6"
                      >
                        {selectedCourse.icon}
                      </motion.div>

                      <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl font-bold mb-4 leading-tight"
                      >
                        {t(selectedCourse.titleKey)}
                      </motion.h2>
                    </div>

                    {/* Decorative Circles */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/10 rounded-full blur-3xl pointer-events-none" />
                  </div>

                  {/* Right Side: Content */}
                  <div className="md:w-2/3 p-8 md:p-12 overflow-y-auto max-h-[80vh] bg-[#fffdf9]">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-gray-800 prose-p:text-gray-600"
                    >
                      <div dangerouslySetInnerHTML={{ __html: t(selectedCourse.detailsKey) }} />

                      <div className="mt-12 flex gap-4">
                        <Button className="bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all w-full md:w-auto">
                          {t('learnAI.enrollNow')}
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full md:w-auto border-gray-300 hover:bg-gray-50"
                          onClick={() => setSelectedCourse(null)}
                        >
                          {t('learnAI.viewAllCourses')}
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
