'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation';
import { themes } from '../themes-data';

const C = {
  dark: '#1a1a2e',
  amber: '#f59e0b',
  amberHover: '#d97706',
  amberLight: '#fffbeb',
  amberBorder: '#fde68a',
  bg: '#f8fafc',
  white: '#ffffff',
  border: '#e2e8f0',
  muted: '#64748b',
  text: '#374151',
  green: '#16a34a',
};

const HERO_IMAGES: Record<string, string> = {
  Restaurant: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1400&q=85',
  Clinic: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=85',
  'Law Firm': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1400&q=85',
  Gym: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&q=85',
  Portfolio: 'https://images.unsplash.com/photo-1545665277-5937489579f2?w=1400&q=85',
  eCommerce: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&q=85',
  'Real Estate': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=85',
  Hotel: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=85',
  'Beauty Salon': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1400&q=85',
  Education: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1400&q=85',
  'Tech Startup': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&q=85',
  Photography: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1400&q=85',
};

const SCREENSHOT_IMAGES: Record<string, [string, string, string]> = {
  Restaurant: [
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    'https://images.unsplash.com/photo-1540189549336-e6e99eb4b65b?w=600&q=80',
  ],
  Clinic: [
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80',
    'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=600&q=80',
    'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80',
  ],
  'Law Firm': [
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
  ],
  Gym: [
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80',
    'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80',
  ],
  Portfolio: [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=600&q=80',
    'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=600&q=80',
  ],
  eCommerce: [
    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&q=80',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80',
  ],
  'Real Estate': [
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80',
  ],
  Hotel: [
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=80',
    'https://images.unsplash.com/photo-1455587734955-081b22074882?w=600&q=80',
  ],
  'Beauty Salon': [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80',
    'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80',
    'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&q=80',
  ],
  Education: [
    'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&q=80',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80',
  ],
  'Tech Startup': [
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&q=80',
    'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80',
  ],
  Photography: [
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80',
    'https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?w=600&q=80',
    'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=80',
  ],
};

type FeatureGroup = { heading: string; bullets: string[] };

const FEATURE_CATEGORIES: Record<string, FeatureGroup[]> = {
  Restaurant: [
    { heading: 'Menu & Ordering', bullets: ['Digital menu with categories', 'Daily specials display', 'Dietary labels (vegan, GF)', 'Custom pricing sections', 'Multiple cuisine sections'] },
    { heading: 'Reservations & Events', bullets: ['Online booking form', 'Party size selector', 'Private dining pages', 'Events and catering info', 'Confirmation flows'] },
    { heading: 'Gallery & Story', bullets: ['Full-screen food photography', 'Chef spotlight pages', 'Behind-the-scenes content', 'Seasonal menu launches', 'Ambiance photo gallery'] },
    { heading: 'Business & SEO', bullets: ['Google Maps embed', 'Opening hours widget', 'Social media integration', 'Local SEO settings', 'Review aggregation'] },
  ],
  Clinic: [
    { heading: 'Patient Services', bullets: ['Services & treatments catalog', 'Insurance information', 'Patient forms download', 'Opening hours widget', 'Emergency contact section'] },
    { heading: 'Team Profiles', bullets: ['Doctor bios with credentials', 'Specialties listing', 'Professional certifications', 'Department pages', 'Reception team intro'] },
    { heading: 'Appointments', bullets: ['Online booking form', 'Multiple location selection', 'Teleconsultation info', 'Appointment reminders', 'Waitlist management'] },
    { heading: 'Trust & Compliance', bullets: ['Patient testimonials', 'Awards & accreditations', 'Privacy compliance pages', 'Medical disclaimers', 'FAQs for patients'] },
  ],
  'Law Firm': [
    { heading: 'Practice Areas', bullets: ['Custom pages per practice area', 'Legal process overviews', 'Fee structure information', 'Jurisdiction details', 'Case type descriptions'] },
    { heading: 'Attorney Profiles', bullets: ['Bio pages with credentials', 'Bar admissions listed', 'Publications and speaking', 'Direct contact per attorney', 'Case history display'] },
    { heading: 'Client Resources', bullets: ['Legal guides and articles', 'Case results section', 'Initial consultation form', 'Resource library', 'Detailed FAQs'] },
    { heading: 'Authority & Trust', bullets: ['Awards and recognitions', 'Bar association logos', 'Media appearances', 'Case success metrics', 'Client testimonials'] },
  ],
  Gym: [
    { heading: 'Classes & Schedule', bullets: ['Live class timetable', 'Category filters (cardio, yoga)', 'Class descriptions', 'Instructor-led tags', 'Difficulty levels'] },
    { heading: 'Membership Plans', bullets: ['Tiered pricing display', 'Plan comparison table', 'Free trial highlight', 'Corporate packages', 'Annual vs monthly billing'] },
    { heading: 'Trainers & Community', bullets: ['Trainer profile pages', 'Transformation gallery', 'Member spotlight section', 'Community blog', 'Challenges & events'] },
    { heading: 'Facilities', bullets: ['Equipment photo gallery', 'Studio virtual tour', 'Location and parking', 'Opening hours display', 'Amenity icons overview'] },
  ],
  Portfolio: [
    { heading: 'Work Showcase', bullets: ['Filterable project grid', 'Full-screen project pages', 'Category sorting', 'Client name display', 'Project year tags'] },
    { heading: 'About & Skills', bullets: ['Personal bio section', 'Skills and tools display', 'Resume download link', 'Expertise highlights', 'Education section'] },
    { heading: 'Client Engagement', bullets: ['Contact and inquiry form', 'Service pricing packages', 'Testimonials and endorsements', 'Social proof metrics', 'Availability status'] },
    { heading: 'Content & Extras', bullets: ['Blog and journal', 'Press and features', 'Awards section', 'Process walkthrough', 'Social media integration'] },
  ],
  eCommerce: [
    { heading: 'Product Catalog', bullets: ['Category and collection pages', 'Advanced filtering and sorting', 'Product variant support', 'Image zoom on hover', 'Related product suggestions'] },
    { heading: 'Conversion Tools', bullets: ['Promotional banner sections', 'Countdown timers', 'Bundle offer displays', 'Discount code field', 'Urgency indicators'] },
    { heading: 'Checkout Flow', bullets: ['Single-page streamlined checkout', 'Guest checkout option', 'Multiple payment methods', 'Order summary sidebar', 'Mobile checkout flow'] },
    { heading: 'Customer Experience', bullets: ['Wishlist and save-for-later', 'Product reviews with photos', 'Order tracking page', 'Return policy section', 'Live chat widget area'] },
  ],
  'Real Estate': [
    { heading: 'Listings', bullets: ['Property grid and list views', 'Advanced search and filters', 'Interactive map view', 'Price and size filters', 'New listing badges'] },
    { heading: 'Property Detail', bullets: ['Full-screen photo galleries', 'Virtual tour integration', 'Floor plan display', 'Mortgage calculator', 'Neighbourhood information'] },
    { heading: 'Agent Profiles', bullets: ['Agent bio and credentials', 'Listings per agent', 'Contact and inquiry form', 'Social media links', 'Client review display'] },
    { heading: 'Market Insights', bullets: ['Market stats section', 'Blog with property tips', 'Buyer guide pages', 'Seller resources', 'Finance and mortgage guides'] },
  ],
  Hotel: [
    { heading: 'Rooms & Suites', bullets: ['Room catalog with filtering', 'Full-screen gallery per room', 'Amenity icons and lists', 'Bed configuration display', 'Accessibility information'] },
    { heading: 'Booking & Rates', bullets: ['Availability widget', 'Rate comparison display', 'Seasonal pricing sections', 'Package and deal highlights', 'Group booking form'] },
    { heading: 'Dining & Wellness', bullets: ['Restaurant and bar pages', 'Spa booking section', 'Pool and fitness info', 'Breakfast and dining options', 'Room service details'] },
    { heading: 'Events & Experiences', bullets: ['Wedding packages page', 'Conference and meeting rooms', 'Local attractions guide', 'Concierge services page', 'Guest testimonials display'] },
  ],
  'Beauty Salon': [
    { heading: 'Services', bullets: ['Full service menu with pricing', 'Category tabs (hair, nails, etc.)', 'Treatment duration display', 'Add-on services listing', 'Group booking information'] },
    { heading: 'Online Booking', bullets: ['Appointment request form', 'Stylist selection', 'Date and time picker', 'Confirmation and reminders', 'Cancellation policy section'] },
    { heading: 'Team Profiles', bullets: ['Stylist pages with specialties', 'Portfolio gallery per stylist', 'Certifications and training', 'Social media integration', 'Client reviews per stylist'] },
    { heading: 'Retail & Loyalty', bullets: ['Product recommendations', 'Gift card purchase', 'Seasonal promotions', 'Loyalty programme info', 'Referral scheme display'] },
  ],
  Education: [
    { heading: 'Courses', bullets: ['Course catalog with search', 'Category filtering', 'Difficulty and duration labels', 'Instructor info per course', 'Enrollment CTA'] },
    { heading: 'Learning Experience', bullets: ['Sample lesson previews', 'Curriculum overview', 'Certificate showcase', 'Progress tracking info', 'Learning paths'] },
    { heading: 'Instructors', bullets: ['Instructor bio pages', 'Credentials and experience', 'Course listings per instructor', 'Student reviews', 'Office hours display'] },
    { heading: 'Engagement', bullets: ['Student testimonials', 'Success stories', 'Community forum link', 'Scholarship information', 'Newsletter integration'] },
  ],
  'Tech Startup': [
    { heading: 'Product Features', bullets: ['Highlighted feature sections', 'Use case pages', 'Interactive demo embeds', 'Integration listings', 'Screenshot showcases'] },
    { heading: 'Pricing & Plans', bullets: ['Transparent pricing table', 'Feature comparison matrix', 'Free vs paid tiers', 'Enterprise contact form', 'Annual billing savings'] },
    { heading: 'Social Proof', bullets: ['Customer logo section', 'Case study pages', 'User testimonials', 'Review badge displays', 'Usage statistics section'] },
    { heading: 'Content & Growth', bullets: ['Product blog and updates', 'Changelog page', 'Documentation link', 'Video library section', 'Webinars and events'] },
  ],
  Photography: [
    { heading: 'Portfolio', bullets: ['Full-screen photo galleries', 'Project case studies', 'Category pages per genre', 'Client proofing portal', 'Print shop integration'] },
    { heading: 'Services', bullets: ['Photography packages', 'Pricing and inclusions', 'Booking request form', 'Turnaround time info', 'Licensing information'] },
    { heading: 'About', bullets: ['Photographer bio', 'Equipment list', 'Shooting style overview', 'Press and features', 'Awards and recognition'] },
    { heading: 'Client Experience', bullets: ['Consultation form', 'Delivery timeline', 'Testimonials display', 'Referral programme', 'Contract information'] },
  ],
};

type Review = { name: string; date: string; text: string };

const CATEGORY_REVIEWS: Record<string, Review[]> = {
  Restaurant: [
    { name: 'Marco T.', date: 'Apr 2026', text: 'Our reservation bookings tripled in the first month. The online menu section is incredibly easy to update and our regulars love the fresh look.' },
    { name: 'Sarah K.', date: 'Mar 2026', text: 'Set up in under two hours and the results look amazing. The food photography sections really make our dishes shine and do the selling for us.' },
    { name: 'James O.', date: 'Feb 2026', text: 'Switched from a custom-built site and haven\'t looked back. The Google Maps embed and opening hours widget save us so many phone calls a day.' },
    { name: 'Priya M.', date: 'Jan 2026', text: 'The mobile layout is stunning. More than half our customers browse on their phones and we\'re converting them at a much higher rate now.' },
  ],
  Clinic: [
    { name: 'Dr. Anya P.', date: 'Apr 2026', text: 'Patients frequently compliment our website. The services listing and appointment form have meaningfully streamlined our intake process.' },
    { name: 'Tom R.', date: 'Mar 2026', text: 'The trust signals built into this theme — testimonials, certifications, calm layout — have noticeably increased consultation bookings week on week.' },
    { name: 'Fatima Z.', date: 'Feb 2026', text: 'Our old site looked outdated and clinical in the wrong way. This theme is professional yet warm. Patients feel reassured before they even arrive.' },
    { name: 'Liam C.', date: 'Jan 2026', text: 'The opening hours widget and team profiles were exactly what we needed. Setup was straightforward and the outcome looks truly professional.' },
  ],
  'Law Firm': [
    { name: 'David H.', date: 'Apr 2026', text: 'The authoritative aesthetic was precisely what our firm needed. Client enquiries via the contact form have increased considerably since launch.' },
    { name: 'Rachel B.', date: 'Mar 2026', text: 'Practice areas pages, attorney profiles, and case testimonials all look exactly as expected of a top-tier firm. A worthwhile investment.' },
    { name: 'Chen W.', date: 'Feb 2026', text: 'A senior partner at a peer firm complimented our new website unprompted. That kind of external validation says everything.' },
    { name: 'Laura M.', date: 'Jan 2026', text: 'Deploying was surprisingly straightforward. Content sections are thoughtfully structured and required minimal customisation from us.' },
  ],
  Gym: [
    { name: 'Mike F.', date: 'Apr 2026', text: 'New member signups are up 40% since we launched this theme. The class schedule and pricing sections do all the selling before people even call us.' },
    { name: 'Keisha D.', date: 'Mar 2026', text: 'Our trainers love their profile pages. The transformation gallery has been fantastic for social proof and drives genuine interest from new visitors.' },
    { name: 'Jack T.', date: 'Feb 2026', text: 'Clean, high-energy design that matches our brand perfectly. The mobile layout is buttery smooth and members use it every day to check the timetable.' },
    { name: 'Yuki S.', date: 'Jan 2026', text: 'Setting up the class timetable took under an hour. Members now check it online daily rather than calling the front desk — huge time saver.' },
  ],
  Portfolio: [
    { name: 'Ella C.', date: 'Apr 2026', text: 'Clients consistently comment on how impressive my portfolio looks. Inquiries have doubled since I switched and my average project value has risen too.' },
    { name: 'Noah B.', date: 'Mar 2026', text: 'The filterable project grid is exactly what I wanted. Prospective clients can find relevant work within seconds, which makes conversations much more efficient.' },
    { name: 'Sofia D.', date: 'Feb 2026', text: 'The minimal, elegant design lets my work breathe. No distractions, just clean presentation. Several clients have said it\'s the best portfolio they\'ve seen.' },
    { name: 'Rajan P.', date: 'Jan 2026', text: 'Contact form submissions tripled. The professional feel gave me confidence to raise my rates and clients haven\'t pushed back once.' },
  ],
  eCommerce: [
    { name: 'Hannah L.', date: 'Apr 2026', text: 'Conversion rate improved by 22% in the first quarter after switching. The checkout flow is smooth and the product grid is absolutely gorgeous on mobile.' },
    { name: 'Omar K.', date: 'Mar 2026', text: 'The promotional banner section makes running flash sales effortless. Customers notice every new campaign immediately and respond with urgency.' },
    { name: 'Zoe A.', date: 'Feb 2026', text: 'The mobile-first checkout is brilliant. Most of our sales now come from phones and the experience is completely frictionless end to end.' },
    { name: 'Ben C.', date: 'Jan 2026', text: 'Product filtering and collection pages are exactly what a growing store needs. Setup was fast and the results look as professional as major brands.' },
  ],
  'Real Estate': [
    { name: 'Diana F.', date: 'Apr 2026', text: 'Our listings have never looked better. The interactive map view and advanced filters keep visitors engaged far longer than our previous site ever did.' },
    { name: 'Carlos R.', date: 'Mar 2026', text: 'Agent profile pages and individual property pages gave our team a much more professional presence online. Qualified leads increased noticeably.' },
    { name: 'Maya S.', date: 'Feb 2026', text: 'The mortgage calculator widget alone has generated multiple enquiries from buyers who weren\'t sure they could afford the market. Smart, practical feature.' },
    { name: 'Tom H.', date: 'Jan 2026', text: 'Neighbourhood information sections set our listings apart. Buyers appreciate the context before scheduling viewings, which means better qualified appointments.' },
  ],
  Hotel: [
    { name: 'Isabella T.', date: 'Apr 2026', text: 'Direct bookings increased by 35% within 60 days of launch. The room gallery and booking section are absolutely stunning and guests comment on it.' },
    { name: 'Raj N.', date: 'Mar 2026', text: 'Guests often tell us our website convinced them to choose us over a larger chain. The theme sets exactly the right tone of quiet luxury.' },
    { name: 'Claire M.', date: 'Feb 2026', text: 'The events and wedding packages page has been a genuine game-changer for our events business. Enquiries we never received before now arrive weekly.' },
    { name: 'Paul G.', date: 'Jan 2026', text: 'The amenities showcase and dining sections paint a complete picture. Guests arrive with accurate expectations — which we consistently exceed.' },
  ],
  'Beauty Salon': [
    { name: 'Mia R.', date: 'Apr 2026', text: 'Online bookings now account for 70% of our appointments. The stylist selection feature makes clients feel special and invested before they even arrive.' },
    { name: 'Jade O.', date: 'Mar 2026', text: 'The before-and-after gallery has become our single best marketing tool. New clients frequently say those photos alone convinced them to book with us.' },
    { name: 'Serena K.', date: 'Feb 2026', text: 'Gift card integration and seasonal promotions have driven meaningful additional revenue without any extra overhead. Setup was genuinely effortless.' },
    { name: 'Amy L.', date: 'Jan 2026', text: 'The clear service menu with pricing has cut inbound "how much does X cost?" calls dramatically. More time for clients and far less admin.' },
  ],
  Education: [
    { name: 'Dr. Femi A.', date: 'Apr 2026', text: 'Student enrolment is up 30% since we redesigned with EduLearn. The course catalog and instructor pages present us at a level that inspires confidence.' },
    { name: 'Nina V.', date: 'Mar 2026', text: 'Parents and students alike compliment the clean, easy-to-navigate layout. Finding course information has never been simpler for prospective students.' },
    { name: 'Ethan C.', date: 'Feb 2026', text: 'The event and webinar schedule section transformed how we communicate upcoming sessions. Attendance increased significantly after launch.' },
    { name: 'Lydia W.', date: 'Jan 2026', text: 'Newsletter signup integration has grown our subscriber list substantially. It\'s now a direct, reliable line to prospective students every month.' },
  ],
  'Tech Startup': [
    { name: 'Chris B.', date: 'Apr 2026', text: 'Trial signups increased by 60% in the first month. The pricing table and feature comparison sections do an incredible job of converting sceptical visitors.' },
    { name: 'Aisha M.', date: 'Mar 2026', text: 'Customer logos and case studies built the social proof we needed to compete with established players in our space. LaunchPad delivers on every front.' },
    { name: 'Derek P.', date: 'Feb 2026', text: 'The product screenshot sections communicate our value proposition with clarity. Sales cycles have shortened noticeably since we switched themes.' },
    { name: 'Mei L.', date: 'Jan 2026', text: 'A professional, sharp design that gives us credibility with enterprise clients. The investment paid for itself in the first week after launch.' },
  ],
  Photography: [
    { name: 'Alex T.', date: 'Apr 2026', text: 'My booking rate doubled within two months of switching to SnapFolio. The full-bleed galleries are breathtaking and clients share the link constantly.' },
    { name: 'Jamie K.', date: 'Mar 2026', text: 'Client proof galleries completely eliminated the back-and-forth email chains. Clients select their images directly online, saving hours of my time.' },
    { name: 'Hana W.', date: 'Feb 2026', text: 'The print shop integration added a revenue stream I didn\'t have before. Setup was seamless and my first print sale came within a week of going live.' },
    { name: 'Sam R.', date: 'Jan 2026', text: 'The dark, dramatic aesthetic is perfect for my work. Several other photographers have asked which theme I\'m using — always a good sign.' },
  ],
};

const STORE_NAMES: Record<string, string[]> = {
  Restaurant: ['The Copper Table', 'Saffron & Salt', 'Bistro Lucerne', 'The Garden Fork'],
  Clinic: ['Meridian Health', 'Clearwell Clinic', 'Apex Medical Centre', 'Nova Care'],
  'Law Firm': ['Hartley & Associates', 'Vance Legal Group', 'Meridian Chambers', 'Cross & Powell LLP'],
  Gym: ['Iron Republic Gym', 'Peak Fitness Studio', 'CrossPulse Training', 'Velocity Gym'],
  Portfolio: ['Studio by Daniel', 'Elara Creative', 'Finn & Co Design', 'Lara Mesh Studio'],
  eCommerce: ['Birch & Bloom', 'The Modern Market', 'Crest & Goods', 'Paloma Store'],
  'Real Estate': ['Elevate Properties', 'Keystone Realty', 'The Park Group', 'Summit Homes'],
  Hotel: ['The Alderton Hotel', 'Crest & Suites', 'Lakeview Grand', 'The Meridian'],
  'Beauty Salon': ['Glow & Bloom Studio', 'Pure Aesthetics', 'Velvet & Stone', 'The Glow Room'],
  Education: ['Brightside Academy', 'Nova Learning Hub', 'Ignite Tutors', 'The Skill Space'],
  'Tech Startup': ['Orion SaaS', 'Volt Analytics', 'Nutura AI', 'Forge Platform'],
  Photography: ['Frame & Light Studio', 'Captured by Anya', 'Haze & Bloom Photography', 'Still Motion Co'],
};

const TABS = ['Overview', 'Features', 'Reviews'] as const;

export default function ThemeDetailPage() {
  const params = useParams<{ slug: string }>();
  const theme = themes.find((t) => t.slug === params?.slug);

  if (!theme) {
    notFound();
  }

  const [activeTab, setActiveTab] = useState<string>('Overview');
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'mobile'>('desktop');

  const overviewRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  function scrollToTab(tab: string) {
    setActiveTab(tab);
    const OFFSET = 130;
    const ref =
      tab === 'Overview' ? overviewRef : tab === 'Features' ? featuresRef : reviewsRef;
    if (!ref.current) return;
    const top = ref.current.getBoundingClientRect().top + window.pageYOffset - OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  const heroImg = HERO_IMAGES[theme.category] ?? HERO_IMAGES.Restaurant;
  const screenshots = SCREENSHOT_IMAGES[theme.category] ?? SCREENSHOT_IMAGES.Restaurant;
  const featureGroups = FEATURE_CATEGORIES[theme.category] ?? FEATURE_CATEGORIES.Restaurant;
  const reviews = CATEGORY_REVIEWS[theme.category] ?? CATEGORY_REVIEWS.Restaurant;
  const storeNames = STORE_NAMES[theme.category] ?? STORE_NAMES.Restaurant;

  const priceLabel = theme.price === 0 ? 'Free' : `€${theme.price}`;

  const PURCHASE_CHECKLIST = [
    'Instant setup — live in minutes',
    'Mobile responsive out of the box',
    'SEO optimized from day one',
    'Free theme updates included',
    'Content migration on switch',
  ];

  return (
    <div style={{ background: C.bg, minHeight: 'calc(100vh - 60px)' }}>

      {/* 1 — STICKY TOP BAR */}
      <div
        style={{
          position: 'sticky',
          top: '60px',
          zIndex: 50,
          background: C.white,
          borderBottom: `1px solid ${C.border}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 32px',
          height: '60px',
          gap: '16px',
        }}
      >
        <span style={{ fontSize: '16px', fontWeight: 700, color: C.dark, flex: '0 0 auto' }}>
          {theme.name}
        </span>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <span
            style={{
              fontSize: '18px',
              fontWeight: 800,
              color: theme.price === 0 ? C.green : C.dark,
            }}
          >
            {priceLabel}
          </span>
          {theme.price > 0 && (
            <span style={{ fontSize: '12px', color: C.muted, marginLeft: '6px' }}>
              one-time
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: '10px', flex: '0 0 auto' }}>
          <Link
            href={`/marketplace/${theme.slug}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8px 18px',
              border: `1px solid ${C.dark}`,
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              color: C.dark,
              textDecoration: 'none',
              background: C.white,
            }}
          >
            View demo
          </Link>
          <Link
            href={`/login?theme=${theme.slug}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8px 18px',
              background: C.amber,
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 700,
              color: C.white,
              textDecoration: 'none',
              border: 'none',
            }}
          >
            Use this theme
          </Link>
        </div>
      </div>

      {/* 2 — HERO SECTION */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '500px',
          overflow: 'hidden',
          background: C.dark,
        }}
      >
        {activeDevice === 'desktop' ? (
          <Image
            src={heroImg}
            alt={`${theme.name} preview`}
            fill
            style={{ objectFit: 'cover', opacity: 0.92 }}
            priority
            sizes="100vw"
          />
        ) : (
          <>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(135deg, ${theme.colors.from}22, ${theme.colors.to}44)`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '200px',
                height: '380px',
                background: C.white,
                borderRadius: '24px',
                boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
                overflow: 'hidden',
                border: `3px solid ${C.dark}`,
              }}
            >
              <div
                style={{
                  height: '28px',
                  background: C.dark,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '5px',
                    background: 'rgba(255,255,255,0.3)',
                    borderRadius: '3px',
                  }}
                />
              </div>
              <div style={{ height: '352px', position: 'relative', overflow: 'hidden' }}>
                <Image
                  src={heroImg}
                  alt={`${theme.name} mobile`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="200px"
                />
              </div>
            </div>
          </>
        )}

        {/* Browser chrome overlay (desktop only) */}
        {activeDevice === 'desktop' && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '36px',
              background: 'rgba(241,245,249,0.96)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 14px',
              gap: '6px',
              backdropFilter: 'blur(4px)',
            }}
          >
            {['#fca5a5', '#fde68a', '#bbf7d0'].map((col) => (
              <div
                key={col}
                style={{ width: '10px', height: '10px', borderRadius: '50%', background: col, flexShrink: 0 }}
              />
            ))}
            <div
              style={{
                marginLeft: '8px',
                flex: 1,
                height: '18px',
                background: 'rgba(255,255,255,0.8)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '10px',
                fontSize: '11px',
                color: '#94a3b8',
                maxWidth: '360px',
              }}
            >
              🔒 siteclift.com/{theme.slug}
            </div>
          </div>
        )}

        {/* Device switcher */}
        <div
          style={{
            position: 'absolute',
            top: '48px',
            right: '20px',
            display: 'flex',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '8px',
            padding: '3px',
            gap: '2px',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.25)',
          }}
        >
          {(['desktop', 'mobile'] as const).map((d) => (
            <button
              key={d}
              onClick={() => setActiveDevice(d)}
              style={{
                padding: '5px 14px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 600,
                background: activeDevice === d ? C.white : 'transparent',
                color: activeDevice === d ? C.dark : 'rgba(255,255,255,0.85)',
                textTransform: 'capitalize',
                transition: 'all 0.15s',
              }}
            >
              {d === 'desktop' ? '🖥 Desktop' : '📱 Mobile'}
            </button>
          ))}
        </div>
      </div>

      {/* 3 — TABS NAV */}
      <div
        style={{
          background: C.white,
          borderBottom: `1px solid ${C.border}`,
          display: 'flex',
          padding: '0 32px',
          gap: '0',
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => scrollToTab(tab)}
            style={{
              padding: '16px 20px',
              border: 'none',
              borderBottom: activeTab === tab ? `2px solid ${C.dark}` : '2px solid transparent',
              background: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeTab === tab ? 700 : 500,
              color: activeTab === tab ? C.dark : C.muted,
              marginBottom: '-1px',
              transition: 'all 0.15s',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 4 — OVERVIEW SECTION */}
      <div
        ref={overviewRef}
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '48px 32px',
          display: 'grid',
          gridTemplateColumns: '1fr 320px',
          gap: '48px',
          alignItems: 'start',
        }}
      >
        {/* Left column */}
        <div>
          {/* Theme name + badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <span
              style={{
                padding: '3px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 600,
                background: C.bg,
                color: C.muted,
                border: `1px solid ${C.border}`,
              }}
            >
              {theme.category}
            </span>
            {theme.featured && (
              <span
                style={{
                  padding: '3px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 600,
                  background: C.amberLight,
                  color: C.amberHover,
                  border: `1px solid ${C.amberBorder}`,
                }}
              >
                Featured
              </span>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: C.amber, fontSize: '14px' }}>{'★★★★★'}</span>
              <span style={{ fontSize: '13px', color: C.muted }}>{theme.rating}</span>
            </div>
          </div>

          <h1
            style={{
              fontSize: '36px',
              fontWeight: 800,
              color: C.dark,
              margin: '0 0 16px 0',
              lineHeight: '1.2',
            }}
          >
            {theme.name}
          </h1>

          <p
            style={{
              fontSize: '16px',
              color: C.muted,
              lineHeight: '1.75',
              margin: '0 0 36px 0',
            }}
          >
            {theme.description}
          </p>

          {/* Feature highlight cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              marginBottom: '48px',
            }}
          >
            {[
              { icon: '⚡', title: 'Fast setup', desc: 'Go live in minutes with guided onboarding and ready-made sections.' },
              { icon: '📱', title: 'Mobile ready', desc: 'Every section looks flawless on all screen sizes, right out of the box.' },
              { icon: '🔄', title: 'One-click switch', desc: 'Switch themes anytime — your content moves with you automatically.' },
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  background: C.white,
                  border: `1px solid ${C.border}`,
                  borderRadius: '12px',
                  padding: '20px',
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>{card.icon}</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: C.dark, marginBottom: '6px' }}>
                  {card.title}
                </div>
                <div style={{ fontSize: '13px', color: C.muted, lineHeight: '1.5' }}>{card.desc}</div>
              </div>
            ))}
          </div>

          {/* Screenshots */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: C.dark, margin: '0 0 20px 0' }}>
              Theme screenshots
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {screenshots.map((src, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: '10px',
                    overflow: 'hidden',
                    position: 'relative',
                    height: '180px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <Image
                    src={src}
                    alt={`${theme.name} screenshot ${i + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 1100px) 33vw, 280px"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Stores using this theme */}
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: C.dark, margin: '0 0 20px 0' }}>
              Stores using this theme
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              {storeNames.map((name) => (
                <div
                  key={name}
                  style={{
                    background: C.white,
                    border: `1px solid ${C.border}`,
                    borderRadius: '10px',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ position: 'relative', height: '90px' }}>
                    <Image
                      src={heroImg}
                      alt={name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="160px"
                    />
                  </div>
                  <div
                    style={{
                      padding: '8px 10px',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: C.dark,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Purchase card */}
        <div
          style={{
            background: C.white,
            border: `1px solid ${C.border}`,
            borderRadius: '16px',
            padding: '28px',
            position: 'sticky',
            top: '136px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          }}
        >
          <div
            style={{
              fontSize: '32px',
              fontWeight: 800,
              color: theme.price === 0 ? C.green : C.dark,
              marginBottom: '2px',
            }}
          >
            {priceLabel}
          </div>
          <div style={{ fontSize: '13px', color: C.muted, marginBottom: '24px' }}>
            {theme.price === 0 ? 'Free forever — no card needed' : 'One-time purchase, no subscription'}
          </div>

          <Link
            href={`/login?theme=${theme.slug}`}
            style={{
              display: 'block',
              width: '100%',
              padding: '14px 0',
              textAlign: 'center',
              fontSize: '15px',
              fontWeight: 700,
              color: C.white,
              background: C.amber,
              borderRadius: '10px',
              textDecoration: 'none',
              marginBottom: '10px',
              boxSizing: 'border-box',
            }}
          >
            Use this theme
          </Link>

          <Link
            href={`/marketplace/${theme.slug}`}
            style={{
              display: 'block',
              width: '100%',
              padding: '12px 0',
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: 600,
              color: C.dark,
              border: `1px solid ${C.dark}`,
              borderRadius: '10px',
              textDecoration: 'none',
              marginBottom: '24px',
              boxSizing: 'border-box',
            }}
          >
            View demo
          </Link>

          <div
            style={{
              borderTop: `1px solid ${C.border}`,
              paddingTop: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              marginBottom: '20px',
            }}
          >
            {PURCHASE_CHECKLIST.map((item) => (
              <div
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  fontSize: '13px',
                  color: C.text,
                  lineHeight: '1.45',
                }}
              >
                <span
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: C.amberLight,
                    border: `1px solid ${C.amberBorder}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: '10px',
                    color: C.amberHover,
                    fontWeight: 700,
                    marginTop: '1px',
                  }}
                >
                  ✓
                </span>
                {item}
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontSize: '12px',
              color: C.muted,
              borderTop: `1px solid ${C.border}`,
              paddingTop: '16px',
            }}
          >
            <span>🔒</span>
            <span>Secure checkout by Siteclift</span>
          </div>
        </div>
      </div>

      {/* 5 — FEATURES SECTION */}
      <div
        ref={featuresRef}
        style={{
          background: C.white,
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
          padding: '56px 32px',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '26px',
              fontWeight: 800,
              color: C.dark,
              margin: '0 0 8px 0',
              textAlign: 'center',
            }}
          >
            Everything built in
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: C.muted,
              textAlign: 'center',
              margin: '0 0 40px 0',
            }}
          >
            Every feature your {theme.category.toLowerCase()} website needs, ready on day one.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '24px',
            }}
          >
            {featureGroups.map((group) => (
              <div key={group.heading}>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: C.dark,
                    marginBottom: '14px',
                    paddingBottom: '10px',
                    borderBottom: `2px solid ${C.amber}`,
                  }}
                >
                  {group.heading}
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {group.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '13px',
                        color: C.text,
                        lineHeight: '1.4',
                      }}
                    >
                      <span style={{ color: C.amber, fontWeight: 700, marginTop: '1px', flexShrink: 0 }}>·</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6 — REVIEWS SECTION */}
      <div
        ref={reviewsRef}
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '56px 32px',
        }}
      >
        <h2
          style={{
            fontSize: '26px',
            fontWeight: 800,
            color: C.dark,
            margin: '0 0 32px 0',
          }}
        >
          What merchants are saying
        </h2>

        {/* Overall rating + bar chart */}
        <div
          style={{
            display: 'flex',
            gap: '48px',
            alignItems: 'center',
            background: C.white,
            border: `1px solid ${C.border}`,
            borderRadius: '16px',
            padding: '28px 32px',
            marginBottom: '32px',
          }}
        >
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontSize: '56px', fontWeight: 800, color: C.dark, lineHeight: '1' }}>
              {theme.rating}
            </div>
            <div style={{ fontSize: '20px', color: C.amber, margin: '6px 0 4px' }}>★★★★★</div>
            <div style={{ fontSize: '13px', color: C.muted }}>out of 5</div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: C.muted, marginBottom: '14px' }}>
              95% of merchants recommend this theme
            </div>
            {[
              { label: '👍 Positive', pct: 95, color: '#22c55e' },
              { label: '😐 Neutral', pct: 3, color: '#94a3b8' },
              { label: '👎 Critical', pct: 2, color: '#f87171' },
            ].map((row) => (
              <div
                key={row.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '8px',
                }}
              >
                <span style={{ fontSize: '12px', color: C.muted, width: '90px', flexShrink: 0 }}>
                  {row.label}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: '8px',
                    background: C.bg,
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${row.pct}%`,
                      height: '100%',
                      background: row.color,
                      borderRadius: '4px',
                    }}
                  />
                </div>
                <span style={{ fontSize: '12px', color: C.muted, width: '32px', textAlign: 'right', flexShrink: 0 }}>
                  {row.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Review cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            marginBottom: '28px',
          }}
        >
          {reviews.map((review, i) => (
            <div
              key={i}
              style={{
                background: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: '12px',
                padding: '24px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '14px',
                }}
              >
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: C.dark }}>
                    {review.name}
                  </div>
                  <div style={{ fontSize: '12px', color: C.muted, marginTop: '2px' }}>
                    {review.date}
                  </div>
                </div>
                <span
                  style={{
                    fontSize: '20px',
                    color: '#22c55e',
                    background: '#f0fdf4',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  👍
                </span>
              </div>
              <p
                style={{
                  fontSize: '14px',
                  color: C.text,
                  lineHeight: '1.65',
                  margin: 0,
                }}
              >
                {review.text}
              </p>
            </div>
          ))}
        </div>

        {/* Write a review */}
        <div style={{ textAlign: 'center' }}>
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 28px',
              border: `1px solid ${C.border}`,
              borderRadius: '10px',
              background: C.white,
              fontSize: '14px',
              fontWeight: 600,
              color: C.dark,
              cursor: 'pointer',
            }}
          >
            ✏️ Write a review
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer
        style={{
          background: C.white,
          borderTop: `1px solid ${C.border}`,
          padding: '48px 0 0',
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 32px',
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
            gap: '40px',
            paddingBottom: '48px',
          }}
        >
          {/* Column 1 — Wordmark + tagline */}
          <div>
            <div style={{ marginBottom: '10px' }}>
              <span style={{ fontSize: '20px', fontWeight: 700, color: C.dark }}>Site</span>
              <span style={{ fontSize: '20px', fontWeight: 700, color: C.amber }}>clift</span>
            </div>
            <p style={{ fontSize: '14px', color: C.muted, margin: 0, lineHeight: '1.6' }}>
              Build and switch websites instantly.
            </p>
          </div>

          {/* Column 2 — Product */}
          <div>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: C.dark,
                marginBottom: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Product
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Marketplace', 'Pricing', 'How it works', 'Theme Builder'].map((label) => (
                <Link
                  key={label}
                  href="/marketplace"
                  style={{ fontSize: '14px', color: C.muted, textDecoration: 'none' }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3 — Support */}
          <div>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: C.dark,
                marginBottom: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Support
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Help Center', 'Contact Us', 'Documentation', 'Status'].map((label) => (
                <Link
                  key={label}
                  href="/marketplace"
                  style={{ fontSize: '14px', color: C.muted, textDecoration: 'none' }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4 — Company */}
          <div>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: C.dark,
                marginBottom: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Company
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['About', 'Blog', 'Careers', 'Privacy Policy'].map((label) => (
                <Link
                  key={label}
                  href="/marketplace"
                  style={{ fontSize: '14px', color: C.muted, textDecoration: 'none' }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: `1px solid ${C.border}`,
            padding: '16px 32px',
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '13px', color: C.muted }}>
            2026 Siteclift. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Terms of Service', 'Privacy Policy'].map((label) => (
              <Link
                key={label}
                href="/marketplace"
                style={{ fontSize: '13px', color: C.muted, textDecoration: 'none' }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}
