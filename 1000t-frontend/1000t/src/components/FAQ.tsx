import React, { useState } from 'react';

const FAQ: React.FC = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);

  const faqs = [
    {
      question: "Who can join the 1,000-voice choir?",
      answer: "Anyone with a heart for worship and a willingness to commit to rehearsals can join! You don't need to be a professional singer, just come ready to lift your voice in unity with others."
    },
    {
      question: "How do I get tickets for the event?",
      answer: "Tickets will be available through our official website and authorized partners. Early bird pricing and group discounts will be announced soon."
    },
    {
      question: "What is the vision behind 1000 Tongues?",
      answer: "1000 tongues is a response in obedience to a simple instruction to 'gather a worship team of 1000 people and hold worship events'.  We are excited to see what God will do as we move in obedience."
    },
    {
      question: "Can I volunteer to help with the event?",
      answer: "Yes! We welcome volunteers in various capacities including event coordination, technical support, hospitality, and more. Volunteer applications will open soon."
    },
    {
      question: "When and where will rehearsals take place?",
      answer: "There will be 5 hubs across London (north, east, south, west and central).  You will be assigned to the hub most convenient for you, and attend the rehearsals for your hub."
    },
    {
      question: "How can sponsors and partners get involved?",
      answer: "We offer various sponsorship packages and partnership opportunities. Contact our partnerships team for detailed information about how your organization can support this historic event."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side - FAQ Items */}
          <div className="flex-1">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                    className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg font-medium text-gray-800">{faq.question}</span>
                    <span className="text-2xl text-gray-600">
                      {openQuestion === index ? '−' : '+'}
                    </span>
                  </button>
                  {openQuestion === index && (
                    <div className="px-4 pb-4">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Contact Card */}
          <div className="lg:w-80">
            <div className="bg-gray-50 p-6 rounded-3xl h-full flex flex-col justify-between border border-gray-100 shadow-sm">
              <div>
                {/* Envelope SVG Icon */}
                <div className="w-12 h-12 bg-[#0E1745]/5 rounded-2xl flex items-center justify-center text-[#0E1745] mb-6">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>

                {/* Card Content */}
                <h3 className="text-xl font-semibold text-[#0E1745] mb-3">Do you have more questions?</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-8">
                  If you have any other questions about volunteering, rehearsals, tickets, or partnerships, our team is here to help.
                </p>
              </div>

              {/* CTA Mail Link */}
              <a
                href="mailto:info@1000tongues.org"
                className="w-full bg-[#0E1745] text-white py-3.5 px-6 rounded-xl font-semibold hover:bg-[#1a255c] transition-all text-center block shadow-md hover:scale-[1.01]"
              >
                Shoot a Direct Mail
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
