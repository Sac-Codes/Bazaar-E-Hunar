import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2, User, ArrowRight, School, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { submitContactMessage, type ContactMessage } from '../services/contactService';

const Contact = () => {
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear messages on change
    if (successMessage) setSuccessMessage(null);
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent duplicate submissions
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      await submitContactMessage(formData);
      setSuccessMessage('Thank you! Your message has been sent successfully. We\'ll get back to you as soon as possible.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  const contactItems = [
    {
      icon: MapPin,
      iconColor: 'text-[#00E5FF]',
      groupHoverBg: 'group-hover:bg-[#00E5FF]',
      groupHoverText: 'group-hover:text-[#050816]',
      borderGlow: 'shadow-[0_0_20px_rgba(0,229,255,0.3)]',
      gradientBorder: 'from-[#00E5FF]/30 via-[#3B82F6]/20 to-transparent',
      title: '📍 School Address',
      content: (
        <>
          <div className="flex items-start gap-2 mb-2">
            <School size={18} className="text-[#00E5FF] mt-0.5 shrink-0" />
            <span className="text-white font-semibold">Sant Atulanand Convent School</span>
          </div>
          <p className="text-gray-400 leading-relaxed text-sm pl-[26px]">
            Koirajpur, Harahua,<br />
            Varanasi,<br />
            Uttar Pradesh – 221002
          </p>
        </>
      ),
    },
    {
      icon: Phone,
      iconColor: 'text-[#8B5CF6]',
      groupHoverBg: 'group-hover:bg-[#8B5CF6]',
      groupHoverText: 'group-hover:text-white',
      borderGlow: 'shadow-[0_0_20px_rgba(139,92,246,0.3)]',
      gradientBorder: 'from-[#8B5CF6]/30 via-[#FF4FCB]/20 to-transparent',
      title: '👩 Teacher In-Charge',
      content: (
        <>
          <p className="text-white font-semibold mb-1">Sneha Ma'am</p>
          <p className="text-gray-500 text-xs font-medium mb-3">Teacher Coordinator</p>
          <a
            href="tel:+919648393187"
            aria-label="Call Sneha Ma'am at +91 96483 93187"
            className="inline-flex items-center gap-2 text-[#8B5CF6] hover:text-white transition-colors font-medium text-sm bg-[#8B5CF6]/10 hover:bg-[#8B5CF6]/20 px-4 py-2 rounded-xl border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/40"
          >
            <Phone size={14} />
            +91 96483 93187
          </a>
        </>
      ),
    },
    {
      icon: User,
      iconColor: 'text-[#FF8A00]',
      groupHoverBg: 'group-hover:bg-[#FF8A00]',
      groupHoverText: 'group-hover:text-[#050816]',
      borderGlow: 'shadow-[0_0_20px_rgba(255,138,0,0.3)]',
      gradientBorder: 'from-[#FF8A00]/30 via-[#FFD166]/20 to-transparent',
      title: '👨‍💼 Student Coordinator',
      content: (
        <>
          <p className="text-white font-semibold mb-1">Sachin Yadav</p>
          <p className="text-gray-500 text-xs font-medium mb-3">Head Boy &amp; Student Coordinator</p>
          <a
            href="tel:+919140647427"
            aria-label="Call Sachin Yadav at +91 9140647427"
            className="inline-flex items-center gap-2 text-[#FF8A00] hover:text-white transition-colors font-medium text-sm bg-[#FF8A00]/10 hover:bg-[#FF8A00]/20 px-4 py-2 rounded-xl border border-[#FF8A00]/20 hover:border-[#FF8A00]/40"
          >
            <Phone size={14} />
            +91 9140647427
          </a>
        </>
      ),
    },
    {
      icon: Mail,
      iconColor: 'text-[#10B981]',
      groupHoverBg: 'group-hover:bg-[#10B981]',
      groupHoverText: 'group-hover:text-white',
      borderGlow: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]',
      gradientBorder: 'from-[#10B981]/30 via-[#3B82F6]/20 to-transparent',
      title: '📧 Official Email',
      content: (
        <>
          <p className="text-gray-400 text-sm mb-3">For general inquiries and information</p>
          <a
            href="mailto:principalsacs@gmail.com"
            aria-label="Send email to principalsacs@gmail.com"
            className="inline-flex items-center gap-2 text-[#10B981] hover:text-white transition-colors font-medium text-sm bg-[#10B981]/10 hover:bg-[#10B981]/20 px-4 py-2 rounded-xl border border-[#10B981]/20 hover:border-[#10B981]/40 break-all"
          >
            <Mail size={14} />
            principalsacs@gmail.com
          </a>
        </>
      ),
    },
  ];

  return (
    <PageWrapper className="bg-transparent pb-24">
      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {/* Gradient Blob Top Right */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-[#00E5FF]/10 via-[#3B82F6]/8 to-transparent rounded-full blur-[120px]" />
        {/* Gradient Blob Bottom Left */}
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-gradient-to-tr from-[#8B5CF6]/10 via-[#FF4FCB]/8 to-transparent rounded-full blur-[120px]" />
        {/* Gradient Blob Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#3B82F6]/5 via-[#00E5FF]/5 to-[#8B5CF6]/5 rounded-full blur-[150px]" />
        {/* Subtle floating particles background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,229,255,0.03)_0%,_transparent_70%)]" />
      </div>

      {/* Header */}
      <section className="pt-32 pb-32 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3B82F6]/15 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#8B5CF6]/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight"
          >
            Get In{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#3B82F6] to-[#8B5CF6]">
              Touch
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed"
          >
            Have questions about Bazaar-E-Hunar 2027?
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 text-base md:text-lg max-w-3xl mx-auto mt-3 leading-relaxed"
          >
            Whether you're interested in registering a stall, participating in an event, becoming a sponsor, or simply learning more, we're here to help.
          </motion.p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8 -mt-20 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          
          {/* Contact Info - Left Side */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:w-2/5 flex flex-col gap-6"
          >
            {/* Quick Help Card */}
            <motion.div variants={cardVariants} className="glass-card-premium p-6 bg-[#111827]/60">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6]">
                  <HelpCircle size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Need Assistance?</h3>
                  <p className="text-gray-400 text-sm font-medium leading-relaxed mb-3">
                    Choose the right contact:
                  </p>
                  <ul className="space-y-1.5 text-sm text-gray-400">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                      <span><span className="text-gray-300">Registration &amp; Event Queries</span> → Teacher In-Charge</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
                      <span><span className="text-gray-300">Student Coordination</span> → Student Coordinator</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                      <span><span className="text-gray-300">General Information</span> → Official Email</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Individual Contact Cards */}
            {contactItems.map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className={`glass-card-premium p-6 group cursor-default transition-all duration-300 hover:translate-y-[-4px] border border-white/5 hover:border-white/10`}
                style={{
                  background: `linear-gradient(135deg, rgba(17,24,39,0.7), rgba(26,35,58,0.5))`,
                }}
              >
                <div className="flex gap-5">
                  <div className={`w-14 h-14 shrink-0 rounded-2xl bg-[#050816] border border-white/5 flex items-center justify-center ${item.iconColor} ${item.groupHoverBg} ${item.groupHoverText} transition-all duration-300 ${item.borderGlow}`}>
                    <item.icon size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white mb-2 text-base">{item.title}</h4>
                    {item.content}
                  </div>
                </div>
                {/* Subtle gradient border overlay on hover */}
                <div className="absolute inset-0 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className={`absolute inset-0 rounded-[1.5rem] bg-gradient-to-br ${item.gradientBorder}`} />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form - Right Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-3/5"
          >
            <div className="glass-card-premium p-8 md:p-12 bg-[#1A233A]/60 border border-white/5">
              <h3 className="text-2xl md:text-3xl font-black mb-2 text-white tracking-tight">
                Send Us a Message
              </h3>
              <p className="text-gray-400 text-sm font-medium mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              {/* Status Messages */}
              {successMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="mb-6 p-4 bg-[#10B981]/10 border border-[#10B981]/30 rounded-xl flex items-center gap-3"
                >
                  <CheckCircle size={20} className="text-[#10B981] shrink-0" />
                  <p className="text-[#10B981] font-medium text-sm">{successMessage}</p>
                </motion.div>
              )}
              {errorMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="mb-6 p-4 bg-[#FF4FCB]/10 border border-[#FF4FCB]/30 rounded-xl flex items-center gap-3"
                >
                  <AlertCircle size={20} className="text-[#FF4FCB] shrink-0" />
                  <p className="text-[#FF4FCB] font-medium text-sm">{errorMessage}</p>
                </motion.div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-widest">Your Name</label>
                    <input 
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[#050816] border border-white/10 rounded-xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 focus:border-[#3B82F6] transition-all text-white placeholder-gray-600 shadow-inner"
                      placeholder="Enter your name"
                      disabled={isSubmitting}
                      aria-label="Your Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-widest">Email Address</label>
                    <input 
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#050816] border border-white/10 rounded-xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 focus:border-[#3B82F6] transition-all text-white placeholder-gray-600 shadow-inner"
                      placeholder="Enter your email address"
                      disabled={isSubmitting}
                      aria-label="Email Address"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-widest">Subject</label>
                  <input 
                    id="subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-[#050816] border border-white/10 rounded-xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 focus:border-[#3B82F6] transition-all text-white placeholder-gray-600 shadow-inner"
                    placeholder="What is this about?"
                    disabled={isSubmitting}
                    aria-label="Subject"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-widest">Message</label>
                  <textarea 
                    id="message"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[#050816] border border-white/10 rounded-xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 focus:border-[#3B82F6] transition-all resize-none text-white placeholder-gray-600 shadow-inner"
                    placeholder="Write your message here..."
                    disabled={isSubmitting}
                    aria-label="Message"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-primary w-full py-4 text-base font-bold tracking-wide shadow-[0_0_20px_rgba(0,229,255,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send Message"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
          
        </div>

        {/* Google Map */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 w-full max-w-6xl mx-auto"
        >
          <div className="text-center mb-8">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-black text-white tracking-tight"
            >
              Visit Our Campus
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-sm font-medium mt-2"
            >
              Sant Atulanand Convent School, Koirajpur, Harahua, Varanasi
            </motion.p>
          </div>

          <div className="glass-card-premium overflow-hidden rounded-[2rem] border border-white/5 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <div className="relative w-full h-[300px] md:h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.5801842992693!2d82.926501!3d25.279331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e317b3e1b1e6d%3A0x8a9e1c3f9b9e9a9f!2sSant%20Atulanand%20Convent%20School!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '2rem' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sant Atulanand Convent School Location"
                className="absolute inset-0 w-full h-full"
                aria-label="Google Map showing Sant Atulanand Convent School location"
              />
            </div>
          </div>
        </motion.div>

        {/* Footer CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 w-full max-w-6xl mx-auto"
        >
          <div className="glass-card-premium p-10 md:p-14 text-center relative overflow-hidden bg-gradient-to-br from-[#111827]/80 via-[#1A233A]/60 to-[#111827]/80 border border-white/5">
            {/* Decorative background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-[#00E5FF]/5 via-[#8B5CF6]/5 to-[#FF8A00]/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative z-10">
              <motion.h2 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight"
              >
                Ready to Showcase Your Talent?
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-medium"
              >
                Join Bazaar-E-Hunar 2027 and become part of an unforgettable celebration of creativity, innovation, and entrepreneurship.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  to="/register"
                  className="btn-festival inline-flex items-center gap-2 px-8 py-4 text-base font-bold tracking-wide"
                  aria-label="Register Your Stall"
                >
                  Register Your Stall
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  );
};

export default Contact;

