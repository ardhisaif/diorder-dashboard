import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabaseUrl = "https://sewwxvvscpmvinihyrcq.supabase.co";
const supabaseKey =
  process.env.SUPABASE_ANON_KEY ||
  (() => {
    throw new Error(
      "SUPABASE_ANON_KEY is not defined in the environment variables"
    );
  })();
const supabase = createClient(supabaseUrl, supabaseKey);

// Get all merchants
export async function getMerchants() {
  const { data, error } = await supabase.from("merchants").select("*");
  if (error) throw error;
  return data;
}

// Get merchant by ID
export async function getMerchantById(id: number) {
  const { data, error } = await supabase
    .from("merchants")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

// Get recent merchants
export async function getRecentMerchants(limit: number) {
  const { data, error } = await supabase
    .from("merchants")
    .select("*")
    .limit(limit);
  if (error) throw error;
  return data;
}

// Create a new merchant
export async function createMerchant(merchant: any) {
  const { data, error } = await supabase.from("merchants").insert([merchant]);
  if (error) throw error;
  return data;
}

// Update an existing merchant
export async function updateMerchant(id: number, merchant: any) {
  const { data, error } = await supabase
    .from("merchants")
    .update(merchant)
    .eq("id", id);
  if (error) throw error;
  return data;
}

// Delete a merchant
export async function deleteMerchant(id: number) {
  const { data, error } = await supabase
    .from("merchants")
    .delete()
    .eq("id", id);
  if (error) throw error;
  return data;
}

// Get all menus
export async function getMenus() {
  const { data, error } = await supabase.from("menu").select("*");
  if (error) throw error;
  return data;
}

// Get menu by ID
export async function getMenuById(id: number) {
  const { data, error } = await supabase
    .from("menu")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

// Get recent menus
export async function getRecentMenus(limit: number) {
  const { data, error } = await supabase.from("menu").select("*").limit(limit);
  if (error) throw error;
  return data;
}

// Get menus by merchant ID
export async function getMenusByMerchantId(merchantId: number) {
  const { data, error } = await supabase
    .from("menu")
    .select("*")
    .eq("merchant_id", merchantId);
  if (error) throw error;
  return data;
}

// Create a new menu
export async function createMenu(menu: any) {
  const { data, error } = await supabase.from("menu").insert([menu]);
  if (error) throw error;
  return data;
}

// Update an existing menu
export async function updateMenu(id: number, menu: any) {
  const { data, error } = await supabase.from("menu").update(menu).eq("id", id);
  if (error) throw error;
  return data;
}

// Delete a menu
export async function deleteMenu(id: number) {
  const { data, error } = await supabase.from("menu").delete().eq("id", id);
  if (error) throw error;
  return data;
}
