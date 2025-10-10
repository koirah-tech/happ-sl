import React, { FC } from "react";

export interface DotCardProps {
  icon: FC<{ width?: number; height?: number }>;
  title: string;
  description: string;
  bgStyling: string;
}

export default function DotCard({icon: Icon, title, description, bgStyling}: DotCardProps) {
  return (
    <div className="relative mx-auto w-full max-w-sm px-4  sm:px-6 md:px-8">
      <div className="absolute left-0 top-4 -z-0 h-px w-full bg-zinc-400 dark:bg-zinc-700 sm:top-6 md:top-8" />
      <div className="absolute bottom-4 left-0 z-0 h-px w-full bg-zinc-400 dark:bg-zinc-700 sm:bottom-6 md:bottom-8" />
      <div className="relative w-full border-x border-zinc-400 dark:border-zinc-700">
        <div className="absolute z-0 grid h-full w-full items-center">
          <section className="absolute z-0 grid h-full w-full grid-cols-2 place-content-between">
            <div className="my-4 size-1 -translate-x-[2.5px] rounded-full bg-primary  outline-8 outline-gray-50 dark:outline-gray-950 sm:my-6 md:my-8" />
            <div className="my-4 size-1 translate-x-[2.5px] place-self-end rounded-full bg-primary  outline-8 outline-gray-50 dark:outline-gray-950 sm:my-6 md:my-8" />
            <div className="my-4 size-1 -translate-x-[2.5px] rounded-full bg-primary outline-8 outline-gray-50 dark:outline-gray-950 sm:my-6 md:my-8" />
            <div className="my-4 size-1 translate-x-[2.5px] place-self-end rounded-full bg-primary outline-8 outline-gray-50 dark:outline-gray-950 sm:my-6 md:my-8" />
          </section>
        </div>
        <div className="relative z-20 mx-auto py-8">
          <div className="p-6">
            <div className={`${bgStyling} w-fit p-2 mb-5`}>
              <Icon width={65} height={65} />
            </div>
            <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {description}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
