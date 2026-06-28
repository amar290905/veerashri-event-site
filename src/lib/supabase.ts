import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseKey
);

export const supabase = createClient(
  supabaseUrl ?? "",
  supabaseKey ?? ""
);

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type SubscriberPayload = {
  email: string;
};

// =========================
// CONTACT
// =========================

export const insertContact = async (contact: ContactPayload) => {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment."
    );
  }

  const { error } = await supabase.from("conatct").insert([
    {
      name: contact.name,
      email: contact.email,
      "phone number": contact.phone,
      message: contact.message,
    },
  ]);

  if (error) {
    throw error;
  }
};

export const fetchContacts = async () => {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase is not configured."
    );
  }

  const { data, error } = await supabase
    .from("conatct")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

export const deleteContact = async (id: number) => {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase is not configured."
    );
  }

  const { error } = await supabase
    .from("conatct")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
};

// =========================
// NEWSLETTER
// =========================

export const insertSubscriber = async (
  subscriber: SubscriberPayload
) => {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase is not configured."
    );
  }

  const { error } = await supabase
    .from("newsletter")
    .insert([
      {
        email: subscriber.email,
      },
    ]);

  if (error) {
    throw error;
  }
};

export const fetchSubscribers = async () => {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase is not configured."
    );
  }

  const { data, error } = await supabase
    .from("newsletter")
    .select("*")
    .order("subscribed_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

export const deleteSubscriber = async (id: number) => {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase is not configured."
    );
  }

  const { error } = await supabase
    .from("newsletter")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
};