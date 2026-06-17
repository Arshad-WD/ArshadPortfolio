"use client"

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type JSX,
} from "react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
} from "framer-motion"
import { Check, Loader2, SendHorizontal, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const DRAG_CONSTRAINTS = { left: 0, right: 280 }
const DRAG_THRESHOLD = 0.9

const BUTTON_STATES = {
  initial: { width: "100%" },
  completed: { width: "12rem" },
}



type StatusIconProps = {
  status: string
}

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  const iconMap: Record<StatusIconProps["status"], JSX.Element> = useMemo(
    () => ({
      loading: <Loader2 className="animate-spin text-black" size={24} />,
      success: <Check className="text-green-600" size={24} />,
      error: <X className="text-red-600" size={24} />,
    }),
    []
  )

  if (!iconMap[status]) return null

  return (
    <motion.div
      key={status}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
      className="flex items-center justify-center"
    >
      {iconMap[status]}
    </motion.div>
  )
}

export interface SlideButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  status?: "idle" | "loading" | "success" | "error";
  onDragComplete?: () => void;
}

const SlideButton = forwardRef<HTMLButtonElement, SlideButtonProps>(
  ({ className, status = "idle", onDragComplete, ...props }, ref) => {
    const [isDragging, setIsDragging] = useState(false)
    const [completed, setCompleted] = useState(false)
    const dragHandleRef = useRef<HTMLDivElement | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [dragRange, setDragRange] = useState(DRAG_CONSTRAINTS.right)

    const dragX = useMotionValue(0)
    const dragProgress = useTransform(
      dragX,
      [0, dragRange],
      [0, 1]
    )
    const promptOpacity = useTransform(dragProgress, [0, 0.5], [1, 0])

    // Calculate dynamic drag constraints based on actual container width
    useEffect(() => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.getBoundingClientRect().width;
        // Subtract button width (approx 56px) and some padding
        setDragRange(Math.max(100, containerWidth - 68));
      }
    }, [completed]);

    useEffect(() => {
      const timer = setTimeout(() => {
        if (status === "idle") {
          setCompleted(false);
          dragX.set(0);
        } else if (status === "loading" || status === "success" || status === "error") {
          setCompleted(true);
        }
      }, 0);
      return () => clearTimeout(timer);
    }, [status, dragX]);

    const handleDragStart = useCallback(() => {
      if (completed) return
      setIsDragging(true)
    }, [completed])

    const handleDragEnd = () => {
      if (completed) return
      setIsDragging(false)

      const progress = dragProgress.get()
      if (progress >= DRAG_THRESHOLD) {
        // If nested inside a form, validate before transitioning to completed state
        const form = containerRef.current?.closest("form")
        if (form && !form.checkValidity()) {
          form.reportValidity()
          animate(dragX, 0, { type: "tween", ease: "easeOut", duration: 0.25 })
          return
        }

        setCompleted(true)
        if (onDragComplete) {
          onDragComplete()
        }
      } else {
        animate(dragX, 0, { type: "tween", ease: "easeOut", duration: 0.25 })
      }
    }

    const handleDrag = (
      _event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => {
      if (completed) return
      const newX = Math.max(0, Math.min(info.offset.x, dragRange))
      dragX.set(newX)
    }

    const adjustedWidth = useTransform(dragX, (x) => x + 28)

    return (
      <div className="w-full flex justify-center h-14 relative">
        <motion.div
          ref={containerRef}
          animate={completed ? BUTTON_STATES.completed : BUTTON_STATES.initial}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.35 }}
          className="relative flex h-14 w-full items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800 shadow-inner overflow-hidden select-none"
        >
          {!completed && (
            <motion.div
              style={{
                width: adjustedWidth,
              }}
              className="absolute inset-y-0 left-0 z-0 bg-gradient-to-r from-purple-950/40 via-purple-700/20 to-orange-500/20"
            />
          )}

          {/* Prompt Text */}
          {!completed && (
            <motion.span 
              style={{ opacity: promptOpacity }}
              className="absolute text-zinc-500 font-bold text-xs uppercase tracking-widest pointer-events-none select-none"
            >
              Swipe to Send Message
            </motion.span>
          )}

          <AnimatePresence>
            {!completed && (
              <motion.div
                ref={dragHandleRef}
                drag="x"
                dragConstraints={{ left: 0, right: dragRange }}
                dragElastic={0}
                dragMomentum={false}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDrag={handleDrag}
                style={{ x: dragX }}
                className="absolute left-1 z-10 flex cursor-grab items-center justify-start active:cursor-grabbing"
              >
                <Button
                  ref={ref}
                  type="button"
                  size="icon"
                  className={cn(
                    "h-11 w-11 rounded-xl bg-white hover:bg-zinc-200 text-black shadow-lg flex items-center justify-center cursor-pointer transition-transform",
                    isDragging && "scale-105 active:scale-95",
                    className
                  )}
                  {...props}
                >
                  <SendHorizontal className="size-5" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {completed && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center p-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "tween", ease: "easeOut", duration: 0.25 }}
              >
                <Button
                  ref={ref}
                  disabled={status === "loading"}
                  className={cn(
                    "size-full rounded-xl bg-white text-black hover:bg-white font-bold transition-all duration-300 flex items-center justify-center gap-2",
                    className
                  )}
                  {...props}
                >
                  <AnimatePresence mode="wait">
                    <StatusIcon status={status} />
                  </AnimatePresence>
                  <span className="text-black uppercase text-xs tracking-widest font-black">
                    {status === "loading" ? "Sending..." : status === "success" ? "Sent!" : status === "error" ? "Failed" : "Sending..."}
                  </span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    )
  }
)

SlideButton.displayName = "SlideButton"

export { SlideButton }
