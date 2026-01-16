<script lang="ts">
	import "../app.css";

	import LanguageSelection from "../lib/components/LanguageSelection.svelte";

	let { children } = $props();
</script>

<LanguageSelection />
{@render children()}
