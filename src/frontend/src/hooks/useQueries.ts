import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Appointment } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllAppointments() {
  const { actor, isFetching } = useActor();
  return useQuery<Appointment[]>({
    queryKey: ["appointments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAppointments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitAppointment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (appointment: Appointment) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitAppointment(appointment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}
