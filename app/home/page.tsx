'use client';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Modal from '@/Components/Modal';
import FormComponent from '@/Components/Form';
import ProfileIcon from '@/Components/ProfileIcon';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";



export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const words = ["Mood", "Location", "Budget"];
  const typingSpeed = 200;
  const erasingSpeed = 200;
  const delayBetweenWords = 500;
  const { data: session, status } = useSession();
  const router = useRouter();


  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const current = words[wordIndex];
      setCurrentWord(current.slice(0, charIndex) + (isDeleting ? '' : '|'));

      if (!isDeleting && charIndex === current.length) {
        setTimeout(() => {
          isDeleting = true;
        }, delayBetweenWords);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }

      charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

      setTimeout(type, isDeleting ? erasingSpeed : typingSpeed);
    };

    type();
  },[]);

  const handleStartPlanning = () => {
    setShowForm(true);
  };

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (!session || !session.user) {
      // Redirect to login page
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session || !session.user) {
    return null; // Render nothing while redirecting
  }

  const userId = session.user?.id ?? session.user?.name ?? 'User';

  return (
    <div className="background-pattern text-white flex flex-col items-center justify-center min-h-screen">
      <ProfileIcon userId={userId} />
      <Head>
        <title>Dates Finding</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
        <style>{`
          body {
            font-family: 'Roboto', sans-serif;
          }
          .background-pattern {
            background: url('https://www.transparenttextures.com/patterns/dark-matter.png');
          }
        `}</style>
      </Head>
      <div className="flex flex-col items-center justify-center lg:flex-row lg:items-center lg:justify-between lg:px-48 lg:py-24">
        <div className="text-center lg:text-left lg:max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold">Plan your Dates based on</h1>
          <h2 className="text-6xl md:text-8xl font-bold text-blue-400 mt-2 typing-demo">{currentWord}</h2>
          <p className="text-xl md:text-2l mt-4">Unleash Your Wanderlust with Date Buddy: Where Intelligent Planning Meets Limitless Adventure!</p>
          <button onClick={handleStartPlanning} className="mt-8 px-8 py-4 bg-purple-951 text-black rounded-full shadow-lg hover:bg-blue-900 font-bold">
            Find Dates
          </button>
        </div>
        
        <div className="mt-16 lg:mt-0 lg:ml-24">
          <div className="max-w-lg mx-auto rounded-lg p-1" style={{ background: 'conic-gradient(from 45deg, #38b2ac, #6b46c1, #4299e1, #ed64a6, #38b2ac)' }}>
            <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden border-1 border-transparent bg-clip-border">
              <img src="/static/1badd483 (1).png" alt="Fort Lewis Lodge & Farm" className="w-full h-full object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">Fort Lewis Lodge & Farm</h3>
                <p className="text-sm text-gray-400">Be Adventurous - Escape the city and spend time together in nature.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <FormComponent userId = {userId} />
      </Modal>
    </div>
  );
}
