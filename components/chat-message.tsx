"use client";

import { useTheme } from "next-themes";
import { BeatLoader } from "react-spinners";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { BotAvatar } from "@/components/bot-avatar";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { Copy, Speech } from "lucide-react";

export interface ChatMessageProps {
  role: "system" | "user";
  content?: string;
  isLoading?: boolean;
  src?: string;
}

export const ChatMessage = ({
  role,
  content,
  isLoading,
  src,
}: ChatMessageProps) => {
  const { toast } = useToast();
  const { theme } = useTheme();

  const onCopy = () => {
    if (!content) {
      return;
    }

    navigator.clipboard.writeText(content);
    toast({
      description: "Message copied to clipboard",
    });
  };

  const onSpeech = () => {
    if (!content) {
      return;
    }

    // Create a new SpeechSynthesisUtterance instance
    const utterance = new SpeechSynthesisUtterance(content);

    // Optionally, you can set attributes like rate, pitch, volume, etc.
    // utterance.rate = 1;
    // utterance.pitch = 100;
    // utterance.volume = 1;

    // Use the SpeechSynthesis instance to speak the utterance
    window.speechSynthesis.speak(utterance);

    toast({
      description: "Reading started, This feature is under BETA phase",
    });
  };

  return (
    <div
      className={cn(
        "group flex items-start gap-x-3 py-4 w-full",
        role === "user" && "justify-end"
      )}
    >
      {role !== "user" && src && <BotAvatar src={src} />}
      <div className="max-w-sm px-4 py-2 rounded-md bg-primary/10">
        {isLoading ? (
          <BeatLoader size={5} color={theme === "light" ? "black" : "white"} />
        ) : (
          content
        )}
      </div>
      {role === "user" && <UserAvatar />}
      {role !== "user" && !isLoading && (
        <Button
          onClick={onCopy}
          className="transition opacity-0 group-hover:opacity-100"
          size="icon"
          variant="ghost"
        >
          <Copy className="w-4 h-4" />
        </Button>
      )}
      {role !== "user" && !isLoading && (
        <Button
          onClick={onSpeech}
          className="transition opacity-0 group-hover:opacity-100"
          size="icon"
          variant="ghost"
        >
          <Speech className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};
