import React from "react";
import DotCard from "@/components/cool/dot-card";
import {Timeline, FileUpload, CreateAccount, Credentials} from "@/components/svg/spriteAndIconSVGs";
import {Highlighter} from "@/components/cool/highlighter";

interface Service {
    icon: React.FC<{ width?: number; height?: number }>;
    service: string;
    description: string;
}

const services: Service[] = [
    {
        icon: CreateAccount,
        service: 'Register & Verify',
        description:
            'Begin by confirming your graduate status using your official student ID. Once verified, create your secure personal account to start the process.'
    },
    {
        icon: FileUpload,
        service: 'Complete Your Application',
        description:
            'Fill out the application form with your details and securely upload all required documents, such as your transcript and completion certificate.',
    },
    {
        icon: Timeline,
        service: 'Track Your Progress',
        description:
            "Monitor your application's journey through your personal dashboard. You'll see exactly which stage it is in, from council review to final approval.",
    },
    {
        icon: Credentials,
        service: 'Receive Your Credentials',
        description:
            'Once approved, you will be issued a digital appointment letter and your official payroll PIN code, complete with a QR code for instant verification.',
    },
]

const HowItWorks = () => {
    return (
        <section className="mt-10">
            <div>
                <h2
                    className="h3-bold text-secondary font-montserratAlt uppercase
                    text-center dark:text-stone-100">
                    How it works
                </h2>
                <p className="paragraph-regular text-primary text-center mt-2 px-4 md:mx-auto md:w-[60ch] dark:text-stone-200">
                    Let's us help you get started with your housemanship and PIN application process in just a{" "}<Highlighter action="box" color="#61ce6f" padding={2} isView={true} multiline={true} strokeWidth={2}>4 simple steps.</Highlighter>
                </p>
            </div>

            <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 py-16">
                {services.map((svc, idx) => (
                    <DotCard
                        key={idx}
                        icon={svc.icon}
                        title={svc.service}
                        description={svc.description}
                        bgStyling={""}
                    />
                ))}
            </div>
        </section>



    )
}



export default HowItWorks;