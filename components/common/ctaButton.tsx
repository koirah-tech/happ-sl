import * as React from "react";
import { Button, type ButtonProp } from "@/components/ui/button";
import {RiArrowRightSLine} from "@remixicon/react";
import { cn } from "@/lib/utils";

type GetStartedButtonProps = ButtonProp & {
    className?: string;
    size?: "default" | "lg"  ;
    children?: string;
    iconSize?: number;
    iconStrokeWidth?: number;
};

const CTAButton = React.forwardRef<
    HTMLButtonElement,
    GetStartedButtonProps
>((props, ref) => {
    const {
        className,
        size = "default",
        children = "Get Started",
        iconSize = 16,
        iconStrokeWidth = 2,
        ...restProps
    } = props;

    return (
        <Button
            ref={ref}
            size={size}
            variant="default"
            className={cn("group relative overflow-hidden", className)}
            {...restProps}
        >
      <span className="mr-8 transition-opacity duration-300 group-hover:opacity-0">
        {children}
      </span>
            <span
                className="absolute right-1 top-1 bottom-1 rounded-sm z-10 flex items-center justify-center w-1/4
                transition-all duration-300 bg-primary-foreground/15 group-hover:w-[calc(100%-0.5rem)]
                group-active:scale-95"
                aria-hidden="true"
            >
        <RiArrowRightSLine size={iconSize} strokeWidth={iconStrokeWidth} />
      </span>
        </Button>
    );
});

CTAButton.displayName = "CTAButton";

export default CTAButton;
