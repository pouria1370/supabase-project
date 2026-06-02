import * as Supabase from "@supabase/supabase-js";
const apiUrl = import.meta.env.VITE_SUPABASE_URL;
const apiKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const supabase = Supabase.createClient(apiUrl, apiKey);
const deleteTask = (id: number) => {
  return supabase.from("tasks").delete().eq("id", id);
};
const updateTask = (id: number, title: string) => {
  return supabase.from("tasks").update({ title }).eq("id", id);
};
const insertTask = (title: string, email: string, imageUrl?: string) => {
  return supabase
    .from("tasks")
    .insert({ title, email, image_url: imageUrl })
    .single();
};
const getTask = () => {
  return supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: true });
};
export { deleteTask, insertTask, updateTask, getTask, supabase };
