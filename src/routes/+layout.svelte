<script lang="ts">
	import { onMount } from "svelte";
	import "../app.css";
	import LanguageSelection from "../lib/components/LanguageSelection.svelte";
	import { loadSettingsFromStorage } from "$lib/stores/settings.js";

	let { children } = $props();

	// Load user preferences after hydration completes
	onMount(() => {
		loadSettingsFromStorage();
	});
</script>

<LanguageSelection />
{@render children()}
