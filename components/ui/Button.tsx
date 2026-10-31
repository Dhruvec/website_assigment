'use client';

import React from 'react';
import Link from 'next/link';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'whatsapp';
  size?: 'md' | 'lg' | 'sm';
  href?: string;
  isExternal?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = 'primary',
  size = 'lg',
  href,
  isExternal,
  icon,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: 'h-11 px-5 text-sm rounded-full',
    md: 'h-12 px-6 text-base rounded-full',
    lg: 'h-14 px-8 text-base md:text-lg rounded-full',
  }[size];

  const variantClasses = {
    primary: 'btn-chunky-caramel',
    secondary: 'btn-chunky-secondary',
    whatsapp: 'btn-chunky-whatsapp',
  }[variant];

  const baseClasses = `inline-flex items-center justify-center font-bold font-sans tracking-wide select-none transition-all duration-150 relative disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none ${sizeClasses} ${variantClasses} ${className}`;

  if (href) {
    if (isExternal || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
      return (
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className={baseClasses}
        >
          {icon && <span className="inline-flex shrink-0">{icon}</span>}
          <span>{children}</span>
        </a>
      );
    }
    return (
      <Link href={href} className={baseClasses}>
        {icon && <span className="inline-flex shrink-0">{icon}</span>}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button className={baseClasses} disabled={disabled} {...props}>
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
