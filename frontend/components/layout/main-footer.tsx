import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

import { footerLinks, contactInfo } from '@/lib/constants'

export function MainFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card text-card-foreground border-t border-border">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Company Info & Logo */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Standard Pensions Trust
              </span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md">
              Securing your future with innovative pension solutions designed 
              for all Ghanaians. Our mission is to provide financial security, 
              transparency, and peace of mind for your retirement years.
            </p>
            <div className="mt-6 flex space-x-4">
              <SocialLink href={contactInfo.social.facebook} icon={<Facebook size={20} />} label="Facebook" />
              <SocialLink href={contactInfo.social.twitter} icon={<Twitter size={20} />} label="Twitter" />
              <SocialLink href={contactInfo.social.linkedin} icon={<Linkedin size={20} />} label="LinkedIn" />
              <SocialLink href={contactInfo.social.instagram} icon={<Instagram size={20} />} label="Instagram" />
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Schemes</h3>
            <ul className="space-y-3">
              {footerLinks.schemes.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-muted-foreground">
              <p>{contactInfo.headquarters.address}</p>
              <p className="mt-3">
                <a href={`tel:${contactInfo.headquarters.phone}`} className="hover:text-foreground transition-colors">
                  {contactInfo.headquarters.phone}
                </a>
              </p>
              <p className="mt-1">
                <a href={`mailto:${contactInfo.headquarters.email}`} className="hover:text-foreground transition-colors">
                  {contactInfo.headquarters.email}
                </a>
              </p>
              <p className="mt-3">{contactInfo.headquarters.hours}</p>
            </address>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-muted-foreground text-sm mb-4 md:mb-0">
              © {currentYear} Standard Pensions Trust. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {footerLinks.legal.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-accent/20 transition-colors"
      aria-label={label}
    >
      {icon}
    </a>
  )
}