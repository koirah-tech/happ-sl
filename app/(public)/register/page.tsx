
import VerifyApplicantForm from "@/components/public-pages/auth-page/verifyApplicantForm";

export default function RegisterIndexPage() {
  return (
    <main className="relative flex min-h-[70vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    
      <div className="relative z-10 w-full max-w-3xl">
        <VerifyApplicantForm />
      </div>
    </main>
  );
}
