import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Toolbar } from '../../components/basic';
import { BaseContainer } from '../../components/layout';
import { BLACK, GREY1, WHITE } from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavParam } from '../../navigations/types';
import usePokedexStore from '../../stores/pokemons';
import { Image } from 'expo-image';
import { percentageHeight } from '../../utils/screenSize';

const Favorite = () => {
	const navigation = useNavigation<StackNavigationProp<NavParam, 'Favorite'>>();
	const { favoriteList } = usePokedexStore();
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
				Favorite Pokemon
			</Toolbar>
			<View
				style={[
					globalStyles.displayFlex,
					globalStyles.horizontalDefaultPadding,
					globalStyles.verticalDefaultPadding,
					globalStyles.rowGap,
					{ backgroundColor: WHITE },
				]}>
				<FlatList
					data={favoriteList ?? []}
					keyExtractor={(item, i) => i.toString() + item?.id?.toString()}
					contentContainerStyle={{ rowGap: 12, columnGap: 16 }}
					numColumns={2}
					ListEmptyComponent={() => (
						<View
							style={[
								globalStyles.displayFlex,
								globalStyles.justifyCenter,
								globalStyles.alignCenter,
								{ height: percentageHeight(80) },
							]}>
							<Text>No Favorite found</Text>
						</View>
					)}
					renderItem={({ item }) => (
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
								style={{ height: 177, width: '100%', flex: 1 }}
							/>
						</TouchableOpacity>
					)}
				/>
			</View>
		</BaseContainer>
	);
};

export default Favorite;

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
