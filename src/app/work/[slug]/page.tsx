import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { projects, getProjectBySlug, getNextProject } from '@/lib/projects';
import CaseStudyClient from './case-study-client';

/* ========================================
   Case Study Page — /work/[slug]
   ======================================== */

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} — DEEPCIPHER`,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const nextProject = getNextProject(slug);

  return <CaseStudyClient project={project} nextProject={nextProject} />;
}
