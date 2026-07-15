import DoctorDetailsView from "./DoctorDetailsView";

// 1. Define a strict interface representing the expected asynchronous URL route parameters
interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/doctors/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return { title: "Doctor Clinical Profile | DocAppoint" };
    }

    const doctor = await res.json();

    return {
      title: `${doctor.name} — ${doctor.specialty}`,
      description: doctor.description || `Schedule a private clinical checkup session with ${doctor.name}, highly rated specialist in ${doctor.specialty}.`,
      openGraph: {
        title: `${doctor.name} Profile | DocAppoint`,
        description: doctor.description,
        images: [
          {
            url: doctor.image,
            alt: doctor.name,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: "Doctor Directory Specialist Profile",
      description: "Read clinician credentials, medical session fees, and booking details.",
    };
  }
}

export default function Page({ params }: PageProps) {
  return <DoctorDetailsView params={params} />;
}