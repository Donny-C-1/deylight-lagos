<script>
	import "virtual:uno.css";
	import "$lib/css/app.css";
	import favicon from "$lib/assets/icon.svg";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Deylight Lagos</title>
</svelte:head>

{@render children()}
