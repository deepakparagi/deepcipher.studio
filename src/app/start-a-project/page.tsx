import { redirect } from 'next/navigation';

/* ========================================
   Start a Project — Redirects to /contact
   ======================================== */

export default function StartProjectPage() {
  redirect('/contact');
}
