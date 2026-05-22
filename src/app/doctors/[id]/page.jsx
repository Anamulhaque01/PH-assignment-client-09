import DoctorDetailsView from "./DoctorDetailsView";

// Next.js automatically executes this asynchronous method on the server lifecycle
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  try {
    // Queries your live backend using the environment configuration URL
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/doctors/${id}`, {
      cache: "no-store", // Prevents server data caching staleness
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
    // Fallback secure meta tags if connection drops temporarily
    return {
      title: "Doctor Directory Specialist Profile",
      description: "Read clinician credentials, medical session fees, and booking details.",
    };
  }
}

export default function Page({ params }) {
  return <DoctorDetailsView params={params} />;
}