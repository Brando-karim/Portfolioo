import React from 'react';
import { FiBookOpen, FiCode, FiAward, FiUsers, FiLayers, FiZap } from 'react-icons/fi';

// Define the structure for a Carousel item
export interface CarouselItem {
  title: string;
  description: string;
  id: number;
  icon: React.ReactNode;
  image?: string; // add this
}

// Data for Certifications Carousel
export const certificationsData: CarouselItem[] = [

  {
    title: 'JavaScript Essentials',
    description: 'Cisco Networking Academy',
    id: 1,
    icon: <FiBookOpen className="h-[16px] w-[16px] text-white" /> ,
    image : './js.jpg'
  },
  {
    title: ' Essentials in Python',
    description: 'Cisco Networking Academy',
    id: 2,
    icon: <FiCode className="h-[16px] w-[16px] text-white" />,
    image : './cisco-banner.jpg'
  },
  {
    title: 'HTML Fundamentals',
    description: 'Cisco Networking Academy',
    id: 3,
    icon: <FiLayers className="h-[16px] w-[16px] text-white" />,
    image : './html5.jpg'
  }
];

// Data for Activities Carousel
export const activitiesData: CarouselItem[] = [
  {
    title: 'Participation IT-WAVE Meetup',
    description: 'Engaging with the tech community',
    id: 1,
    icon: <FiUsers className="h-[16px] w-[16px] text-white" />,
    image : './itwave.png'
  },
  {
    title: '8ème place Hackathon IT-WAVE',
    description: 'Achieved 8th place in the Hackathon',
    id: 2,
    icon: <FiAward className="h-[16px] w-[16px] text-white" />,
    image : './hackathon.jpg'
   
  },
  {
    title: 'Contributeur projet ENT®',
    description: 'Contributor to the ENT® project',
    id: 3,
    icon: <FiZap className="h-[16px] w-[16px] text-white" />,
    image : './all.jpeg'
  }
];
