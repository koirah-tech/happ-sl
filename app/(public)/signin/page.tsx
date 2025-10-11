import LoginForm from "@/components/public-pages/auth-page/loginForm";

export default function SignInPage() {
    return (
        <main className="md: flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-ful space-y-8">
                <LoginForm />
            </div>
        </main>
    )
}