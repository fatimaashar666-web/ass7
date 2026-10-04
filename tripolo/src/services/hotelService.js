import { getClient } from "./supabase";

export async function getHotels(limit) {
  let query = getClient().from("hotels").select("*").order("rating", { ascending: false });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getHotelsByDestination(destination) {
  const term = destination.trim().replace(/[%,()]/g, "");
  if (!term) return getHotels();
  const { data, error } = await getClient()
    .from("hotels")
    .select("*")
    .or(`location.ilike.%${term}%,name.ilike.%${term}%`)
    .order("rating", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getHotelById(id) {
  const { data, error } = await getClient().from("hotels").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
}
