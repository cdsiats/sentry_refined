<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { LayoutDashboardIcon, KanbanIcon } from 'lucide-svelte';
</script>

<div class="flex min-h-screen">
	<div class="w-[150px] bg-secondary py-4 max-md:hidden">
		<p class="text-center text-2xl">Sentry</p>
		<nav class="my-4">
			<ul class="flex flex-col gap-2">
				<li>
					<Button
						class="w-full hover:bg-primary hover:text-primary-foreground"
						variant="ghost"
						size="sm"
						href="/dashboard"
					>
						<LayoutDashboardIcon class="m-1 h-4 w-4" />
						Dashboard
					</Button>
				</li>
				<li>
					<Button
						class="w-full hover:bg-primary hover:text-primary-foreground"
						variant="ghost"
						size="sm"
						href="/tickets"
					>
						<KanbanIcon class="m-1 h-4 w-4" />
						Tickets
					</Button>
				</li>
			</ul>
		</nav>
	</div>
	<div class="flex-1 overflow-y-scroll">
		<slot />
	</div>
</div>
