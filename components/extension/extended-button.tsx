import * as React from "react";
import { ButtonProps } from "@/components/ui/button";
import { VariantProps, cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/tailwind-utils";
import { Spinner } from "@/components/extension/spinner";

const extendedButtonVariants = cva(
  "relative [&>*]:z-10 [&>*]:relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background before:transition-all before:duration-500 transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "data-[ring=true]:hover:ring-primary bg-primary text-primary-foreground hover:bg-primary/90 data-[slide=true]:hover:before:bg-primary data-[slide=true]:hover:bg-primary/50 data-[slide=true]:text-foreground data-[slide=true]:border-foreground data-[slide=true]:hover:shadow-primary",
        destructive:
          "data-[ring=true]:hover:ring-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90 data-[slide=true]:hover:before:bg-destructive data-[slide=true]:hover:bg-destructive/50 data-[slide=true]:text-destructive data-[slide=true]:border-destructive data-[slide=true]:hover:shadow-destructive",
        outline:
          "!text-foreground data-[ring=true]:hover:ring-background border border-input bg-background hover:bg-accent hover:text-accent-foreground data-[slide=true]:hover:before:bg-background data-[slide=true]:hover:bg-background/50 data-[slide=true]:text-background data-[slide=true]:border-background data-[slide=true]:hover:shadow-background",
        secondary:
          "data-[ring=true]:hover:ring-secondary bg-secondary text-secondary-foreground hover:bg-secondary/80 data-[slide=true]:hover:before:bg-secondary data-[slide=true]:hover:bg-secondary/50 data-[slide=true]:text-secondary data-[slide=true]:border-secondary data-[slide=true]:hover:shadow-secondary",
        ghost: "hover:bg-accent hover:text-accent-foreground !text-foreground",
        link: "!text-foreground",
      },
      styling: {
        default: "",
        neo: "!border-2 !border-black !shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:!border-white dark:!shadow-[5px_5px_0px_0px_rgba(255,255,255,1)] hover:-mb-2 hover:-mr-2 hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:!shadow-none dark:hover:!shadow-none duration-300 transition-all",
        monde:
          "shadow-[5px_5px_rgba(0,_0,_0,_0.4),_10px_10px_rgba(0,_0,_0,_0.3),_15px_15px_rgba(0,_0,_0,_0.2),_20px_20px_rgba(0,_0,_0,_0.1),_25px_25px_rgba(0,_0,_0,_0.05)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      link: {
        default: "",
        normal: "underline-offset-4 hover:underline",
        "slide-left":
          "after:absolute after:bg-primary after:bottom-2 after:h-[1px] after:w-2/3 after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300",
        "slide-right":
          "after:absolute after:bg-primary after:bottom-2 after:h-[1px] after:w-2/3 after:origin-bottom-left after:scale-x-0 hover:after:origin-bottom-right hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300",
        "slide-center":
          "hover:text-primary cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-primary before:origin-center before:h-[1px] before:w-0 hover:before:w-[33%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-primary after:origin-center after:h-[1px] after:w-0 hover:after:w-[33%] after:bottom-0 after:right-[50%]",
        "despiser-left":
          "after:absolute after:bg-primary after:bottom-2 after:h-[1px] after:w-2/3 after:origin-bottom-left after:scale-x-100 hover:after:origin-bottom-right hover:after:scale-x-0 after:transition-transform after:ease-in-out after:duration-300",
        "despiser-right":
          "after:absolute after:bg-primary after:bottom-2 after:h-[1px] after:w-2/3 after:origin-bottom-right after:scale-x-100 hover:after:origin-bottom-left hover:after:scale-x-0 after:transition-transform after:ease-in-out after:duration-300",
      },
      loadingIcon: {
        default: "LoaderCircle",
        loader: "Loader",
        "loader-pinwheel": "LoaderPinwheel",
        "circle-dashed": "CircleDashed",
        "circle-slash": "CircleSlash2",
        "circle-dot-dashed": "CircleDotDashed",
      },
    },
    defaultVariants: {
      link: "default",
      variant: "default",
      styling: "default",
      size: "default",
      loadingIcon: "default",
    },
  }
);

export interface ExtendedButtonProps
  extends Omit<ButtonProps, "variant">,
    VariantProps<typeof extendedButtonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  ringOnHover?: boolean;
  bgSlideOnHover?: boolean;
  bounceOnHover?: boolean;
  scaleOnHover?: boolean;
  wiggleOnHover?: boolean;
  shineRightOnHover?: boolean;
  shineLeftOnHover?: boolean;
  dotsOnLoading?: React.ReactNode;
  icon?: React.ReactNode;
  iconPlacement?: "left" | "right";
  iconSlideOnHover?: boolean;
  isLoadingText?: React.ReactNode;
}

const ExtendedButton = React.forwardRef<HTMLButtonElement, ExtendedButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      asChild = false,
      isLoading,
      isLoadingText,
      loadingIcon,
      styling,
      link,
      ringOnHover,
      bgSlideOnHover,
      bounceOnHover,
      shineRightOnHover,
      shineLeftOnHover,
      scaleOnHover,
      wiggleOnHover,
      dotsOnLoading,
      icon,
      iconPlacement = "right",
      iconSlideOnHover,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        data-state={isLoading ? "loading" : "not-loading"}
        data-ring={ringOnHover ? "true" : "false"}
        data-slide={bgSlideOnHover ? "true" : "false"}
        data-bounce={bounceOnHover ? "true" : "false"}
        data-scale={scaleOnHover ? "true" : "false"}
        data-wiggle={wiggleOnHover ? "true" : "false"}
        data-shine-right={shineRightOnHover ? "true" : "false"}
        data-shine-left={shineLeftOnHover ? "true" : "false"}
        className={cn(
          "group",
          "data-[shine-right=true]:relative data-[shine-right=true]:z-0 data-[shine-right=true]:overflow-hidden data-[shine-right=true]:transition-all data-[shine-right=true]:duration-1000 data-[shine-right=true]:before:absolute data-[shine-right=true]:before:inset-0 data-[shine-right=true]:before:-z-10 data-[shine-right=true]:before:translate-x-[150%] data-[shine-right=true]:before:translate-y-[150%] data-[shine-right=true]:before:scale-[2.5] data-[shine-right=true]:before:rounded-[100%] data-[shine-right=true]:before:bg-gradient-to-r data-[shine-right=true]:from-background/50 data-[shine-right=true]:before:transition-transform data-[shine-right=true]:before:duration-1000 data-[shine-right=true]:hover:before:translate-x-[0%] data-[shine-right=true]:hover:before:translate-y-[0%]",
          "data-[shine-left=true]:relative data-[shine-left=true]:z-0 data-[shine-left=true]:overflow-hidden data-[shine-left=true]:transition-all data-[shine-left=true]:duration-1000 data-[shine-left=true]:before:absolute data-[shine-left=true]:before:inset-0 data-[shine-left=true]:before:-z-10 data-[shine-left=true]:before:-translate-x-[150%] data-[shine-left=true]:before:translate-y-[150%] data-[shine-left=true]:before:scale-[2.5] data-[shine-left=true]:before:rounded-[100%] data-[shine-left=true]:before:bg-gradient-to-r data-[shine-left=true]:from-background/50 data-[shine-left=true]:before:transition-transform data-[shine-left=true]:before:duration-1000 data-[shine-left=true]:hover:before:translate-x-[0%] data-[shine-left=true]:hover:before:translate-y-[0%]",
          "data-[bounce=true]:hover:animate-bounce",
          "data-[scale=true]:hover:scale-110",
          "data-[wiggle=true]:hover:animate-wiggle data-[wiggle=true]:duration-75",
          "data-[slide=true]:bg-background data-[slide=true]:border data-[slide=true]:hover:ring-offset-0 data-[slide=true]:hover:ring-0 data-[slide=true]:overflow-hidden data-[slide=true]:shadow-2xl data-[slide=true]:transition-all data-[slide=true]:before:absolute data-[slide=true]:before:bottom-0 data-[slide=true]:before:left-0 data-[slide=true]:before:top-0 data-[slide=true]:before:z-0 data-[slide=true]:before:h-full data-[slide=true]:before:w-0 data-[slide=true]:before:bg-secondary data-[slide=true]:before:transition-all data-[slide=true]:before:duration-500 data-[slide=true]:hover:text-primary-foreground data-[slide=true]:hover:before:left-0 data-[slide=true]:hover:before:w-full",
          "data-[ring=true]:hover:ring-offset-2 data-[ring=true]:hover:ring-2",
          "data-[state=loading]:gap-1 data-[state=loading]:select-none data-[state=loading]:pointer-events-none items-center justify-center",
          extendedButtonVariants({
            variant,
            styling,
            link,
            size,
            className,
          })
        )}
        disabled={isLoading}
        ref={ref}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center ">
          {!isLoading ? (
            <React.Fragment>
              {icon && iconPlacement === "left" && (
                <ButtonIcon
                  isLoading={isLoading}
                  icon={icon}
                  iconSlideOnHover={iconSlideOnHover}
                />
              )}
              <span className="mx-2">{children}</span>
              {icon && iconPlacement === "right" && (
                <ButtonIcon
                  isLoading={isLoading}
                  icon={icon}
                  iconSlideOnHover={iconSlideOnHover}
                />
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {icon && iconPlacement === "left" && (
                <ButtonIcon
                  isLoading={isLoading}
                  icon={icon}
                  iconSlideOnHover={iconSlideOnHover}
                />
              )}
              <Spinner icon={loadingIcon} />
              {isLoadingText ? (
                <span className="mx-2">{isLoadingText}</span>
              ) : (
                <React.Fragment />
              )}
              {dotsOnLoading}
              {icon && iconPlacement === "right" && (
                <ButtonIcon
                  isLoading={isLoading}
                  icon={icon}
                  iconSlideOnHover={iconSlideOnHover}
                />
              )}
            </React.Fragment>
          )}
        </span>
      </Comp>
    );
  }
);

export const ButtonIcon: React.FC<{
  icon: React.ReactNode;
  iconSlideOnHover?: boolean;
  isLoading?: boolean;
}> = ({ icon, iconSlideOnHover, isLoading }) => {
  if (isLoading) return null;

  return !iconSlideOnHover ? (
    <span
      data-state={iconSlideOnHover ? "hovering" : "visible"}
      className="transition-all data-[state=hovering]:opacity-0 data-[state=hovering]:w-0 data-[state=hovering]:group-hover:w-full data-[state=hovering]:group-hover:opacity-100"
    >
      {icon}
    </span>
  ) : (
    <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
      {icon}
    </div>
  );
};

ExtendedButton.displayName = "ExtendedButton";

export { ExtendedButton, extendedButtonVariants };
