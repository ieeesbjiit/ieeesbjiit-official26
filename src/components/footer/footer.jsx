import './Footer.css';
import oceanFloor from './assets/ocean-floor.png';
import ieeeLogo from '../../assets/ieee_white.png';

/* The first four links come from the public IEEE SB JIIT website. */
const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/ieeesbjiit/', icon: 'instagram' },
  { label: 'Facebook', href: 'https://www.facebook.com/ieeesbjiit/', icon: 'facebook' },
  { label: 'GitHub', href: 'https://github.com/ieeesbjiit', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/ieee-student-branch-jiit/about/', icon: 'linkedin' },
  { label: 'WhatsApp', href: 'https://chat.whatsapp.com/JETt64i2OjyEBlU16intji?mode=gi_t', icon: 'whatsapp' },
];

const contacts = [
  { name: 'Rayansh Gupta', phone: '+91 82874 78742' },
  { name: 'Bani Gupta', phone: '+91 98187 25776' },
];

const developers = [
  { name: 'Astha Sarraf', href: 'https://www.linkedin.com/in/astha-sarraf-6bb0053b6/' },
  { name: 'Kratika Goyal', href: 'https://www.linkedin.com/in/kratika-goyal2008/' },
  { name: 'Naman Vaish', href: 'https://www.linkedin.com/in/naman-vaish-6486aa361/' },
  { name: 'Pari Mittal', href: 'https://www.linkedin.com/in/pari-mittal-b56895318' },
  { name: 'Manu Shree Singh', href: 'https://www.linkedin.com/in/itsmanushree/' },
  
  { name: 'Avlika Rawat', href: 'https://www.linkedin.com/in/avlika-rawat-09751a341/' },
  { name: 'Esha Jindal', href: 'https://www.linkedin.com/in/esha-jindal-61851a3aa/' },
  { name: 'Harsh Kumar Bihani', href: 'https://www.linkedin.com/in/harsh-kumar-bihani-a32a19374/' },
  { name: 'Ishita', href:'https://www.linkedin.com/in/ishita-singh-1b533b38b/'},
  { name: 'Janmejai Pandey', href: 'https://www.linkedin.com/in/janmejai-pandey-050b56387' },
  { name: 'Pragya Ahlawat', href: 'https://www.linkedin.com/in/pragya-ahlawat/' },
  { name: 'Rushil Koul', href: 'https://www.linkedin.com/in/rushil-koul' },
  { name: 'Tanishq Gupta', href: 'https://www.linkedin.com/in/tanishq-gupta-280909384' },
  { name: 'Vidhaan Tripathi', href: 'https://www.linkedin.com/in/vidhaan-tripathi-9b1974368/' },
];

const snow = Array.from({ length: 60 }, (_, index) => ({
  id: index,
  left: `${(index * 37.7) % 100}%`,
  size: `${1 + ((index * 7) % 3)}px`,
  delay: `${-((index * 2.19) % 18)}s`,
  duration: `${13 + ((index * 3.71) % 13)}s`,
  opacity: 0.12 + ((index % 5) * 0.035),
}));

function Icon({ name }) {
  const paths = {
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.35" cy="6.65" r=".9" className="icon-fill" /></>,
    facebook: <path className="icon-fill" d="M13.7 21v-8h2.7l.4-3.1h-3.1V7.93c0-.9.25-1.51 1.54-1.51H16.9V3.65c-.29-.04-1.27-.12-2.42-.12-2.39 0-4.03 1.46-4.03 4.14V9.9H7.75V13h2.7v8h3.25Z" />,
    github: <path className="icon-fill" d="M12 2.5a9.5 9.5 0 0 0-3 18.51c.48.09.65-.21.65-.46v-1.84c-2.65.58-3.2-1.13-3.2-1.13-.43-1.1-1.06-1.39-1.06-1.39-.87-.59.07-.58.07-.58.96.07 1.47.99 1.47.99.86 1.47 2.24 1.05 2.79.8.09-.62.34-1.05.61-1.29-2.12-.24-4.35-1.06-4.35-4.72 0-1.04.37-1.89.98-2.56-.1-.24-.43-1.21.09-2.52 0 0 .8-.26 2.61.98A9.1 9.1 0 0 1 12 6.47c.81 0 1.62.11 2.38.32 1.82-1.24 2.61-.98 2.61-.98.52 1.31.19 2.28.1 2.52.61.67.98 1.52.98 2.56 0 3.67-2.24 4.48-4.37 4.71.34.3.65.89.65 1.79v2.65c0 .25.17.55.66.46A9.5 9.5 0 0 0 12 2.5Z" />,
    linkedin: <><path className="icon-fill" d="M6.3 8.45A1.9 1.9 0 1 0 6.3 4.65a1.9 1.9 0 0 0 0 3.8ZM4.7 9.9h3.2V19.3H4.7zM10.05 9.9h3.06v1.28h.04c.43-.81 1.47-1.66 3.02-1.66 3.23 0 3.83 2.12 3.83 4.88v4.9h-3.19v-4.34c0-1.04-.02-2.37-1.45-2.37-1.45 0-1.67 1.13-1.67 2.3v4.41h-3.2V9.9Z" /></>,
    whatsapp: <path className="icon-fill" d="M20.5 3.5A11.6 11.6 0 0 0 2.77 17.45L1.6 22.4l5.07-1.13A11.59 11.59 0 1 0 20.5 3.5Zm-8.5 16.02a9.43 9.43 0 0 1-4.8-1.31l-.34-.2-3.01.67.69-2.93-.22-.36A9.42 9.42 0 1 1 12 19.52Zm5.17-7.05c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.62.14-.18.28-.71.9-.87 1.08-.16.19-.32.21-.6.07-1.64-.82-2.72-1.46-3.8-3.31-.29-.5.29-.47.83-1.57.09-.18.05-.34-.02-.48-.07-.14-.62-1.49-.85-2.04-.22-.53-.45-.46-.62-.47h-.53c-.18 0-.47.07-.72.35-.25.28-.94.92-.94 2.24s.96 2.59 1.09 2.77c.14.19 1.89 2.89 4.58 4.06.64.27 1.14.44 1.53.56.64.2 1.23.17 1.69.1.52-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.11-.25-.18-.53-.32Z" />,
    phone: <path className="icon-fill" d="M6.6 2.9 9.34 5.6 7.6 8.16c.79 1.63 2.1 2.94 3.73 3.73l2.56-1.74 2.71 2.74-1.79 3.2c-.33.58-.98.89-1.64.76C7.35 15.77 3.23 11.65 2.14 5.83 2.01 5.17 2.32 4.53 2.9 4.2l3.7-1.3Z" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  };
  return <svg className="footer-icon" viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

function SectionHeading({ children }) {
  return <h2 className="footer-heading">{children}<span /></h2>;
}

export default function Footer() {
  return (
    <footer  id="contact" className="ocean-footer" style={{ '--ocean-image': `url(${oceanFloor})` }}>
      <div className="ocean-footer__veil" />
      <div className="marine-snow" aria-hidden="true">
        {snow.map((flake) => <i key={flake.id} style={{ left: flake.left, width: flake.size, height: flake.size, opacity: flake.opacity, animationDelay: flake.delay, animationDuration: flake.duration }} />)}
      </div>

      <div className="footer-content">
        <section className="footer-brand" aria-label="IEEE Student Branch JIIT">
          <img src={ieeeLogo} alt="IEEE Student Branch JIIT" />
        </section>

        <section className="footer-contacts" aria-labelledby="contact-heading">
          <SectionHeading><span id="contact-heading">Contact us</span></SectionHeading>
          <div className="contact-list">
            {contacts.map((contact) => <a className="contact-row" href={`tel:${contact.phone.replace(/\s/g, '')}`} key={contact.name}><b>{contact.name}</b><span><Icon name="phone" />{contact.phone}</span></a>)}
            <a className="email-link" href="mailto:ieeesbjiitweb@gmail.com"><Icon name="mail" />ieeesbjiitweb@gmail.com</a>
          </div>
        </section>

        <nav className="footer-social" aria-labelledby="social-heading">
          <SectionHeading><span id="social-heading">Connect with us</span></SectionHeading>
          <div className="social-links">
            {socialLinks.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={`IEEE SB JIIT on ${social.label}`}><Icon name={social.icon} /></a>)}
          </div>
        </nav>
      </div>

      <section className="footer-credits" aria-labelledby="credits-heading">
        <h2 id="credits-heading">Developed by</h2>
        <div className="developer-list">
          {developers.map((developer) => (
            <span className="developer-item" key={developer.name}>
              {developer.href ? <a href={developer.href} target="_blank" rel="noreferrer">{developer.name}</a> : developer.name}
            </span>
          ))}
        </div>
      </section>
    </footer>
  );
}
