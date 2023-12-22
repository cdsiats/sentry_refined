<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { pb } from '$lib/pb.js';

	let email: string;
	let password: string;

	async function login() {
		const response = await pb.collection('users').authWithPassword(email, password);
	}
</script>

<form on:submit|preventDefault={login} action="" method="post">
	<Label>Email Address</Label>
	<Input bind:value={email} type="email" />
	<Label>Password</Label>
	<Input bind:value={password} type="password" />
	<Button type="submit">Log in</Button>
</form>
