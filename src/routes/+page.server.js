import { supabase } from "$lib/services/supabase/client";

export async function load() {
	const { data, error } = await supabase
		.from("neighbourhoods")
		.select()
		.order("business_unit", { ascending: true })
		.order("feeder_name", { ascending: true });
	return {
		neighbourhoods: data ?? [],
		error: error?.message || "Couldn't fetch neighbourhoods"
	};
}
