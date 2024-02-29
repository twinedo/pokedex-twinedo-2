import {
	FlatList,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { BaseContainer } from '../../components/layout';
import { Input, Spacer, Toolbar } from '../../components/basic';
import { BLACK, GREY1, WHITE } from '../../styles/colors';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavParam } from '../../navigations/types';
import globalStyles from '../../styles/globalStyles';
import { useForm, Controller } from 'react-hook-form';
import {
	useGetPokemonByName,
	useGetPokemons,
} from '../../services/api/pokemons';
import { Image } from 'expo-image';
import usePokedexStore, { IPokemonState } from '../../stores/pokemons';

const Home = () => {
	const navigation = useNavigation<StackNavigationProp<NavParam, 'Home'>>();
	const { control, handleSubmit } = useForm({
		defaultValues: {
			search: '',
		},
	});

	const { setList, setSearchList, list, searchList } = usePokedexStore();
	const onSubmit = (data: { search: string }) => {
		const dat = [...list];
		if (data.search.length === 0) {
			setSearchList(dat);
		} else {
			const filter = dat.filter((o) =>
				o.name.toLowerCase().includes(data.search.toLowerCase())
			);
			setSearchList(filter);
		}
	};

	const { data, isFetching, isFetched, hasNextPage, fetchNextPage } =
		useGetPokemons();
	useEffect(() => {
		if (isFetched) {
			if (data) {
				console.log('datanya', data);
				const results = data?.pages?.flatMap((group) => group?.results);
				let newArr: IPokemonState[] = [];
				results.map((o, i) => {
					let item = {
						...o,
						id: i + 1,
					};
					newArr.push(item);
				});
				setList(newArr);
				// setSearchList(data?.pages?.flatMap((group) => group?.results));
			}
		}
	}, [isFetched]);

	console.log('searchList', searchList);

	return (
		<BaseContainer>
			<StatusBar backgroundColor={WHITE} barStyle='dark-content' />
			<Toolbar
				containerStyle={{ borderBottomWidth: 0.5, borderBottomColor: GREY1 }}
				textStyle={{ fontWeight: 'bold', fontSize: 20 }}
				postfix={
					<AntDesign
						name='hearto'
						size={24}
						color={BLACK}
						onPress={() => navigation.navigate('Favorite')}
					/>
				}>
				Pokedex
			</Toolbar>
			<View
				style={[
					globalStyles.displayFlex,
					globalStyles.horizontalDefaultPadding,
					globalStyles.verticalDefaultPadding,
					{ backgroundColor: WHITE },
				]}>
				<Controller
					control={control}
					rules={{
						required: false,
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							placeholder='Search by name...'
							onBlur={onBlur}
							onChangeText={onChange}
							onEndEditing={handleSubmit(onSubmit)}
							value={value}
							containerStyle={{ borderRadius: 12 }}
						/>
					)}
					name='search'
				/>
				<Spacer height={16} />
				<FlatList
					data={searchList ?? []}
					keyExtractor={(item, i) => i.toString() + item?.id?.toString()}
					onEndReached={() => (hasNextPage ? fetchNextPage() : {})}
					onEndReachedThreshold={0.7}
					contentContainerStyle={{ rowGap: 12, columnGap: 16 }}
					numColumns={2}
					renderItem={({ item, index }) => (
						<TouchableOpacity
							onPress={() =>
								navigation.navigate('Detail', { name: item?.name })
							}
							style={[
								globalStyles.justifyCenter,
								globalStyles.alignCenter,
								styles.card,
							]}>
							<Image
								source={`${process.env.EXPO_PUBLIC_API_IMAGE}/${item.id}.png`}
								style={{ height: 1772, width: '100%', flex: 1 }}
							/>
							<Text style={{ color: BLACK, fontSize: 16, fontWeight: '500' }}>
								{item?.name}
							</Text>
						</TouchableOpacity>
					)}
				/>
			</View>
		</BaseContainer>
	);
};

export default Home;

const styles = StyleSheet.create({
	card: {
		borderWidth: 1,
		borderRadius: 12,
		borderColor: GREY1,
		height: 221,
		flex: 0.5,
		paddingVertical: 8,
		marginVertical: 8,
		marginHorizontal: 8,
	},
});
