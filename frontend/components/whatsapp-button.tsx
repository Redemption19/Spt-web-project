"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { MessageCircle, X, ArrowLeft } from "lucide-react"
import Image from "next/image"
import ClaudeStyleChat from "@/app/components/ClaudeStyleChat"

export function WhatsAppButton() {
  const [showDialog, setShowDialog] = useState(false)
  const [showChatBot, setShowChatBot] = useState(false)
  const whatsappNumber = "+233241350760"
  const [height, setHeight] = useState("600px")
  
  // Update height based on viewport height
  useEffect(() => {
    const updateHeight = () => {
      const vh = window.innerHeight * 0.8; // Increased to 90% of viewport height
      setHeight(`${vh}px`);
    };
    
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);
  
  const handleStartChat = () => {
    const encodedNumber = encodeURIComponent(whatsappNumber)
    const url = `https://api.whatsapp.com/send/?phone=${encodedNumber}&type=phone_number&app_absent=0`
    window.open(url, "_blank")
    setShowDialog(false)
  }

  const handleStartChatBot = () => {
    setShowChatBot(true)
  }

  const handleBackToOptions = () => {
    setShowChatBot(false)
  }

  const handleCloseDialog = () => {
    setShowDialog(false)
    setShowChatBot(false)
  }

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 rounded-full h-14 w-14 sm:h-16 sm:w-16 shadow-lg z-50 bg-accent hover:bg-accent/90 p-0 flex items-center justify-center"
        onClick={() => setShowDialog(true)}
        aria-label="Open chat options"
      >
        <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8 text-accent-foreground" />
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent 
          className={`fixed !bottom-[90px] sm:!bottom-[100px] !top-auto !right-4 sm:!right-6 !left-auto !translate-x-0 !translate-y-0 max-w-[400px] ${showChatBot ? `h-[${height}] max-h-[95vh]` : ''} p-0 gap-0 shadow-xl border bg-background rounded-xl overflow-hidden`}
          style={showChatBot ? { height, maxHeight: '95vh' } : {}}
        >
          {!showChatBot ? (
            <>
              <div className="flex items-center p-4 border-b bg-primary/5">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
                  onClick={handleCloseDialog}
                >
                  <X className="h-4 w-4" />
                </Button>

                <div className="bg-primary/10 p-2 rounded-lg mx-auto">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0 text-center">
                  <h2 className="font-semibold text-foreground">
                    Message Central Team
                  </h2>
                </div>
              </div>

              {/* Message Preview */}
              <div className="bg-muted/50 p-4">
                <div className="bg-background rounded-lg p-3 shadow-sm max-w-[85%] border">
                  <p className="text-sm text-foreground">How would you like to chat with us?</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 space-y-3">
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2 py-6"
                  onClick={handleStartChatBot}
                >
                  <MessageCircle className="h-5 w-5" />
                  Start ChatBot
                </Button>
                
                <Button
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground gap-2 py-6"
                  onClick={handleStartChat}
                >
                  <MessageCircle className="h-5 w-5" />
                  Start WhatsApp Chat
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col h-full bg-background overflow-hidden">
              <ClaudeStyleChat />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
