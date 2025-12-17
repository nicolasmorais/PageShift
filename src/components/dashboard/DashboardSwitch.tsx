"use client";

import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface DashboardSwitchProps extends React.ComponentPropsWithoutRef<typeof Switch> {}

export const DashboardSwitch = React.forwardRef<
  React.ElementRef<typeof Switch>,
  DashboardSwitchProps
>(({ className, ...props }, ref) => {
  return (
    <Switch
      ref={ref}
      className={cn(
        // Light Mode: Fundo desativado cinza claro, Fundo ativado com a nova cor primária
        "data-[state=unchecked]:bg-gray-300 data-[state=checked]:bg-[#6B16ED]", 
        // Dark Mode: Fundo desativado cinza escuro, Fundo ativado com a nova cor primária
        "dark:data-[state=unchecked]:bg-[#020617] dark:data-[state=checked]:bg-[#6B16ED]",
        // Garante que o thumb seja branco em ambos os modos
        "[&>span]:data-[state=checked]:bg-white [&>span]:data-[state=unchecked]:bg-white",
        className
      )}
      {...props}
    />
  );
});
DashboardSwitch.displayName = "DashboardSwitch";