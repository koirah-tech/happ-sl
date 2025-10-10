
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import { cn } from '@/lib/utils';
import { MagnifyGlass, PadLock, Verified, PieChart } from '@/components/svg/spriteAndIconSVGs';
import { useIsMobile } from '@/hooks/useMobile';


const features = [
  {
    title: 'Transparent Progress, Always.',
    content:
      "End the uncertainty. Our system provides real-time updates on your application's status, allowing you to track its journey from submission to PIN code issuance.",
    icon: <MagnifyGlass />,
    image: '/images/features/tracking.webp',
  },
  {
    title: 'Effortless and Secure Uploads',
    content:
      'Upload all necessary documents digitally and securely. Our platform protects your sensitive information and eliminates the need for physical submissions.',
    icon: <PadLock />,
    image: '/images/features/secure-upload.webp',
  },
  {
    title: 'Verified & Authentic Credentials',
    content:
      'Each official appointment letter and PIN code comes with a unique, scannable QR code, allowing any authorized official to instantly verify its authenticity and prevent fraud.',
    icon: <Verified />,
    image: '/images/features/verified.webp',
  },
  {
    title: "Optimizing Sierra Leone's Health Workforce",
    content:
      'Beyond individual applications, the system provides Ministry of Health officials with crucial data to strategically allocate health professionals to underserved regions across the nation.',
    icon: <PieChart />,
    image: '/images/features/workforce.webp',
  },
];

export default function FeatureSection() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (4000 / 100));
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length);
        setProgress(0);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [progress]);

  return (
    <div className={'p-8 md:p-12'}>
      <div className="mx-auto max-w-6xl">
        <div className="relative mx-auto mb-12 max-w-2xl sm:text-center">
          <div className="relative z-10">
            <h2 className="base-bold md:h3-bold uppercase tracking-tighter ">
              Revolutionizing Health Workforce Management
            </h2>
            <p className="paragraph-regular mt-3">
              Beyond simply processing applications, this innovative platform transforms how Sierra Leone nurtures and deploys its medical talent. Discover the powerful features designed to enhance transparency, streamline operations, and build a more resilient public health service for all.
            </p>
          </div>
          <div
            className="absolute inset-0 mx-auto h-44 max-w-xs blur-[118px]"
            style={{
              background:
                'linear-gradient(152.92deg, rgba(97, 206, 112, 0.925) 4.54%, rgba(97, 206, 112, 0.563) 34.2%, rgba(97, 206, 112, 0.44) 77.55%)',
            }}
          ></div>
        </div>
        <hr className="bg-foreground/30 mx-auto mb-10 h-px w-1/2" />

        <div className="flex flex-col gap-10 md:grid md:grid-cols-2 md:gap-10">
          <div className="order-2 space-y-8 md:order-1">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={cn("flex items-center gap-6 md:gap-8", isMobile && 'flex-col')}
                initial={{ opacity: 0.3, x: -20 }}
                animate={{
                  opacity: index === currentFeature ? 1 : 0.3,
                  x: 0,
                  scale: index === currentFeature ? 1.05 : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-full border-2 md:h-14 md:w-14',
                    index === currentFeature
                      ? 'border-primary bg-primary/10 text-primary scale-110 [box-shadow:0_0_15px_rgba(97, 206, 112, 0.925)]'
                      : 'border-muted-foreground bg-muted', isMobile && 'self-start' ,
                  )}
                >
                  {feature.icon}
                </motion.div>

                <div className="flex-1">
                  <h3 className="base-bold md:h3-bold">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground paragraph-regular">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className={cn(
              'border-primary/20 relative order-1 h-[200px] overflow-hidden rounded-xl border [box-shadow:0_5px_30px_-15px_rgba(97, 206, 112, 0.925)] md:order-2 md:h-[300px] lg:h-[400px]',
            )}
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 overflow-hidden rounded-lg"
                      initial={{ y: 100, opacity: 0, rotateX: -20 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -100, opacity: 0, rotateX: 20 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        className="h-full w-full transform object-cover transition-transform hover:scale-105"
                        width={1000}
                        height={500}
                      />
                      <div className="from-background via-background/50 absolute right-0 bottom-0 left-0 h-2/3 bg-gradient-to-t to-transparent" />

                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
