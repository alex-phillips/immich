<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import CreateSharedLink from '$lib/components/photos-page/actions/create-shared-link.svelte';
	import DeleteAssets from '$lib/components/photos-page/actions/delete-assets.svelte';
	import DownloadFiles from '$lib/components/photos-page/actions/download-files.svelte';
	import MoveToArchive from '$lib/components/photos-page/actions/move-to-archive.svelte';
	import RemoveFromArchive from '$lib/components/photos-page/actions/remove-from-archive.svelte';
	import AssetSelectContextMenu from '$lib/components/photos-page/asset-select-context-menu.svelte';
	import AssetSelectControlBar from '$lib/components/photos-page/asset-select-control-bar.svelte';
	import OptionAddToAlbum from '$lib/components/photos-page/menu-options/option-add-to-album.svelte';
	import OptionAddToFavorites from '$lib/components/photos-page/menu-options/option-add-to-favorites.svelte';
	import OptionRemoveFromFavorites from '$lib/components/photos-page/menu-options/option-remove-from-favorites.svelte';
	import ControlAppBar from '$lib/components/shared-components/control-app-bar.svelte';
	import GalleryViewer from '$lib/components/shared-components/gallery-viewer/gallery-viewer.svelte';
	import SearchBar from '$lib/components/shared-components/search-bar/search-bar.svelte';
	import { AssetResponseDto } from '@api';
	import ArrowLeft from 'svelte-material-icons/ArrowLeft.svelte';
	import ImageOffOutline from 'svelte-material-icons/ImageOffOutline.svelte';
	import Plus from 'svelte-material-icons/Plus.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	// The GalleryViewer pushes it's own history state, which causes weird
	// behavior for history.back(). To prevent that we store the previous page
	// manually and navigate back to that.
	let previousRoute = '/explore';

	afterNavigate(({ from }) => {
		// Prevent setting previousRoute to the current page.
		if (from && from.route.id !== $page.route.id) {
			previousRoute = from.url.href;
		}
	});

	$: term = $page.url.searchParams.get('q') || data.term || '';

	let selectedAssets: Set<AssetResponseDto> = new Set();
	$: isMultiSelectionMode = selectedAssets.size > 0;
	$: isAllArchived = Array.from(selectedAssets).every((asset) => asset.isArchived);
	$: isAllFavorite = Array.from(selectedAssets).every((asset) => asset.isFavorite);
	$: searchResultAssets = data.results.assets.items;

	const onAssetDelete = (assetId: string) => {
		searchResultAssets = searchResultAssets.filter((a: AssetResponseDto) => a.id !== assetId);
	};
</script>

<section>
	{#if isMultiSelectionMode}
		<AssetSelectControlBar assets={selectedAssets} clearSelect={() => (selectedAssets = new Set())}>
			<CreateSharedLink />
			{#if isAllArchived}
				<RemoveFromArchive />
			{:else}
				<MoveToArchive />
			{/if}
			<DownloadFiles />
			<AssetSelectContextMenu icon={Plus} title="Add">
				{#if isAllFavorite}
					<OptionRemoveFromFavorites />
				{:else}
					<OptionAddToFavorites />
				{/if}
				<OptionAddToAlbum />
				<OptionAddToAlbum shared />
			</AssetSelectContextMenu>
			<DeleteAssets {onAssetDelete} />
		</AssetSelectControlBar>
	{:else}
		<ControlAppBar on:close-button-click={() => goto(previousRoute)} backIcon={ArrowLeft}>
			<div class="w-full max-w-2xl flex-1 pl-4">
				<SearchBar grayTheme={false} value={term} />
			</div>
		</ControlAppBar>
	{/if}
</section>

<section class="relative pt-32 mb-12 bg-immich-bg dark:bg-immich-dark-bg">
	<section class="overflow-y-auto relative immich-scrollbar">
		<section id="search-content" class="relative bg-immich-bg dark:bg-immich-dark-bg">
			{#if data.results?.assets?.items.length > 0}
				<div class="pl-4">
					<GalleryViewer
						assets={searchResultAssets}
						bind:selectedAssets
						viewFrom="search-page"
						showArchiveIcon={true}
					/>
				</div>
			{:else}
				<div
					class="flex items-center place-content-center w-full min-h-[calc(100vh_-_11rem)] dark:text-white"
				>
					<div class="flex flex-col content-center items-center text-center">
						<ImageOffOutline size="3.5em" />
						<p class="font-medium text-3xl mt-5">No results</p>
						<p class="text-base font-normal">Try a synonym or more general keyword</p>
					</div>
				</div>
			{/if}
		</section>
	</section>
</section>
