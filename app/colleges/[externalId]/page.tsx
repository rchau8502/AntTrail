import { notFound } from 'next/navigation'
import { getInstitutionFromSupabase } from '@/lib/server/institutions'
import CollegeDetailView from '@/components/CollegeDetailView'

export default async function CollegeProfilePage({ params }: { params: Promise<{ externalId: string }> }) {
  const { externalId } = await params
  const institution = await getInstitutionFromSupabase(externalId)

  if (!institution) {
    notFound()
  }

  return <CollegeDetailView institution={institution} />
}
