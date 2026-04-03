import { useMutation, useQuery } from "@tanstack/react-query";
import type { Message } from "../backend.d";
import type { AdminEvent } from "../lib/adminStore";
import { useActor } from "./useActor";

// ─── Messages ───────────────────────────────────────────────────────────────

export function useGetAllMessages() {
  const { actor, isFetching } = useActor();
  return useQuery<Message[]>({
    queryKey: ["messages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMessages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddMessage() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      author,
      content,
    }: {
      author: string;
      content: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addMessage(author, content);
    },
  });
}

// ─── Legacy stubs for existing components ─────────────────────────────────────

export function useGetAllEvents() {
  const { actor, isFetching } = useActor();
  return useQuery<AdminEvent[]>({
    queryKey: ["events"],
    queryFn: async (): Promise<AdminEvent[]> => {
      // No events endpoint on current backend; rely on adminStore
      return [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.addMessage(data.name, data.message);
    },
  });
}

export function useRegisterEvent() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: Record<string, string | string[]>) => {
      if (!actor) throw new Error("Actor not ready");
      const name =
        (data.name as string) || (data.fullName as string) || "Anonymous";
      await actor.addMessage(name, `Registration: ${JSON.stringify(data)}`);
    },
  });
}
