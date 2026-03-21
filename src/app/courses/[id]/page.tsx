import { notFound } from "next/navigation";

import { CourseLandingView } from "@/components/course-landing-view";
import { SiteHeader } from "@/components/site-header";
import { courses, getCourseById } from "@/lib/bubble";
import { getCourseGuide } from "@/lib/course-guides";

interface CoursePageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return courses.map((course) => ({
    id: course.id,
  }));
}

export async function generateMetadata({ params }: CoursePageProps) {
  const { id } = await params;
  const course = getCourseById(id);

  if (!course) {
    return {};
  }

  return {
    title: `${course.title} | Bubble`,
    description: course.shortDescription,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = getCourseById(id);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <CourseLandingView course={course} guide={getCourseGuide(course.id)} />
      </main>
    </div>
  );
}
