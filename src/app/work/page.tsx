import type { Metadata } from 'next';
import WorkClient from './work-client';

export const metadata: Metadata = {
  title: 'Work — Selected Projects | DEEPCIPHER',
  description:
    'Premium web design & brand identity projects for businesses across India & beyond. View our selected work.',
};

export default function WorkPage() {
  return <WorkClient />;
}
