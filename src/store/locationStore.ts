import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  color: string;
}

interface LocationState {
  locations: Location[];
  addLocation: (location: Omit<Location, "id">) => void;
  updateLocation: (id: string, location: Partial<Omit<Location, "id">>) => void;
  deleteLocation: (id: string) => void;
  getLocationById: (id: string) => Location | undefined;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set, get) => ({
      locations: [],

      addLocation: (location) => {
        const id = crypto.randomUUID();
        set((state) => ({
          locations: [...state.locations, { ...location, id }],
        }));
      },

      updateLocation: (id, updatedLocation) => {
        set((state) => ({
          locations: state.locations.map((location) =>
            location.id === id ? { ...location, ...updatedLocation } : location
          ),
        }));
      },

      deleteLocation: (id) => {
        set((state) => ({
          locations: state.locations.filter((location) => location.id !== id),
        }));
      },

      getLocationById: (id) => {
        return get().locations.find((location) => location.id === id);
      },
    }),
    {
      name: "location-storage",
    }
  )
);
