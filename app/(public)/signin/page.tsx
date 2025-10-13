
import LoginForm from "@/components/public-pages/auth-page/loginForm";

export default function SignInPage() {
    return (
        <main className="relative md: flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
        
            <div className="md:max-w-full w-full justify-self-center z-10">
                <LoginForm />
            </div>
        </main>
    )
}


