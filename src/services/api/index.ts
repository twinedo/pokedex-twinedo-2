import { Zodios } from '@zodios/core';
import { ZodiosHooks } from '@zodios/react';
import { z } from 'zod';

const apiClient = new Zodios(
	`${process.env.EXPO_PUBLIC_API_URL}`,
	// API definition
	[
		{
			method: 'get',
			path: '/pokemon',
			alias: 'getPokemons',
			description: 'Get pokemon list',
			response: z.object({
				count: z.number(),
				next: z.string(),
				previous: z.string(),
				results: z.array(
					z.object({
						name: z.string(),
						url: z.string(),
					})
				),
			}),
		},
		{
			method: 'get',
			path: '/pokemon/:id', // auto detect :id and ask for it in apiClient get params
			alias: 'getPokemonByID', // optional alias to call this endpoint with it
			description: 'Get a pokemon by id',
			response: z.object({
				abilities: z.array(
					z.object({
						ability: z.object({ name: z.string(), url: z.string() }),
						is_hidden: z.boolean(),
						slot: z.number(),
					})
				),
				base_experience: z.number(),
				cries: z.object({
					latest: z.string(),
					legacy: z.string(),
				}),
				forms: z.array(z.object({ name: z.string(), url: z.string() })),
				game_indices: z.array(
					z.object({
						game_index: z.number(),
						version: z.object({
							name: z.string(),
							url: z.string(),
						}),
					})
				),
				height: z.number(),
				held_items: z.array(z.any()),
				id: z.number(),
				is_default: z.boolean(),
				location_area_encounters: z.string(),
				moves: z.array(
					z.object({
						move: z.object({ name: z.string(), url: z.string() }),
						version_group_details: z.array(
							z.object({
								level_learned_at: z.number(),
								move_learn_method: z.object({
									name: z.string(),
									url: z.string(),
								}),
								version_group: z.object({ name: z.string(), url: z.string() }),
							})
						),
					})
				),
				name: z.string(),
				order: z.number(),
				past_abilities: z.array(z.any()),
				past_types: z.array(z.any()),
				species: z.object({ name: z.string(), url: z.string() }),
				sprites: z.object({
					back_default: z.string().or(z.null()),
					back_female: z.string().or(z.null()),
					back_shiny: z.string().or(z.null()),
					back_shiny_female: z.string().or(z.null()),
					front_default: z.string().or(z.null()),
					front_female: z.string().or(z.null()),
					front_shiny: z.string().or(z.null()),
					front_shiny_female: z.string().or(z.null()),
					other: z.object({
						dream_world: z.object({
							front_default: z.string().or(z.null()),
							front_female: z.string().or(z.null()),
						}),
						home: z.object({
							front_default: z.string().or(z.null()),
							front_female: z.string().or(z.null()),
							front_shiny: z.string().or(z.null()),
							front_shiny_female: z.string().or(z.null()),
						}),
						'official-artwork': z.object({
							front_default: z.string().or(z.null()),
							front_shiny: z.string().or(z.null()),
						}),
						showdown: z.object({
							back_default: z.string().or(z.null()),
							back_female: z.string().or(z.null()),
							back_shiny: z.string().or(z.null()),
							back_shiny_female: z.string().or(z.null()),
							front_default: z.string().or(z.null()),
							front_female: z.string().or(z.null()),
							front_shiny: z.string().or(z.null()),
							front_shiny_female: z.string().or(z.null()),
						}),
					}),
				}),
				weight: z.number(),
			}),
		},
	]
);

export const apiHooks = new ZodiosHooks('PokemonAPI', apiClient);
