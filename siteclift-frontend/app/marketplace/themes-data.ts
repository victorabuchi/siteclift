export interface Theme {
  slug: string;
  name: string;
  category: string;
  price: number;
  featured: boolean;
  rating: number;
  description: string;
  features: string[];
  colors: { from: string; to: string };
}

export const themes: Theme[] = [
  {
    slug: 'restaurant-pro',
    name: 'RestaurantPro',
    category: 'Restaurant',
    price: 29,
    featured: true,
    rating: 4.9,
    description:
      'A rich, appetizing theme built for restaurants and cafes. Features a full-screen hero with dish photography, an online menu with categories, and a reservation booking section.',
    features: [
      'Full-screen hero with food photography',
      'Online menu with categories and prices',
      'Reservation and booking section',
      'Google Maps integration',
      'Mobile optimized layout',
      'Gallery for ambiance photos',
    ],
    colors: { from: '#ff6b6b', to: '#ffa726' },
  },
  {
    slug: 'clinic-care',
    name: 'ClinicCare',
    category: 'Clinic',
    price: 0,
    featured: false,
    rating: 4.7,
    description:
      'A clean, professional theme for medical clinics and healthcare providers. Builds trust with patients through a calm, approachable design and clear service listings.',
    features: [
      'Doctor and team profiles',
      'Services and treatments listing',
      'Appointment request form',
      'Patient testimonials section',
      'Opening hours display',
      'Insurance information page',
    ],
    colors: { from: '#4fc3f7', to: '#26c6da' },
  },
  {
    slug: 'lexa-law',
    name: 'LexaLaw',
    category: 'Law Firm',
    price: 49,
    featured: true,
    rating: 4.8,
    description:
      'A sophisticated, authoritative theme for law firms and legal practices. Projects credibility and expertise with a dark, premium aesthetic and structured content layout.',
    features: [
      'Practice areas detail pages',
      'Attorney profiles with credentials',
      'Case results and testimonials',
      'Contact and consultation form',
      'Legal blog and articles section',
      'Multi-location office pages',
    ],
    colors: { from: '#546e7a', to: '#37474f' },
  },
  {
    slug: 'fit-zone',
    name: 'FitZone',
    category: 'Gym',
    price: 19,
    featured: false,
    rating: 4.6,
    description:
      'A high-energy, bold theme for gyms and fitness studios. Motivates visitors with strong typography, class schedule integration, and membership plan comparisons.',
    features: [
      'Class schedule and timetable',
      'Membership plans comparison',
      'Trainer profiles and bios',
      'Before and after gallery',
      'Workout tips blog',
      'Location and contact map',
    ],
    colors: { from: '#ff5722', to: '#bf360c' },
  },
  {
    slug: 'portfolio-x',
    name: 'PortfolioX',
    category: 'Portfolio',
    price: 0,
    featured: false,
    rating: 4.7,
    description:
      'A minimal, elegant portfolio theme for creatives and freelancers. Puts your work front and center with a full-width project grid and smooth transitions.',
    features: [
      'Filterable project grid',
      'Full-screen project detail pages',
      'About and skills section',
      'Client testimonials',
      'Contact and inquiry form',
      'Resume download link',
    ],
    colors: { from: '#7e57c2', to: '#5c6bc0' },
  },
  {
    slug: 'shop-base',
    name: 'ShopBase',
    category: 'eCommerce',
    price: 39,
    featured: true,
    rating: 4.9,
    description:
      'A conversion-focused eCommerce theme for online stores. Designed to drive sales with a clean product grid, promotional banners, and a streamlined checkout flow.',
    features: [
      'Product catalog with filtering',
      'Promotional banner sections',
      'Featured collections display',
      'Customer reviews integration',
      'Shopping cart and wishlist',
      'Mobile-first checkout flow',
    ],
    colors: { from: '#66bb6a', to: '#26a69a' },
  },
  {
    slug: 'prop-view',
    name: 'PropView',
    category: 'Real Estate',
    price: 29,
    featured: false,
    rating: 4.8,
    description:
      'A professional theme for real estate agencies and property listings. Showcases properties with high-quality image galleries and interactive search filters.',
    features: [
      'Property listing grid and map view',
      'Advanced search and filters',
      'Individual property detail pages',
      'Agent profile pages',
      'Mortgage calculator widget',
      'Neighborhood information sections',
    ],
    colors: { from: '#42a5f5', to: '#1565c0' },
  },
  {
    slug: 'luxe-hotel',
    name: 'LuxeHotel',
    category: 'Hotel',
    price: 59,
    featured: true,
    rating: 5.0,
    description:
      'A five-star hotel theme that exudes luxury and elegance. Full-screen room galleries, immersive booking flows, and curated amenity showcases create an unforgettable first impression.',
    features: [
      'Full-screen room gallery and booking',
      'Amenities and facilities showcase',
      'Restaurant and dining section',
      'Spa and wellness pages',
      'Events and wedding packages',
      'Guest reviews and awards display',
    ],
    colors: { from: '#ffca28', to: '#ff8f00' },
  },
  {
    slug: 'glow-beauty',
    name: 'GlowBeauty',
    category: 'Beauty Salon',
    price: 19,
    featured: false,
    rating: 4.7,
    description:
      'A warm, radiant theme for beauty salons, spas, and wellness studios. Feminine and inviting with a soft color palette and a clear service menu display.',
    features: [
      'Service menu with pricing',
      'Online appointment booking',
      'Stylist and therapist profiles',
      'Before and after photo gallery',
      'Gift cards and promotions',
      'Product recommendations',
    ],
    colors: { from: '#f48fb1', to: '#ce93d8' },
  },
  {
    slug: 'edu-learn',
    name: 'EduLearn',
    category: 'Education',
    price: 0,
    featured: false,
    rating: 4.6,
    description:
      'A structured, easy-to-navigate theme for schools, tutors, and e-learning platforms. Presents courses, instructors, and testimonials in a clear and engaging layout.',
    features: [
      'Course catalog with categories',
      'Instructor profile pages',
      'Student testimonials section',
      'Event and webinar schedule',
      'FAQ and resources section',
      'Newsletter signup integration',
    ],
    colors: { from: '#5c6bc0', to: '#42a5f5' },
  },
  {
    slug: 'launch-pad',
    name: 'LaunchPad',
    category: 'Tech Startup',
    price: 39,
    featured: false,
    rating: 4.8,
    description:
      'A sharp, modern theme for tech startups and SaaS products. Feature comparisons, pricing tables, and a bold hero section drive signups and conversions.',
    features: [
      'Feature highlight sections',
      'Pricing and plan comparison table',
      'Customer logos and social proof',
      'Product screenshots and demos',
      'Team and investor pages',
      'Blog and updates section',
    ],
    colors: { from: '#1a237e', to: '#1565c0' },
  },
  {
    slug: 'snap-folio',
    name: 'SnapFolio',
    category: 'Photography',
    price: 29,
    featured: false,
    rating: 4.7,
    description:
      'A dark, dramatic portfolio theme built for photographers. Full-bleed galleries, project case studies, and print shop integration let your images speak for themselves.',
    features: [
      'Full-bleed photo galleries',
      'Project and shoot case studies',
      'Booking and inquiry form',
      'Print shop integration',
      'Client proof galleries',
      'Awards and press section',
    ],
    colors: { from: '#37474f', to: '#546e7a' },
  },
];

export const categories = [
  'All',
  'Restaurant',
  'Clinic',
  'Law Firm',
  'Gym',
  'Portfolio',
  'eCommerce',
  'Real Estate',
  'Hotel',
  'Beauty Salon',
  'Education',
  'Tech Startup',
  'Photography',
  'Wedding',
  'Nonprofit',
];
