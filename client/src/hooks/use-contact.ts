import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertContactSubmission } from "@shared/routes"; // Assuming shared export matches
import { useToast } from "@/hooks/use-toast";

// Manual typing since route export might not be perfectly aligned with generated zod types in partial mode
type ContactInput = InsertContactSubmission;

export function useSubmitContact() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: ContactInput) => {
      const res = await fetch(api.contact.submit.path, {
        method: api.contact.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to submit message");
      }
      
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
        variant: "default",
        className: "bg-[#18A058] text-white border-none",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
