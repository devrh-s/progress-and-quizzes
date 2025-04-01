
import React from 'react';

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  image: string;
}

export const Testimonial: React.FC<TestimonialProps> = ({ name, role, content, image }) => {
  return (
    <div className="fantasy-card p-6 animate-float">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-purple-500 bg-gradient-to-br from-purple-500/30 to-indigo-600/30">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="space-y-2">
          <p className="text-purple-100 italic">"{content}"</p>
          <div>
            <p className="text-white font-semibold">{name}</p>
            <p className="text-purple-300 text-sm">{role}</p>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full blur-xl"></div>
    </div>
  );
};
