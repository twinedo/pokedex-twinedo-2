import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { _useAxios } from '../../useAxios';

export function useGetPokemons() {
	const { ...rest } = useInfiniteQuery({
		queryKey: ['useGetPokemons'],
		queryFn: async ({ pageParam }) => {
			try {
				const response = await _useAxios({
					method: 'get',
					url: pageParam,
				});
				console.log('list poke', response);
				return response?.data;
			} catch (error) {
				return error;
			}
		},
		initialPageParam: 'https://pokeapi.co/api/v2/pokemon',
		getNextPageParam: (lastPage: {
			count: number;
			next: string | null;
			previous: string | null;
			results: any[];
		}) => lastPage?.next! || undefined,
	});
	return { ...rest };
}

export function useGetPokemonByName(name: string) {
	const { ...rest } = useQuery({
		queryKey: ['useGetPokemonByName', name.toString()],
		queryFn: async () => {
			try {
				const response = await _useAxios({
					method: 'get',
					url: `/pokemon/${name}`,
				});
				console.log('poke by name', response);
				return response?.data;
			} catch (error) {
				return error;
			}
		},
		// initialPageParam: 'https://pokeapi.co/api/v2/pokemon/',
		// getNextPageParam: (lastPage: {
		// 	count: number;
		// 	next: string | null;
		// 	previous: string | null;
		// 	results: any[];
		// }) => lastPage?.next! || undefined,
	});
	return { ...rest };
}
