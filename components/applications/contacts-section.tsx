"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Pencil, Trash2, ExternalLink, Mail } from "lucide-react";
import { toast } from "sonner";

import type { Database } from "@/lib/database.types";
import { contactSchema, type ContactFormData } from "@/lib/schemas/contacts";
import {
  useContacts,
  useCreateContact,
  useUpdateContact,
  useDeleteContact,
} from "@/hooks/use-contacts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Contact = Database["public"]["Tables"]["contacts"]["Row"];

function ContactCard({
  contact,
  onEdit,
}: {
  contact: Contact;
  onEdit: (contact: Contact) => void;
}) {
  const deleteMutation = useDeleteContact();

  return (
    <Card size="sm" className="rounded-none border border-border bg-card">
      <CardContent>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-1">
            <p className="font-sans text-sm">{contact.name}</p>
            {contact.role && (
              <p className="font-mono text-[10px] text-muted-foreground">{contact.role}</p>
            )}
            <div className="flex items-center gap-3 pt-1">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-1 font-mono text-[10px] text-muted-foreground hover:text-foreground"
                >
                  <Mail className="size-3" />
                  {contact.email}
                </a>
              )}
              {contact.linkedin_url && (
                <a
                  href={contact.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[10px] text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="size-3" />
                  LinkedIn
                </a>
              )}
            </div>
            {contact.notes && (
              <p className="pt-1 font-mono text-[10px] text-muted-foreground">
                {contact.notes}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="icon-xs"
              className="cursor-pointer"
              onClick={() => onEdit(contact)}
            >
              <Pencil className="size-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              className="cursor-pointer"
              onClick={() => deleteMutation.mutate(contact.id)}
            >
              <Trash2 className="size-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ContactDialog({
  open,
  onOpenChange,
  applicationId,
  contact,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  applicationId: string;
  contact?: Contact | null;
}) {
  const createMutation = useCreateContact(applicationId);
  const updateMutation = useUpdateContact();
  const isEdit = !!contact;

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: contact?.name ?? "",
      role: contact?.role ?? "",
      email: contact?.email ?? "",
      linkedin_url: contact?.linkedin_url ?? "",
      notes: contact?.notes ?? "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: contact?.name ?? "",
        role: contact?.role ?? "",
        email: contact?.email ?? "",
        linkedin_url: contact?.linkedin_url ?? "",
        notes: contact?.notes ?? "",
      });
    }
  }, [open, contact, reset]);

  const onSubmit = async (data: ContactFormData) => {
    if (isEdit) {
      const result = await updateMutation.mutateAsync({
        id: contact!.id,
        data,
      });
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Contact updated");
        reset();
        onOpenChange(false);
      }
    } else {
      const result = await createMutation.mutateAsync(data);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Contact added");
        reset();
        onOpenChange(false);
      }
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-none sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-xs uppercase tracking-wider">
            {isEdit ? "// EDIT CONTACT" : "// ADD CONTACT"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the contact details."
              : "Add a new contact for this application."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="py-4">
            <div className="flex flex-col gap-5">
              <Field>
                <Label htmlFor="name">Name</Label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="name"
                      placeholder="Jane Smith"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </Field>
              <Field>
                <Label htmlFor="role">Role</Label>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="role"
                      placeholder="Engineering Manager"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                  )}
                />
              </Field>
              <Field>
                <Label htmlFor="email">Email</Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@company.com"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </Field>
              <Field>
                <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                <Controller
                  name="linkedin_url"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="linkedin_url"
                      type="url"
                      placeholder="https://linkedin.com/in/janesmith"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.linkedin_url && (
                  <p className="text-sm text-destructive">
                    {errors.linkedin_url.message}
                  </p>
                )}
              </Field>
              <Field>
                <Label htmlFor="notes">Notes</Label>
                <Controller
                  name="notes"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      id="notes"
                      placeholder="Any additional notes about this contact..."
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                  )}
                />
              </Field>
            </div>
          </FieldGroup>
          <DialogFooter>
          <DialogClose
            render={
              <Button variant="outline" type="button" className="rounded-none">
                Cancel
              </Button>
            }
          />
          <Button type="submit" className="rounded-none" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : isEdit
                ? "Save Changes"
                : "Add Contact"}
          </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function ContactsSection({
  applicationId,
  initialContacts,
}: {
  applicationId: string;
  initialContacts: Contact[];
}) {
  const { data: contacts } = useContacts(applicationId, initialContacts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  const handleAdd = () => {
    setEditingContact(null);
    setDialogOpen(true);
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setDialogOpen(true);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-heading text-xs uppercase tracking-wider text-muted-foreground">
          {contacts.length} contact{contacts.length !== 1 ? "s" : ""}
        </h3>
          <Button size="sm" className="rounded-none" onClick={handleAdd}>
          <Plus className="mr-1 size-4" />
          Add Contact
        </Button>
      </div>

      {contacts.length === 0 ? (
        <p className="py-8 text-center font-mono text-sm text-muted-foreground">
          No contacts yet. Add one to get started.
        </p>
      ) : (
        <div className="space-y-2">
          {contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}

      <ContactDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        applicationId={applicationId}
        contact={editingContact}
      />
    </div>
  );
}
