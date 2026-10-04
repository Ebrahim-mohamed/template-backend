/**
 * DEFAULT CONTENT for the Services page.
 * (A copy lives in the frontend at app/lib/defaults/services.ts, keep them in sync.)
 */
module.exports = {
  seo: {
    title: '',
    description: '',
  },

  hero: {
    title: 'My Services',
    subtitle: '',
    desktopImage: '/assets/servicesPage.jpg',
    mobileImage: '/assets/servicesPage-mobile.jpg',
    overlayColor: '#000000',
    overlayOpacity: 0.57,
  },

  services: {
    visible: true,
    items: [
      {
        title: 'Business Development Courses',
        description:
          'Practical, industry-focused courses designed to build essential business skills and provide participants with the knowledge and tools they need to succeed.',
        image: '/assets/serv3.png',
        imageAlt: 'Mechanical Design',
        imageLeft: false,
        highlighted: false,
      },
      {
        title: 'Business Consulting',
        description:
          'Helping businesses identify opportunities, overcome challenges, and develop practical strategies for sustainable growth and improved performance.',
        image: '/assets/serv1.png',
        imageAlt: 'Structural Design',
        imageLeft: true,
        highlighted: true,
      },
      {
        title: 'Corporate Training',
        description:
          'Customized training programs designed for companies to strengthen their teams’ capabilities, improve performance, and develop essential business and leadership skills.',
        image: '/assets/serv4.png',
        imageAlt: 'Mechanical Design',
        imageLeft: false,
        highlighted: false,
      },
    ],
  },
};
