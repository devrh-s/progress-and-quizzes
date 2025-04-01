
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TypingSpeedTest } from '@/components/TypingSpeedTest';
import { Testimonial } from '@/components/Testimonial';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden px-4">
      {/* Hero Section */}
      <div className="w-full max-w-6xl mt-20 md:mt-32 space-y-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white glow-text">
          Practical Guide for AI
        </h1>
        <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto">
          Master the art of using advanced AI tools for research through interactive learning and quizzes
        </p>
      </div>

      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(100)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4}px`,
              height: `${Math.random() * 4}px`,
              opacity: Math.random() * 0.7,
              animation: `twinkle ${Math.random() * 5 + 5}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Testimonials */}
      <div className="w-full max-w-6xl my-16 grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <Testimonial 
          name="Dr. Emily Chen"
          role="AI Research Scientist"
          image="/placeholder.svg"
          content="This guide transformed how I approach AI tools in my research. The interactive format made complex concepts easy to grasp."
        />
        <Testimonial 
          name="Marcus Johnson"
          role="Data Science Lead"
          image="/placeholder.svg"
          content="The quizzes helped solidify my understanding, and I've already implemented many of the techniques in my workflow."
        />
        <Testimonial 
          name="Sarah Williams"
          role="Technical Writer"
          image="/placeholder.svg"
          content="As someone new to AI, this guide provided exactly the structured approach I needed. My productivity has improved remarkably."
        />
      </div>

      {/* Typing Speed Test */}
      <div className="w-full max-w-4xl my-8 fantasy-card p-8 z-10">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Typing Speed Test</h2>
        <TypingSpeedTest />
      </div>

      {/* Call to Action */}
      <div className="my-12 z-10">
        <Link 
          to="/guide" 
          className="magical-border px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg rounded-lg transition transform hover:scale-105 inline-block"
        >
          Start Guide
        </Link>
      </div>

      {/* Footer */}
      <div className="w-full text-center text-purple-300 text-sm py-8">
        © 2023 Practical Guide for AI. All rights reserved.
      </div>
    </div>
  );
};

export default Index;
