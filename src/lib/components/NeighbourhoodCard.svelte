<script>
	import { supabase } from "$lib/services/supabase/client";
	import { formatTimestamp } from "little-timestamp";

	let { neighbourhood } = $props();

	let currentStatus = $derived(neighbourhood.status);
	let isUpdating = $state(false);

	async function updateStatus(newStatus) {
        console.log(newStatus);
		if (isUpdating) return;

		const previousStatus = currentStatus;
		currentStatus = newStatus;
		isUpdating = true;

		const { error } = await supabase
			.from("neighbourhoods")
			.update({ status: newStatus, last_updated: new Date().toISOString() })
            .eq("id", neighbourhood.id);

        if (error) {
            console.error("Update Failed:", error);
            currentStatus = previousStatus;
            alert("Failed to update status. Please try again");
        }

        isUpdating = false;
	}
</script>

<div class="card {currentStatus}">
	<div class="header">
		<div class="header_info">
			<h3>{neighbourhood.feeder_name}</h3>
			<p class="feeder_location">
				{neighbourhood.undertaking} <span class="seperator">•</span>
				<span class="business_unit">{neighbourhood.business_unit}</span>
			</p>
		</div>
		<div class="band_tag">{neighbourhood.service_band}</div>
	</div>

	<div class="body">
		<div class="content">
			<div class="icon"><i class="i-ri:lightbulb-flash-fill"></i></div>
			<div>
				<p class="status">
					Status: <span class="status_value">{neighbourhood.status || "No Report"}</span>
				</p>
				<p class="last_verified">
					Verified {formatTimestamp(new Date(neighbourhood.last_updated))}
				</p>
			</div>
		</div>
		<div>
			<button class="control_btn available" class:active={neighbourhood.status == "available"} onclick={() => updateStatus("available")}>Up Nepa</button>
			<button class="control_btn fluctuating" class:active={neighbourhood.status == "fluctuating"} onclick={() => updateStatus("fluctuating")}>Low Current</button>
			<button class="control_btn outage" class:active={neighbourhood.status == "outage"} onclick={() => updateStatus("outage")}>No light</button>
		</div>
	</div>
</div>

<style>
	.card {
		display: flex;
		flex-direction: column;
		background-color: var(--card-bg);
		background-color: color-mix(in srgb, var(--card-color) 10%, transparent 90%);
		border: 1px solid var(--card-color, var(--border));
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		border-radius: 0.5rem;
	}

    .card.available {
        --card-color: var(--available);
    }

	.card.fluctuating {
		--card-color: var(--fluctuating);
	}

	.card.outage {
		--card-color: var(--outage);
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: 1rem;
		gap: 1rem;
	}

	.header_info {
		max-width: 80%;
	}

	h3 {
		max-width: 100%;
		font-size: 1.125rem;
		font-weight: 700;
		margin-bottom: 0.25rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.feeder_location {
		font-size: 0.75rem;
		color: var(--muted);
	}

	.seperator {
		margin-inline: 0.125rem;
	}

	.business_unit {
		background-color: var(--tertiary);
		padding: 0.1rem 0.5rem;
		font-size: 0.75rem;
		font-weight: 500;
		color: #475569;
	}

	.band_tag {
		display: grid;
		place-items: center;
		background-color: var(--foreground);
		color: var(--background);
		font-size: 0.7rem;
		font-weight: 800;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
	}

	.body {
		padding: 1rem;
		padding-top: 0;
	}

	.content {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.icon {
		display: grid;
		font-size: 3rem;
        color: var(--card-color)
	}

	.status {
		margin-bottom: 0.125rem;
	}
	.status_value {
		font-weight: 600;
		text-transform: uppercase;
        color: var(--card-color);
	}

	.last_verified {
		font-size: 0.75rem;
	}

	.control_btn {
		padding: 0.5rem 0.9rem;
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		background-color: transparent;
		font-size: 0.75rem;
		font-weight: 700;
		cursor: pointer;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
		transition: 0.3s ease;
	}

    .control_btn.available:is(:hover, :focus-visible, .active) {
        border-color: var(--available);
        color: var(--available);
        background-color: color-mix(in srgb, var(--available) 5%, transparent 95%);
    }
    
    .control_btn.fluctuating:is(:hover, :focus-visible, .active) {
        border-color: var(--fluctuating);
        color: var(--fluctuating);
        background-color: color-mix(in srgb, var(--fluctuating) 5%, transparent 95%);
    }
    
    .control_btn.outage:is(:hover, :focus-visible, .active) {
        border-color: var(--outage);
        color: var(--outage);
        background-color: color-mix(in srgb, var(--outage) 5%, transparent 95%);
    }

    .control_btn:active {
        scale: .95;
    }
</style>
