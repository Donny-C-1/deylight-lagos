<script>
	import { formatTimestamp } from "little-timestamp";
    import { supabase } from "$lib/services/supabase/client";
	import NeighbourhoodCard from "$lib/components/NeighbourhoodCard.svelte";
	import { onMount } from "svelte";

	let { data } = $props();

    let neighbourhoods = $derived(data.neighbourhoods || [])
    let searchQuery = $state("");

    let filteredNeighbours = $derived.by(() => {
        const query = searchQuery.toLowerCase().trim();

        if (!query) return neighbourhoods;

        if (query.includes(":")) {
            const [prefix, value] = query.split(":");

            if (prefix === "disco") {
                return neighbourhoods.filter(n => n.disco.toLowerCase().includes(value));
            }

            if (prefix === "unit") {
                return neighbourhoods.filter(n => n.business_unit.toLowerCase().includes(value));
            }
        }

        return neighbourhoods.filter(n => 
            n.feeder_name.toLowerCase().includes(query) ||
            n.undertaking?.toLowerCase().includes(query) ||
            n.business_unit.toLowerCase().includes(query)
        );
    })
</script>

<div class="page">
	<header>
		<h1>DeyLight Lagos - Real Time Power Status</h1>
	</header>
	<main>
		<div class="container">
            <label class="search_bar" for="query">
                <i class="i-ri:search-ai-line"></i>
                <input bind:value={searchQuery} class="query_input" type="text" name="query" id="query" placeholder="Search your neighbourhood" />
            </label>
            <div class="grid">
                {#each filteredNeighbours as neighbourhood}
                    <NeighbourhoodCard {neighbourhood} />
                {/each}
            </div>
        </div>
	</main>
	<footer>
		<p>Created by Donny C &copy; {new Date().getFullYear()}</p>
	</footer>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
	header {
		background-color: var(--secondary);
        padding: 1rem;
	}

    h1 {
        font-weight: 600;
        font-size: 1.25rem;
    }

	main {
		flex-grow: 1;
	}
    
    .container {
        max-width: 90rem;
        margin: 0 auto;
        padding: 1rem;
    }

    .search_bar {
        display: flex;
        background-color: var(--primary-foreground);
        gap: .5rem;
        border: .1rem solid var(--border);
        padding: .75rem;
        transition: .3s ease;
        border-radius: .5rem;
        color: var(--muted);
        margin-bottom: 2rem;
    }

    .search_bar:has(input:focus) {
        border-color: var(--foreground);
    }

    .query_input {
        flex-grow: 1;
        border: 0;
        outline: 0;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(90%, 20rem), 1fr));
        gap: 2rem;
    }

	footer {
		text-align: center;
	}
    
    @media screen and (min-width: 40rem) {
        main {
            padding: 1rem 3rem;
        }
    }
</style>
