import type { Metadata } from 'next';
import WorkClient from './work-client';

export const metadata: Metadata = {
  title: 'Selected Work & Flagship Projects',
  description:
    'Explore selected client flagships, 3D interactive experiences, and cognitive AI architectures engineered by DEEPCIPHER Studio.',
};

export default function WorkPage() {
  return <WorkClient />;
}
