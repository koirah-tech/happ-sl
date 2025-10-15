import VerificationResultCard from "@/components/public-pages/verification-page/verificationResultCard";
import { mockGetCredentialById } from "@/lib/mock/verification";

type ResultPageProps = {
  params: { credentialId: string };
};

function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateTime(date: Date) {
  return date.toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default async function VerificationResultPage({ params }: ResultPageProps) {
  const credentialId = decodeURIComponent(params.credentialId);
  const isInvalidRoute = credentialId.toLowerCase() === "invalid";

  const record = isInvalidRoute ? null : await mockGetCredentialById(credentialId);

  const content =
    record && !isInvalidRoute ? (
      <VerificationResultCard
        variant="success"
        title="Credential Verified"
        details={[
          { label: "Full Name", value: record.fullName },
          { label: "Cadre", value: record.cadre },
          { label: "PIN Code", value: record.pinCode },
          { label: "Date Issued", value: formatDate(new Date(record.dateIssued)) },
        ]}
        verifiedOn={formatDateTime(new Date())}
        photoUrl={record.photoUrl}
      />
    ) : (
      <VerificationResultCard
        variant="failure"
        title="Verification Failed"
        description="The provided Credential ID could not be found in our system. This may be due to a typo, an expired link, or a non-official document. Please double-check the ID and try again."
        supportContact="support@mohs.gov.sl"
      />
    );

  return (
    <main className="flex min-h-[70vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {content}
    </main>
  );
}
