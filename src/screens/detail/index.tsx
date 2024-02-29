import {
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavParam } from '../../navigations/types';
import { BaseContainer } from '../../components/layout';
import { Spacer, Toolbar } from '../../components/basic';
import { Ionicons } from '@expo/vector-icons';
import { BLACK, GREY1, RED, WHITE } from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';
import { Image } from 'expo-image';
import { useGetPokemonByName } from '../../services/api/pokemons';
import usePokedexStore, { IPokemonState } from '../../stores/pokemons';
import { UseQueryResult } from '@tanstack/react-query';

type TResponsePoke = {
	data: IPokemonState;
} & UseQueryResult;

const Detail = () => {
	const navigation = useNavigation<StackNavigationProp<NavParam, 'Detail'>>();
	const route = useRoute<RouteProp<NavParam, 'Detail'>>();
	console.log('route', route.params.name);

	const { data, isFetched } = useGetPokemonByName(
		route.params.name
	) as TResponsePoke;
	const { favoriteList, setFavoriteList } = usePokedexStore();

	const [isFavorite, setisFavorite] = useState(false);

	useEffect(() => {
		if (data && isFetched) {
			const dat = [...favoriteList!];
			const filterFavorite = dat.filter((o) => o.id === data.id);
			if (filterFavorite.length === 0) {
				setisFavorite(false);
			} else {
				setisFavorite(true);
			}

			console.log('data detail', data);
		}
	}, [data, isFetched, favoriteList]);

	const [spriteImages, setSpriteImages] = useState<string[]>([]);

	useEffect(() => {
		if (data) {
			const sprites = data.sprites;
			console.log(Object.entries(sprites));
			const slice8 = Object.entries(sprites).slice(0, 8);
			const filterNotNull = slice8.filter((o) => o[1] !== null);
			console.log('filteran', filterNotNull);
			let newArr: string[] = [];
			filterNotNull.map((o) => {
				let item = o[1];
				newArr.push(item);
			});
			setSpriteImages(newArr);
		}
	}, [data]);

	const _onFavoriteHandler = () => {
		if (isFavorite) {
			const dat = [...favoriteList!];
			const filter = dat.filter((o: IPokemonState) => o.id !== data?.id);
			setFavoriteList(filter!);
		} else {
			let dat = [...favoriteList!];
			dat.push(data);
			setFavoriteList(dat);
		}
	};

	return (
		<BaseContainer>
			<Toolbar
				prefix={
					<Ionicons
						name='arrow-back'
						size={24}
						color={BLACK}
						onPress={() => navigation.goBack()}
					/>
				}
				containerStyle={{ borderBottomColor: GREY1, borderBottomWidth: 0.5 }}
				textStyle={{ fontSize: 20, fontWeight: 'bold' }}>
				Pokemon Detail
			</Toolbar>
			<ScrollView contentContainerStyle={globalStyles.flexGrow}>
				<View
					style={[
						globalStyles.displayFlex,
						globalStyles.horizontalDefaultPadding,
						globalStyles.verticalDefaultPadding,
						globalStyles.rowGap,
						{ backgroundColor: WHITE },
					]}>
					<Image
						source={data?.sprites?.front_default ?? ''}
						style={{ width: '100%', height: 236 }}
						contentFit='contain'
					/>
					<View
						style={[
							globalStyles.justifySpaceBetween,
							globalStyles.row,
							globalStyles.alignCenter,
						]}>
						<Text style={{ fontSize: 36, fontWeight: 'bold' }}>
							{data?.name?.toUpperCase() ?? ''}
						</Text>
						<Ionicons
							name={isFavorite ? 'heart' : 'heart-outline'}
							size={24}
							color={isFavorite ? RED : BLACK}
							onPress={_onFavoriteHandler}
						/>
					</View>
					<Spacer height={30} />
					<View>
						<Text style={{ fontSize: 20, fontWeight: 'bold' }}>
							Sprite Gallery
						</Text>
						<FlatList
							data={spriteImages ?? []}
							keyExtractor={(item, i) => i.toString() + item}
							contentContainerStyle={{ rowGap: 12, columnGap: 16 }}
							numColumns={2}
							scrollEnabled={false}
							renderItem={({ item }) => (
								<TouchableOpacity
									style={[
										globalStyles.justifyCenter,
										globalStyles.alignCenter,
										styles.card,
									]}>
									<Image
										source={item}
										style={{ height: 115, width: '100%', flex: 1 }}
										contentFit='contain'
									/>
								</TouchableOpacity>
							)}
						/>
					</View>
					<View>
						<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Abilities</Text>
						<FlatList
							data={data?.abilities ?? []}
							keyExtractor={(item, i) => i.toString() + item}
							contentContainerStyle={{ rowGap: 12, columnGap: 16 }}
							scrollEnabled={false}
							renderItem={({ item }) => (
								<Text style={{ color: BLACK }}>{item.ability.name}</Text>
							)}
						/>
					</View>
				</View>
			</ScrollView>
		</BaseContainer>
	);
};

export default Detail;

const styles = StyleSheet.create({
	card: {
		borderWidth: 1,
		borderRadius: 12,
		borderColor: GREY1,
		height: 115,
		flex: 0.5,
		paddingVertical: 8,
		marginVertical: 8,
		marginHorizontal: 8,
	},
});
