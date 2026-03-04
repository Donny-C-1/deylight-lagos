import { supabase } from "$lib/services/supabase/client";

export async function load() {
	const { data, error } = await supabase.from("neighbourhoods").select();
	return {
		neighbourhoods: data ?? [],
		error: error?.message || "Couldn't fetch neighbourhoods"
	};
}
