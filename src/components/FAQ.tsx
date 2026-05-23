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
      answer: "Our vision is to create a historic moment of unified worship in London, bringing together diverse voices to exalt Jesus Christ through the power of collective praise."
    },
    {
      question: "Can I volunteer to help with the event?",
      answer: "Yes! We welcome volunteers in various capacities including event coordination, technical support, hospitality, and more. Volunteer applications will open soon."
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
            <div className="bg-gray-50 p-6 rounded-lg h-full flex flex-col justify-between">
              <div>
                {/* Profile Image Placeholder */}
                <div className="w-16 h-16 bg-black rounded-lg mb-6"></div>
                
                {/* Card Content */}
                <h3 className="text-xl font-bold text-gray-800 mb-4">Do you have more questions?</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-8">
                  End-to-end payments and financial management in a single solution. Meet the right platform to help realize.
                </p>
              </div>
              
              {/* CTA Button - Positioned at bottom */}
              <button className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-black transition-colors mt-auto">
                <a href="mailto:info@1000tongues.org">Shoot a Direct Mail</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
