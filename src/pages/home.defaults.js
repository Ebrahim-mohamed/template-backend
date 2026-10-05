/**
 * DEFAULT CONTENT for the Home page.
 * This is exactly what visitors see when the database is empty or unreachable,
 * and it is also the "shape" that saved content is validated against.
 * (A copy lives in the frontend at app/lib/defaults/home.ts, keep them in sync.)
 */
module.exports = {
  seo: {
    title: '',
    description: '',
  },

  hero: {
    title: 'Scaling Businesses',
    subtitle: '',
    desktopImage: '/assets/homePage.jpg',
    mobileImage: '/assets/homePage-mobile.jpg',
    overlayColor: '#000000',
    overlayOpacity: 0.57,
  },

  about: {
    visible: true,
    sectionBg: '#1A1916',
    panelBg: '#FFFFFF',
    cardBg: '#E9E9E9',
    image: '/assets/HomeAbout.jpeg',
    imageAlt: 'about image',
    heading: 'About',
    headline: 'Empowering Engineers. Building Leaders. Driving Professional Growth.',
    paragraphs: [
      {
        text: 'With over 10 years of experience in business development and entrepreneurship, I combine engineering expertise with practical business knowledge to help engineers develop the skills they need to lead businesses and advance their professional careers.',
      },
      {
        text: 'Through specialized courses and practical training, I help engineers understand how to lead teams, manage businesses, identify new opportunities, make effective business decisions, and build the mindset needed for long-term professional success.',
      },
      {
        text: 'My mission is to bridge the gap between engineering expertise and business leadership — empowering engineers to become confident leaders, build successful businesses, and achieve sustainable professional growth.',
      },
    ],
  },

  services: {
    visible: true,
    bgColor: '#1A1916',
    accentColor: '#C8A96E',
    headingAccent: 'Services',
    headingRest: 'I offer',
    description:
      'Explore the range of services we offer, including business courses for engineers to develop their skills and advance their careers. We also collaborate with companies to improve business results, develop their employees, and create sustainable professional growth.',
    buttonText: 'Learn More',
    buttonLink: '/services',
    mainService: {
      head: 'Business Development Courses',
      pra: 'Practical, industry-focused courses designed to build essential business skills and provide participants with the knowledge and tools they need to succeed.',
      icon: '/assets/servicesPage/serv3.png',
    },
    items: [
      {
        head: 'Business Consulting',
        pra: 'Helping businesses identify opportunities, overcome challenges, and develop practical strategies for sustainable growth and improved performance.',
        icon: '/assets/servicesPage/serv1.jpg',
      },
      {
        head: 'Corporate Training',
        pra: 'Customized training programs designed for companies to strengthen their teams’ capabilities, improve performance, and develop essential business and leadership skills.',
        icon: '/assets/servicesPage/serv4.jpg',
      },
    ],
  },

  contact: {
    visible: true,
    bgColor: '#FFFFFF',
    textColor: '#000000',
    showStatus: true,
    statusText: 'Available For Work',
    statusColor: '#00D720',
    headingLine1: 'Let’s scale business',
    headingLine2: 'Together',
    buttonText: 'Let’s Talk',
    buttonLink: '/contact',
    buttonBg: '#000000',
    buttonTextColor: '#FFFFFF',
  },
};
