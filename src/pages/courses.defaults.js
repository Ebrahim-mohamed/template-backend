/**
 * DEFAULT CONTENT for the Courses page.
 * (A copy lives in the frontend at app/lib/defaults/courses.ts, keep them in sync.)
 */
module.exports = {
  seo: {
    title: '',
    description: '',
  },

  hero: {
    title: 'My Courses',
    subtitle: '',
    desktopImage: '/assets/coursesPage.jpg',
    mobileImage: '/assets/coursesPage-mobile.jpg',
    overlayColor: '#000000',
    overlayOpacity: 0.57,
  },

  courses: {
    visible: true,
    items: [
      {
        title: 'Business Development for Engineers',
        description1: 'Real world case studies',
        description2:
          'Turn your technical expertise into revenue. This business development course transforms engineers into industry leaders and growth drivers.',
        description3:
          'Explore and analyze successful business development strategies from leading organizations with real world case studies',
        description4:
          'Reinforce learning through industry-relevant assignments, giving participants firsthand experience in applying concepts having practical assignments.',
        description5: 'Engage in activities designed to build and adapt approaches to real-world scenarios',
        image: '/assets/proj1.jpg',
        imageAlt: 'Smart Irrigation System - Bridge',
        meta: [
          { label: 'Date', value: '23rd of Aug' },
          { label: 'TimeLine', value: '3 Month' },
          { label: 'Location', value: 'Cairo Egypt' },
          { label: 'Budget', value: 'USD 12,000' },
        ],
      },
    ],
  },
};
