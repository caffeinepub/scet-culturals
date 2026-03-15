import { useMutation, useQuery } from "@tanstack/react-query";
import type { Event } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllEvents() {
  const { actor, isFetching } = useActor();
  return useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEvents();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRegisterEvent() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      college: string;
      event: string;
      teamMembers: string[];
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.registerEvent(
        data.name,
        data.email,
        data.phone,
        data.college,
        data.event,
        data.teamMembers,
      );
    },
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
      return actor.submitContactForm(data.name, data.email, data.message);
    },
  });
}
