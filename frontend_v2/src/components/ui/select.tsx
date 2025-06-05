import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

export function Select({ value, onValueChange, children }: SelectProps) {
  const [open, setOpen] = React.useState(false)
  
  return (
    <div className="relative">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { value, onValueChange, open, setOpen } as any)
        }
        return child
      })}
    </div>
  )
}

interface SelectTriggerProps {
  children: React.ReactNode
  className?: string
  value?: string
  open?: boolean
  setOpen?: (open: boolean) => void
}

export function SelectTrigger({ children, className, value, open, setOpen }: SelectTriggerProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      onClick={() => setOpen?.(!open)}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  )
}

interface SelectValueProps {
  placeholder?: string
  value?: string
}

export function SelectValue({ placeholder, value }: SelectValueProps) {
  return <span>{value || placeholder}</span>
}

interface SelectContentProps {
  children: React.ReactNode
  className?: string
  open?: boolean
  setOpen?: (open: boolean) => void
  onValueChange?: (value: string) => void
}

export function SelectContent({ children, className, open, setOpen, onValueChange }: SelectContentProps) {
  if (!open) return null
  
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={() => setOpen?.(false)} />
      <div className={cn(
        "absolute top-full left-0 z-50 w-full mt-1 bg-background border border-input rounded-md shadow-md",
        className
      )}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { onValueChange, setOpen } as any)
          }
          return child
        })}
      </div>
    </>
  )
}

interface SelectItemProps {
  children: React.ReactNode
  value: string
  className?: string
  onValueChange?: (value: string) => void
  setOpen?: (open: boolean) => void
}

export function SelectItem({ children, value, className, onValueChange, setOpen }: SelectItemProps) {
  return (
    <button
      type="button"
      className={cn(
        "w-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className
      )}
      onClick={() => {
        onValueChange?.(value)
        setOpen?.(false)
      }}
    >
      {children}
    </button>
  )
} 