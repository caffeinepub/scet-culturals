import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Registration {
    id: bigint;
    name: string;
    email: string;
    teamMembers: Array<string>;
    event: string;
    phone: string;
    college: string;
}
export interface Contact {
    id: bigint;
    name: string;
    email: string;
    message: string;
}
export interface Event {
    name: string;
    description: string;
    category: string;
    prizes: Array<string>;
    maxParticipants: bigint;
}
export interface backendInterface {
    getAllContacts(): Promise<Array<Contact>>;
    getAllEvents(): Promise<Array<Event>>;
    getAllRegistrations(): Promise<Array<Registration>>;
    getRegistrationsByEvent(eventName: string): Promise<Array<Registration>>;
    registerEvent(name: string, email: string, phone: string, college: string, event: string, teamMembers: Array<string>): Promise<void>;
    searchEventsByCategory(category: string): Promise<Array<Event>>;
    submitContactForm(name: string, email: string, message: string): Promise<void>;
}
