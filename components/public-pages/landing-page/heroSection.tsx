"use client"

import { useRouter } from "next/navigation";

import {DotPattern} from "@/components/cool/dot-pattern";
import { Highlighter } from "@/components/cool/highlighter";

import {cn} from "@/lib/utils";
import CTAButton from "@/components/common/ctaButton";
import MaskedDiv from "@/components/cool/masked-div";


const HomeHeroSection = () => {

    const router = useRouter();

    return (
        <header className="grid gap-14 md:gap-18 mt-8">
            <div className="grid gap-4 relative overflow-hidden md:pt-10 px-2">
                <DotPattern
                    glow={true}
                    className={cn(
                        "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
                    )}
                />
                <div
                    className="hover:bg-background dark:hover:border-t-border rounded-full bg-muted
                        group mx-auto flex w-fit items-center gap-4 border py-3 px-4
                        shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5
                        dark:shadow-zinc-950 md:py-1">
                    <span className="text-foreground text-sm text-center md:text-left">Congratulations! on completing your studies 🎉  🎓</span>
                </div>

            
                <div className="text-center grid gap-10 px-2 md:px-0">
                    <div className="grid gap-2">
                        <h1 className="text-secondary text-[1.8rem] lg:text-[2.5rem] font-bold md:leading-15 md:w-[34ch] md:mx-auto
                            font-montserratAlt dark:text-stone-100 ">
                                Housemanship & PIN Portal - MoHS&mdash;
                            <span className="text-primary dark:text-accent">
                                    <Highlighter multiline={true} strokeWidth={6} isView={true} animationDuration={700} color="#758B61" padding={16}>
                                <span className="text-white">Streamlining Placement</span>
                                </Highlighter>{" "}for Sierra Leone's Health Professionals
                            </span>
                        </h1>
                        <p className="paragraph-regular leading-relaxed text-primary md:w-[65ch]
                            mx-auto dark:text-stone-200">
                                A Ministry of Health & Sanitation initiative to provide a transparent, efficient, and timely process for all medical, nursing, and midwifery graduates.
                        </p>
                    </div>


                    <div className="flex items-center justify-center gap-5">
                        <CTAButton 
                        className="bg-secondary text-secondary-foreground hover:bg-secondary border-2 font-bold border-gray-600 dark:bg-primary text-[0.85rem] md:text-[1rem]"
                        size={"lg"}
                        onClick={() => {router.push("/register")}}
                        >
                            START THE PROCESS NOW!
                        </CTAButton>
                    </div>
                </div>

            </div>
            <div className="mx-auto">
               <MaskedDiv maskType="type-3" className="h-[220px] md:h-[300px] lg:h-[500px]"> 
                    <video
                    className="cursor-pointer transition-all duration-300 hover:scale-105"
                    autoPlay
                    loop
                    muted
                    >
                        <source src="/videos/Video_Generation_Administrative_Delays.mp4" type="video/mp4" />

                    </video>
                </MaskedDiv> 
            </div>
            
        </header>

    )
}

export default HomeHeroSection;
