import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { createClient } from "@/utils/supabase/client";
import type { Database } from "@/lib/database.types";
import {
  createContact,
  updateContact,
  deleteContact,
} from "@/lib/actions/contacts";
import type { ContactFormData } from "@/lib/schemas/contacts";
import { toast } from "sonner";

type Contact = Database["public"]["Tables"]["contacts"]["Row"];

export function useContacts(
  applicationId: string,
  initialData: Contact[],
) {
  return useQuery<Contact[]>({
    queryKey: ["contacts", applicationId],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("contacts")
        .select("*")
        .eq("application_id", applicationId);
      return data ?? [];
    },
    initialData,
  });
}

export function useCreateContact(applicationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ContactFormData) =>
      createContact(applicationId, data),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({
          queryKey: ["contacts", applicationId],
        });
      }
    },
  });
}

export function useUpdateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: ContactFormData;
    }) => updateContact(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["contacts"] });

      const previous = queryClient.getQueriesData<Contact[]>({
        queryKey: ["contacts"],
      });

      queryClient.setQueriesData<Contact[]>(
        { queryKey: ["contacts"] },
        (old) => {
          if (!old) return old;
          return old.map((contact) =>
            contact.id === id ? { ...contact, ...data } : contact,
          );
        },
      );

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        for (const [key, data] of context.previous) {
          queryClient.setQueryData(key, data);
        }
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}

export function useDeleteContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteContact(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["contacts"] });

      const previous = queryClient.getQueriesData<Contact[]>({
        queryKey: ["contacts"],
      });

      queryClient.setQueriesData<Contact[]>(
        { queryKey: ["contacts"] },
        (old) => {
          if (!old) return old;
          return old.filter((contact) => contact.id !== id);
        },
      );

      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        for (const [key, data] of context.previous) {
          queryClient.setQueryData(key, data);
        }
      }
      toast.error("Failed to delete contact");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}
