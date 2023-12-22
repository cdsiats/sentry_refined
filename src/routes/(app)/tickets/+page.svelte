<script lang="ts">
	//@ts-nocheck
	import type { ListResult } from 'pocketbase';
	import * as Select from '$lib/components/ui/select';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Table from '$lib/components/ui/table';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Input } from '$lib/components/ui/input';
	import { ChevronLeft, ChevronRight, PlusIcon } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { pb, currentUser } from '$lib/pb.js';

	interface Ticket {
		id: string;
		title: string;
		severity: 'Severity 1' | 'Severity 2' | 'Severity 3' | 'Severity 4';
		created: string;
		expand: {
			created_by: {
				email: string;
			};
		};
		area: string;
	}

	let page = 1;
	let tickets: ListResult<Ticket>;

	async function getTickets(page: number) {
		const response = await pb.collection('tickets').getList<Ticket>(page, 10, {
			sort: '-created',
			expand: 'created_by'
		});

		tickets = response;
	}

	let title: string;
	let description: string;
	let area: { value: string; label: string };
	let severity: { value: string; label: string };

	async function submitTicket() {
		const response = await pb.collection('tickets').create({
			title: title,
			severity: severity.value,
			area: area.value,
			description: description,
			created_by: $currentUser.id
		});

		await getTickets(page);
	}

	function formatDate(date: string) {
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric'
		};

		return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
	}
</script>

<div class="px-4">
	<div class="my-2 flex justify-end">
		<Dialog.Root>
			<Dialog.Trigger>
				<Button size="sm">
					Add New Ticket
					<PlusIcon class="mx-1 h-4 w-4" />
				</Button>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Submit a Ticket</Dialog.Title>
					<Dialog.Description>
						Include proper title, description and severity of the issue you are facing.
					</Dialog.Description>
				</Dialog.Header>
				<form on:submit|preventDefault={submitTicket} class="flex flex-col gap-4">
					<div>
						<Label for="title">Title</Label>
						<Input
							bind:value={title}
							placeholder="Enter a short and concise title"
							id="title"
							type="text"
						/>
					</div>
					<div class="flex gap-1">
						<!-- Area selection -->
						<div class="flex-1">
							<Label>Area</Label>
							<Select.Root bind:selected={area}>
								<Select.Trigger>
									<Select.Value placeholder="Area" />
								</Select.Trigger>
								<Select.Content>
									<Select.Item value="College of Informatics">College of Informatics</Select.Item>
								</Select.Content>
							</Select.Root>
						</div>

						<!-- Severity selection -->
						<div class="flex-1">
							<Label>Severity</Label>
							<Select.Root bind:selected={severity}>
								<Select.Trigger>
									<Select.Value placeholder="Severity" />
								</Select.Trigger>
								<Select.Content>
									<Select.Item value="Severity 1">Severity 1 (Lowest)</Select.Item>
									<Select.Item value="Severity 2">Severity 2</Select.Item>
									<Select.Item value="Severity 3">Severity 3</Select.Item>
									<Select.Item value="Severity 4">Severity 4 (Highest)</Select.Item>
								</Select.Content>
							</Select.Root>
						</div>
					</div>
					<div class="grid">
						<Label for="description">Description</Label>
						<Textarea
							bind:value={description}
							placeholder="Be descriptive about the issue"
							id="description"
						/>
					</div>
					<div class="self-end">
						<Button type="submit">Submit</Button>
					</div>
				</form>
			</Dialog.Content>
		</Dialog.Root>
	</div>
	<div class="rounded-md border">
		<Table.Root>
			<Table.Caption>A list of all available tickets</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[100px]">Ticket ID</Table.Head>
					<Table.Head class="w-[240px] overflow-clip">Title</Table.Head>
					<Table.Head>Severity</Table.Head>
					<Table.Head>Area</Table.Head>
					<Table.Head class="w-[250px]">Created By</Table.Head>
					<Table.Head class="w-[100px]"></Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#await getTickets(page)}
					<p>Loading...</p>
				{:then data}
					{#each tickets.items as ticket (ticket.id)}
						<Table.Row>
							<Table.Cell class="font-medium">{ticket.id}</Table.Cell>
							<Table.Cell>{ticket.title}</Table.Cell>
							<Table.Cell>{ticket.severity}</Table.Cell>
							<Table.Cell>{ticket?.area}</Table.Cell>
							<Table.Cell>{ticket.expand['created_by'].email}</Table.Cell>
							<Table.Cell>
								<DropdownMenu.Root>
									<DropdownMenu.Trigger>
										<Button variant="outline" size="icon">...</Button>
									</DropdownMenu.Trigger>
									<DropdownMenu.Content>
										<DropdownMenu.Group>
											<DropdownMenu.Label>Actions</DropdownMenu.Label>
											<DropdownMenu.Separator />
											<DropdownMenu.Item>
												<a href="/tickets/{ticket.id}">View ticket</a>
											</DropdownMenu.Item>
										</DropdownMenu.Group>
									</DropdownMenu.Content>
								</DropdownMenu.Root>
							</Table.Cell>
						</Table.Row>
					{/each}
				{/await}
			</Table.Body>
		</Table.Root>
		<div class="m-2 flex justify-end gap-1">
			<Button disabled={page == 1} size="icon">
				<ChevronLeft />
			</Button>
			<Button disabled={page == tickets?.totalPages} size="icon">
				<ChevronRight />
			</Button>
		</div>
	</div>
</div>
