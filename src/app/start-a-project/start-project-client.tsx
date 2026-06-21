'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

/* ========================================
   Start a Project Client — Redirects to /contact
   ======================================== */

export default function StartProjectClient() {
  useEffect(() => {
    redirect('/contact');
  }, []);
  
  return null;
}
